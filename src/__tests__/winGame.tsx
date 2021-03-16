import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getAllCells, getCell, queryCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCell(minesMockData.beginner.firstClick));

  // flag all mines
  minesMockData.beginner.mines.forEach((coords) => {
    fireEvent.contextMenu(getCell(coords));
  });

  // click all cells
  getAllCells().forEach(fireEvent.click);
});

test('game is won by opening all non mine cells', () => {
  expect(
    screen.getByRole('img', { name: /smiling face with sunglasses/i })
  ).toBeInTheDocument();
});

test('cells can not be unflagged after win', () => {
  const flaggedCellCoords = minesMockData.beginner.mines[0];
  fireEvent.contextMenu(getCell(flaggedCellCoords));

  expect(
    queryCell({ ...flaggedCellCoords, isFlagged: true })
  ).toBeInTheDocument();
});
