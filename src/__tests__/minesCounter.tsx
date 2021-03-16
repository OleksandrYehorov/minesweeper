import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';
import { Coords } from '../utils/constants';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCell(minesMockData.beginner.firstClick));
});

describe('mines counter', () => {
  test('shows remaining mines', () => {
    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('10');

    fireEvent.contextMenu(getCell({ x: 0, y: 0 }));
    fireEvent.contextMenu(getCell({ x: 1, y: 0 }));

    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('8');
  });

  test('shows negative count if there are more than 10 flags', () => {
    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('10');

    const coords: Coords[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ];

    coords.forEach(({ x, y }) => {
      fireEvent.contextMenu(getCell({ x, y }));
    });

    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('-2');
  });
});
