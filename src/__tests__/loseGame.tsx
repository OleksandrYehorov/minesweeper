import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
});

test('game is lost by opening a mine cell', () => {
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[0]));

  expect(screen.getByRole('img', { name: /dizzy face/i })).toBeInTheDocument();
});

test('upon lose flagged cells without mines are marked as crossed mines', () => {
  userEvent.click(getCellByCoords({ x: 0, y: 0 }), { button: 2 });
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[0]));

  expect(
    within(getCellByCoords({ x: 0, y: 0 })).queryByRole('img', {
      name: 'crossed mine',
    }),
  ).toBeInTheDocument();
});

test('upon lose all not flagged mines are revealed', () => {
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[0]), {
    button: 2,
  });
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[1]), {
    button: 2,
  });
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[2]));

  const cells = screen.getAllByTestId('cell');
  const flaggedCells = cells.filter(
    (cell) => within(cell).queryByRole('img', { name: 'flag' }) != null,
  );
  const mineCells = cells.filter(
    (cell) => within(cell).queryByRole('img', { name: 'mine' }) != null,
  );

  expect(flaggedCells).toHaveLength(2);
  expect(mineCells).toHaveLength(8);
});

test('upon lose cells can not be clicked, flagged and unflagged', () => {
  userEvent.click(getCellByCoords({ x: 0, y: 0 }), { button: 2 });
  userEvent.click(getCellByCoords(minesMockData.beginner.mines[0]));

  // try to unflag flagged cell
  userEvent.click(getCellByCoords({ x: 0, y: 0 }), { button: 2 });

  // try to flag cell
  userEvent.click(getCellByCoords({ x: 1, y: 0 }), { button: 2 });

  // try to open cell
  userEvent.click(getCellByCoords({ x: 2, y: 0 }));

  expect(
    within(getCellByCoords({ x: 0, y: 0 })).queryByRole('img', {
      name: 'crossed mine',
    }),
  ).toBeInTheDocument();
  expect(
    within(getCellByCoords({ x: 1, y: 0 })).queryByRole('img', {
      name: 'flag',
    }),
  ).not.toBeInTheDocument();
  expect(getCellByCoords({ x: 2, y: 0 }).getAttribute('data-open')).toBe(
    'false',
  );
});
