import { FC } from 'react';
import styled from 'styled-components';

const numbersColors = [
  '#0000fd',
  '#017e00',
  '#fd0000',
  '#010180',
  '#830003',
  '#008080',
  '#000000',
  '#808080',
] as const;

export const MinesNumber: FC<{ value: number }> = ({ value }) => {
  const color = numbersColors[value - 1];

  return value === 0 ? null : <Number color={color}>{value}</Number>;
};

const Number = styled.span<{ color: typeof numbersColors[number] }>`
  color: ${({ color }) => color};
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
`;
