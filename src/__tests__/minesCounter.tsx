import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';
import { Coords } from '../utils/constants';

beforeEach(() => {
  render(<App />);

  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
});

describe('mines counter', () => {
  test('shows remaining mines', () => {
    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('10');

    userEvent.click(getCellByCoords({ x: 0, y: 0 }), { button: 2 });
    userEvent.click(getCellByCoords({ x: 1, y: 0 }), { button: 2 });

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
      userEvent.click(getCellByCoords({ x, y }), { button: 2 });
    });

    expect(screen.getByLabelText(/mines count/i)).toHaveTextContent('-2');
  });
});
