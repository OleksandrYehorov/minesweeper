import { FC } from 'react';
import { number } from './MinesNumber.css';

export const MinesNumber: FC<{ value: number }> = ({ value }) => {
  const color = (value - 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

  if (value === 0) return null;

  return <span className={number({ color })}>{value}</span>;
};
