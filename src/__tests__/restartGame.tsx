import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

test('click on the emoji button restarts the game', () => {
  render(<App />);
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  userEvent.click(screen.getByRole('button', { name: /restart/i }));

  const openCells = screen
    .queryAllByTestId('cell')
    .filter((cell) => cell.getAttribute('data-open') === 'true');

  expect(openCells).toHaveLength(0);
});
