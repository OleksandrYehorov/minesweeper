import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCellByCoords } from '../test-utils/getCellByCoords';
import { minesMockData } from '../test-utils/minesMockData';

test('right click flags cell', () => {
  render(<App />);
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  // userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });
  fireEvent.contextMenu(getCellByCoords({ x: 6, y: 2 }));
  expect(
    within(getCellByCoords({ x: 6, y: 2 })).getByRole('img', {
      name: 'flag',
    }),
  ).toBeInTheDocument();
});

test('right click on flagged cell removes flag', () => {
  render(<App />);
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  // userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });
  fireEvent.contextMenu(getCellByCoords({ x: 6, y: 2 }));
  // userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });
  fireEvent.contextMenu(getCellByCoords({ x: 6, y: 2 }));

  expect(
    within(getCellByCoords({ x: 6, y: 2 })).queryByRole('img', {
      name: 'flag',
    }),
  ).not.toBeInTheDocument();
});

test('flag prevents cell from opening', () => {
  render(<App />);
  userEvent.click(getCellByCoords(minesMockData.beginner.firstClick));
  // userEvent.click(getCellByCoords({ x: 6, y: 2 }), { button: 2 });
  fireEvent.contextMenu(getCellByCoords({ x: 6, y: 2 }));
  userEvent.click(getCellByCoords({ x: 6, y: 2 }));

  expect(
    within(getCellByCoords({ x: 6, y: 2 })).getByRole('img', {
      name: 'flag',
    }),
  ).toBeInTheDocument();
});
