import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell, queryAllCells } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

test('click on the emoji button restarts the game', () => {
  userEvent.click(getCell(minesMockData.beginner.firstClick));
  userEvent.click(screen.getByRole('button', { name: /restart/i }));

  expect(queryAllCells({ isOpen: true }).length).toBe(0);
});
