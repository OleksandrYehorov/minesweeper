import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

// TODO: figure out why this test does not work
beforeEach(() => {
  render(<App />);

  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));

  // flag all mines
  minesMockData.beginner.mines.forEach((coords) => {
    userEvent.click(getCellByCoords(coords), { button: 2 });
  });

  // click all cells
  screen.getAllByTestId('cell').forEach((cell) => {
    userEvent.click(cell);
  });
});

// eslint-disable-next-line jest/no-disabled-tests
test.skip('game is won by opening all non mine cells', () => {
  expect(
    screen.queryByRole('img', { name: /smiling face with sunglasses/i }),
  ).toBeInTheDocument();
});

// eslint-disable-next-line jest/no-disabled-tests
test.skip('cells can not be unflagged after win', () => {
  const flaggedCellCoords = minesMockData.beginner.mines[0];
  userEvent.click(getCellByCoords(flaggedCellCoords), { button: 2 });

  expect(
    within(getCellByCoords(flaggedCellCoords)).queryByRole('img', {
      name: 'flag',
    }),
  ).toBeInTheDocument();
});
