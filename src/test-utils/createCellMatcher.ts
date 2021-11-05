export type NameMatcher = (accessibleName: string) => boolean;

// export type CellMatchData = Partial<
//   Pick<GameCell, 'isFlagged' | 'isMine' | 'isOpen'> & Coords
// >;
export type CellMatchData = {
  isFlagged?: boolean;
  isMine?: boolean;
  isOpen?: boolean;
  x?: number;
  y?: number;
};

export const createCellMatcher = (
  cellMatchData: CellMatchData,
): NameMatcher => {
  const { isFlagged, isMine, isOpen, x, y } = cellMatchData;
  const matchers: [RegExp, boolean][] = [[/cell/i, true]];

  if (isFlagged != null) {
    matchers.push([/flagged/i, isFlagged]);
  }

  if (isMine != null) {
    matchers.push([/mine/i, isMine]);
  }

  if (isOpen != null) {
    matchers.push([/open/i, isOpen]);
  }

  if (x != null) {
    matchers.push([RegExp(`x${x}`), true]);
  }

  if (y != null) {
    matchers.push([RegExp(`y${y}`), true]);
  }

  const matchFunction: NameMatcher = (accessibleName) => {
    return matchers.every(([matcher, expectedResult]) => {
      return matcher.test(accessibleName) === expectedResult;
    });
  };

  matchFunction.toString = () => JSON.stringify(cellMatchData, null, 2);

  return matchFunction;
};
