import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '../App';
import { ClosedCell } from '../components/Cell';
import { boardSizes, difficultyLevels } from '../utils/constants';
import { getComponentClass } from '../test-utils/getComponentClass';

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
      const width = rows[0].querySelectorAll(
        `.${getComponentClass(ClosedCell)}`
      ).length;
      const boardSize = boardSizes[difficulty];

      expect(height).toBe(boardSize.height);
      expect(width).toBe(boardSize.width);
    });
  });
});
