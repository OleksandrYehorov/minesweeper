import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCell';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

describe('game', () => {
  test('starts upon clicking cell', () => {
    let openCells = screen.queryAllByRole('button', { name: /open/i });

    expect(openCells.length).toBe(0);

    fireEvent.click(getCellByCoords(minesMockData.beginner.firstClick));

    openCells = screen.queryAllByRole('button', { name: /open/i });

    expect(openCells.length).toBeGreaterThan(0);
  });
});
