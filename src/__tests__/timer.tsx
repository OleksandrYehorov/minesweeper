import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => {
  vi.useFakeTimers();
});

test('timer shows playing time', () => {
  render(<App />);
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  act(() => {
    vi.advanceTimersByTime(3100);
  });
  // must be still 0 because game is not started
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
  act(() => {
    vi.advanceTimersByTime(3100);
  });
  // must be 3 since game was started 3 seconds ago
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('3');
  userEvent.click(screen.getByRole('button', { name: /restart/i }));
  // must be 0 after the game is restarted
  expect(screen.getByLabelText(/timer/i)).toHaveTextContent('0');
});
