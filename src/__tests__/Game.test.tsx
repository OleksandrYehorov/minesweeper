import { fireEvent, render, screen, within } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { findAll } from 'styled-components/test-utils';
import { App } from '../App';
import { OpenCell } from '../components/Cell';

beforeEach(() => render(<App />));

describe('game', () => {
  test('starts upon clicking cell', async () => {
    const board = screen.getByTestId('board');
    const cell = within(board).getAllByTestId(/cell11/i)[0];
    const openCells = findAll(board, OpenCell);

    expect(openCells.length).toBe(0);

    fireEvent.click(cell);

    const openCells2 = findAll(board, OpenCell);

    expect(openCells2.length).toBeGreaterThan(0);
  });
});
