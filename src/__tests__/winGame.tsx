import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getAllCells, getCell, queryCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCell(minesMockData.beginner.firstClick));

  // flag all mines
  minesMockData.beginner.mines.forEach((coords) => {
    userEvent.click(getCell(coords), { button: 2 });
  });

  // click all cells
  getAllCells().forEach((cell) => userEvent.click(cell));
});

test('game is won by opening all non mine cells', () => {
  expect(
    screen.getByRole('img', { name: /smiling face with sunglasses/i })
  ).toBeInTheDocument();
});

test('cells can not be unflagged after win', () => {
  const flaggedCellCoords = minesMockData.beginner.mines[0];
  userEvent.click(getCell(flaggedCellCoords), { button: 2 });

  expect(
    queryCell({ ...flaggedCellCoords, isFlagged: true })
  ).toBeInTheDocument();
});
