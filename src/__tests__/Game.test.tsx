import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { App } from '../App';
import { OpenCell } from '../components/Cell';
import { getComponentClass } from '../test-utils/getComponentClass';

beforeEach(() => render(<App />));

describe('game', () => {
  test('starts upon clicking cell', async () => {
    const board = screen.getByTestId('board');
    const cell = within(board).getAllByTestId(/cell11/i)[0];
    const openCells = board.querySelectorAll(`.${getComponentClass(OpenCell)}`);

    expect(openCells.length).toBe(0);

    fireEvent.click(cell);

    const openCells2 = board.querySelectorAll(
      `.${getComponentClass(OpenCell)}`
    );

    expect(openCells2.length).toBeGreaterThan(0);
  });
});
