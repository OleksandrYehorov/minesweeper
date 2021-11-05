import { screen, within } from '@testing-library/react';
import { Coords } from '../utils/constants';

export const getCellByCoords = ({ x, y }: Coords): HTMLElement => {
  const row = screen.getAllByTestId('row')[y];

  return within(row).getAllByTestId('cell')[x];
};
