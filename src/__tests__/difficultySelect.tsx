import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { boardSizes, difficultyLevels } from '../utils/constants';

beforeEach(() => render(<App />));

describe('difficulty level select', () => {
  difficultyLevels.forEach((difficulty) => {
    test(`${difficulty}`, () => {
      const button = screen.getByRole('button', {
        name: RegExp(`${difficulty}`, 'i'),
      });

      userEvent.click(button);

      const rows = screen.getAllByTestId('row');
      const height = rows.length;
      const width = within(rows[0]).getAllByRole('button', { name: /cell/i })
        .length;
      const boardSize = boardSizes[difficulty];

      expect(height).toBe(boardSize.height);
      expect(width).toBe(boardSize.width);
    });
  });
});
