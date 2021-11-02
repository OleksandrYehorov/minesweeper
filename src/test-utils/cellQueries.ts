import { screen } from '@testing-library/react';
import { CellMatchData, createCellMatcher } from './createCellMatcher';

export const getCell = (cellMatchData: CellMatchData): HTMLElement => {
  return screen.getByRole('button', {
    name: createCellMatcher(cellMatchData),
  });
};

export const queryCell = (cellMatchData: CellMatchData): HTMLElement | null => {
  return screen.queryByRole('button', {
    name: createCellMatcher(cellMatchData),
  });
};

export const getAllCells = (
  cellMatchData: CellMatchData = {},
): HTMLElement[] => {
  return screen.getAllByRole('button', {
    name: createCellMatcher(cellMatchData),
  });
};

export const queryAllCells = (
  cellMatchData: CellMatchData = {},
): HTMLElement[] => {
  return screen.queryAllByRole('button', {
    name: createCellMatcher(cellMatchData),
  });
};
