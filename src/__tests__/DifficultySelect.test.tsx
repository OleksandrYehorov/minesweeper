import { fireEvent, render, screen } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { findAll } from 'styled-components/test-utils';
import { App } from '../App';
import { ClosedCell } from '../components/Cell';
import { boardSizes, difficultyLevels } from '../utils/constants';

beforeEach(() => render(<App />));

describe('difficulty level select', () => {
  difficultyLevels.forEach((difficulty) => {
    test(`${difficulty}`, async () => {
      const button = screen.getByRole('button', {
        name: RegExp(`${difficulty}`, 'i'),
      });

      fireEvent.click(button);

      const rows = screen.getAllByTestId('row');
      const height = rows.length;
      const width = findAll(rows[0], ClosedCell).length;
      const boardSize = boardSizes[difficulty];

      expect(height).toBe(boardSize.height);
      expect(width).toBe(boardSize.width);
    });
  });
});
