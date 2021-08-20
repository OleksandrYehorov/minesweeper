import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell, queryAllCells, queryCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCell(minesMockData.beginner.firstClick));
});

test('game is lost by opening a mine cell', () => {
  userEvent.click(getCell(minesMockData.beginner.mines[0]));

  expect(screen.getByRole('img', { name: /dizzy face/i })).toBeInTheDocument();
});

test('upon lose flagged cells without mines are marked as crossed mines', () => {
  userEvent.click(getCell({ x: 0, y: 0 }), { button: 2 });
  userEvent.click(getCell(minesMockData.beginner.mines[0]));

  expect(
    queryCell({ x: 0, y: 0, isOpen: true, isFlagged: true })
  ).toBeInTheDocument();
});

test('upon lose all not flagged mines are revealed', () => {
  userEvent.click(getCell(minesMockData.beginner.mines[0]), { button: 2 });
  userEvent.click(getCell(minesMockData.beginner.mines[1]), { button: 2 });
  userEvent.click(getCell(minesMockData.beginner.mines[2]));

  expect(queryAllCells({ isFlagged: true }).length).toEqual(2);
  expect(
    queryAllCells({ isMine: true, isOpen: true, isFlagged: false }).length
  ).toEqual(8);
});

test('upon lose cells can not be clicked, flagged and unflagged', () => {
  userEvent.click(getCell({ x: 0, y: 0 }), { button: 2 });
  userEvent.click(getCell(minesMockData.beginner.mines[0]));

  // try to unflag flagged cell
  userEvent.click(getCell({ x: 0, y: 0 }), { button: 2 });

  // try to flag cell
  userEvent.click(getCell({ x: 1, y: 0 }), { button: 2 });

  // try to open cell
  userEvent.click(getCell({ x: 2, y: 0 }));

  expect(queryCell({ x: 0, y: 0, isFlagged: true })).toBeInTheDocument();
  expect(queryCell({ x: 1, y: 0, isFlagged: false })).toBeInTheDocument();
  expect(queryCell({ x: 2, y: 0, isOpen: false })).toBeInTheDocument();
});
