import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

test('game starts upon clicking cell', () => {
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));

  const openCells = screen
    .queryAllByTestId('cell')
    .filter((cell) => cell.getAttribute('data-open') === 'true');

  expect(openCells.length).toBeGreaterThan(0);
});
