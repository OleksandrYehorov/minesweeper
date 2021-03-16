import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { getCell } from '../test-utils/cellQueries';
import { minesMockData } from '../test-utils/minesMockData';

beforeEach(() => render(<App />));

describe('number cell', () => {
  test('upon click opens remaining not flagged cells', () => {
    userEvent.click(getCell(minesMockData.beginner.firstClick));
    fireEvent.contextMenu(getCell({ x: 6, y: 3 }));
    fireEvent.contextMenu(getCell({ x: 7, y: 3 }));
    userEvent.click(getCell({ x: 7, y: 4 }));

    expect(getCell({ x: 8, y: 3, isOpen: true })).toBeInTheDocument();
    expect(getCell({ x: 8, y: 4, isOpen: true })).toBeInTheDocument();
    expect(getCell({ x: 8, y: 5, isOpen: true })).toBeInTheDocument();
  });

  test('upon click opens mine cells', () => {
    userEvent.click(getCell(minesMockData.beginner.firstClick));
    fireEvent.contextMenu(getCell({ x: 3, y: 2 }));
    userEvent.click(getCell({ x: 3, y: 3 }));

    expect(
      getCell({ x: 4, y: 2, isOpen: true, isMine: true })
    ).toBeInTheDocument();
  });

  test('does not open cells if number and flags are different', () => {
    userEvent.click(getCell(minesMockData.beginner.firstClick));
    fireEvent.contextMenu(getCell({ x: 6, y: 3 }));
    userEvent.click(getCell({ x: 7, y: 4 }));

    expect(getCell({ x: 8, y: 3, isOpen: false })).toBeInTheDocument();
    expect(getCell({ x: 8, y: 4, isOpen: false })).toBeInTheDocument();
    expect(getCell({ x: 8, y: 5, isOpen: false })).toBeInTheDocument();
  });
});
