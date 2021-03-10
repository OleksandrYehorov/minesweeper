import { fireEvent, render, within } from '@testing-library/react';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCell';
import { minesMockData } from '../test-utils/minesMockData';
import { Coords } from '../utils/constants';

beforeEach(() => render(<App />));

describe('right click', () => {
  const flaggedCellCoords: Coords = { x: 6, y: 2 };

  beforeEach(() => {
    fireEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
    fireEvent.contextMenu(getCellByCoords(flaggedCellCoords));
  });

  test('flags cell', () => {
    expect(
      within(getCellByCoords(flaggedCellCoords)).getByRole('img', {
        name: /flag/i,
      })
    ).toBeInTheDocument();
  });

  test('on flag removes it', () => {
    fireEvent.contextMenu(getCellByCoords(flaggedCellCoords));

    expect(
      within(getCellByCoords(flaggedCellCoords)).queryByRole('img', {
        name: /flag/i,
      })
    ).not.toBeInTheDocument();
  });
});
