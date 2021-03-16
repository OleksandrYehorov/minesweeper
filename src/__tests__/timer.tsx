import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

jest.useFakeTimers('modern');

beforeEach(() => render(<App />));

test('timer shows playing time', () => {
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  jest.advanceTimersByTime(3100);
  // must be still 0 because game is not started
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  userEvent.click(getCell(minesMockData.beginner.firstClick));
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  jest.advanceTimersByTime(3000);
  // must be 3 since game was started 3 seconds ago
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('3');
  userEvent.click(screen.getByRole('button', { name: /restart/i }));
  // must be 0 after the game is restarted
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
});
