export type Range = {
  min?: number;
  max?: number;
};

export const getRandomInteger = ({
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
}: Range = {}): number => {
  const minInteger = Math.ceil(min);
  const maxInteger = Math.floor(max);

  return Math.floor(Math.random() * (maxInteger - minInteger + 1)) + minInteger;
};
