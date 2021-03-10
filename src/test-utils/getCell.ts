import { screen } from '@testing-library/react';
import { Coords } from '../utils/constants';

export const getCellByCoords = ({ x, y }: Coords): HTMLElement => {
  return screen.getByRole('button', {
    name: RegExp(`cell x${x} y${y}`, 'i'),
  });
};
