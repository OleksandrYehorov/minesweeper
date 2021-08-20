import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell, queryCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

beforeEach(() => {
  userEvent.click(getCell(minesMockData.beginner.firstClick));
  userEvent.click(getCell({ x: 6, y: 2 }), { button: 2 });
});

test('right click flags cell', () => {
  expect(queryCell({ x: 6, y: 2, isFlagged: true })).toBeInTheDocument();
});

test('right click on flagged cell removes flag', () => {
  userEvent.click(getCell({ x: 6, y: 2 }), { button: 2 });

  expect(queryCell({ x: 6, y: 2, isFlagged: true })).not.toBeInTheDocument();
});

test('flag prevents cell from opening', () => {
  userEvent.click(getCell({ x: 6, y: 2 }));

  expect(queryCell({ x: 6, y: 2, isFlagged: true })).toBeInTheDocument();
  expect(queryCell({ x: 6, y: 2, isOpen: true })).not.toBeInTheDocument();
});
