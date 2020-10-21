export interface RangeParams {
  from?: number;
  to: number;
}

export function* range({ from = 0, to }: RangeParams): Generator<number> {
  for (let i = from; i < to; i += 1) {
    yield i;
  }
}
