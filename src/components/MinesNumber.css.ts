import { recipe } from '@vanilla-extract/recipes';

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

export const number = recipe({
  base: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 900,
    fontSize: '1.2rem',
  },
  variants: {
    color: {
      0: { color: numbersColors[0] },
      1: { color: numbersColors[1] },
      2: { color: numbersColors[2] },
      3: { color: numbersColors[3] },
      4: { color: numbersColors[4] },
      5: { color: numbersColors[5] },
      6: { color: numbersColors[6] },
      7: { color: numbersColors[7] },
    },
  },
});
