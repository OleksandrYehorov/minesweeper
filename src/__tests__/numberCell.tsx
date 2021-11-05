import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

describe('number cell', () => {
  test('upon click opens remaining not flagged cells', () => {
    userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
    userEvent.click(getCellByCoords({ x: 6, y: 3 }), { button: 2 });
    userEvent.click(getCellByCoords({ x: 7, y: 3 }), { button: 2 });
    userEvent.click(getCellByCoords({ x: 7, y: 4 }));

    expect(getCellByCoords({ x: 8, y: 3 }).getAttribute('data-open')).toBe(
      'true',
    );
    expect(getCellByCoords({ x: 8, y: 4 }).getAttribute('data-open')).toBe(
      'true',
    );
    expect(getCellByCoords({ x: 8, y: 5 }).getAttribute('data-open')).toBe(
      'true',
    );
  });

  test('upon click opens mine cells', () => {
    userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
    userEvent.click(getCellByCoords({ x: 3, y: 2 }), { button: 2 });
    userEvent.click(getCellByCoords({ x: 3, y: 3 }));

    expect(
      within(getCellByCoords({ x: 4, y: 2 })).queryByRole('img', {
        name: 'mine',
      }),
    ).toBeInTheDocument();
  });

  test('does not open cells if number and flags are different', () => {
    userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
    userEvent.click(getCellByCoords({ x: 6, y: 3 }), { button: 2 });
    userEvent.click(getCellByCoords({ x: 7, y: 4 }));

    // expect(getCell({ x: 8, y: 3, isOpen: false })).toBeInTheDocument();
    // expect(getCell({ x: 8, y: 4, isOpen: false })).toBeInTheDocument();
    // expect(getCell({ x: 8, y: 5, isOpen: false })).toBeInTheDocument();
    expect(getCellByCoords({ x: 8, y: 3 }).getAttribute('data-open')).toBe(
      'false',
    );
    expect(getCellByCoords({ x: 8, y: 4 }).getAttribute('data-open')).toBe(
      'false',
    );
    expect(getCellByCoords({ x: 8, y: 5 }).getAttribute('data-open')).toBe(
      'false',
    );
  });
});
