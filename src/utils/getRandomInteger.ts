import type { PRNG } from 'seedrandom';

export type Range = {
  min?: number;
  max?: number;
};

export const getRandomInteger = (
  rng: PRNG,
  { min = 0, max = Number.MAX_SAFE_INTEGER }: Range = {},
): number => {
  const minInteger = Math.ceil(min);
  const maxInteger = Math.floor(max);

  return Math.floor(rng() * (maxInteger - minInteger + 1)) + minInteger;
};
