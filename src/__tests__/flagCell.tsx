import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

beforeEach(() => {
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });
});

test('right click flags cell', () => {
  expect(
    within(getCellByCoords({ x: 6, y: 2 })).getByRole('img', {
      name: 'flag',
    }),
  ).toBeInTheDocument();
});

test('right click on flagged cell removes flag', () => {
  userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });

  expect(
    within(getCellByCoords({ x: 6, y: 2 })).queryByRole('img', {
      name: 'flag',
    }),
  ).not.toBeInTheDocument();
});

test('flag prevents cell from opening', () => {
  userEvent.click(getCellByCoords({ x: 6, y: 2 }));

  expect(
    within(getCellByCoords({ x: 6, y: 2 })).queryByRole('img', {
      name: 'flag',
    }),
  ).toBeInTheDocument();
});
