import { minesMockData } from '../test-utils/minesMockData';
import { Difficulty, boardSizes, Coords } from '../utils/constants';
import { getRandomInteger } from '../utils/getRandomInteger';
import { GameCell, isClosed, isFlagged, isMine, isNumberCell } from './cell';

export type GameBoard = GameCell[][];

export const createBoard = (difficulty: Difficulty): GameBoard => {
  const { width, height } = boardSizes[difficulty];

  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 'Empty'),
  );
};

export const generateMines = (
  board: GameBoard,
  difficulty: Difficulty,
  startCoords: Coords,
): void => {
  const { width, height, mines } = boardSizes[difficulty];

  let i = 0;
  while (i < mines) {
    const x =
      process.env.NODE_ENV === 'test'
        ? minesMockData[difficulty].mines[i].x
        : getRandomInteger({ max: width - 1 });
    const y =
      process.env.NODE_ENV === 'test'
        ? minesMockData[difficulty].mines[i].y
        : getRandomInteger({ max: height - 1 });

    const isStartCell = x === startCoords.x && y === startCoords.y;
    const skipCell = isMine(board[y][x]) || isStartCell;

    if (!skipCell) {
      board[y][x] = 'Mine';
      i++;
    }
  }
};

export const getAdjacentCoords =
  (board: GameBoard) =>
  ({ x, y }: Coords): Coords[] =>
    [
      { x: x - 1, y: y - 1 }, // top left
      { x, y: y - 1 }, // top
      { x: x + 1, y: y - 1 }, // top right
      { x: x - 1, y }, // left
      { x: x + 1, y }, // right
      { x: x - 1, y: y + 1 }, // bottom left
      { x, y: y + 1 }, // bottom
      { x: x + 1, y: y + 1 }, // bottom right
    ].filter((coords) => board[coords.y]?.[coords.x] != null);

export const getAdjacentCells =
  (board: GameBoard) =>
  (coords: Coords): GameCell[] =>
    getAdjacentCoords(board)(coords).map(({ x, y }) => board[y][x]);

export const countAdjacentMines =
  (board: GameBoard) =>
  ({ x, y }: Coords): number =>
    getAdjacentCells(board)({ x, y }).filter(isMine).length;

export const openCell =
  (board: GameBoard) =>
  (coords: Coords): boolean => {
    const cell = board[coords.y][coords.x];

    if (isMine(cell)) {
      board[coords.y][coords.x] = 'ExplodedMine';
      return false;
    }

    const cellsToVisit = [coords];

    while (cellsToVisit.length > 0) {
      const { x, y } = cellsToVisit.shift() as Coords;

      const adjacentMines = countAdjacentMines(board)({ y, x });
      board[y][x] = adjacentMines as GameCell;

      if (adjacentMines === 0) {
        cellsToVisit.push(
          ...getAdjacentCoords(board)({ x, y }).filter(
            ({ x, y }) => board[y][x] === 'Empty' || board[y][x] === 'Mine',
          ),
        );
      }
    }

    return true;
  };

export const checkWin =
  (board: GameBoard) =>
  (difficulty: Difficulty): boolean => {
    const { mines } = boardSizes[difficulty];

    const closedCells = board.flat().filter(isClosed);

    return closedCells.length === mines && closedCells.every(isMine);
  };

export const flagRemainingMines = (board: GameBoard): void => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === 'Mine') board[y][x] = 'FlaggedMine';
    }
  }
};

export const openAdjacentCells =
  (board: GameBoard) =>
  ({ x, y }: Coords): boolean => {
    const cell = board[y][x];

    if (isNumberCell(cell) && cell !== 0) {
      const adjacentCells = getAdjacentCells(board)({ x, y });
      const adjacentFlaggedCellsCount = adjacentCells.filter(isFlagged).length;

      if (adjacentFlaggedCellsCount === cell) {
        const adjacentCellsCoords = getAdjacentCoords(board)({ x, y });

        const cellsToOpen = adjacentCellsCoords
          .map<[GameCell, Coords]>((coords) => [
            board[coords.y][coords.x],
            coords,
          ])
          .filter(([cell]) => cell === 'Empty' || cell === 'Mine');

        const success = cellsToOpen
          .map(([, coords]) => openCell(board)({ x: coords.x, y: coords.y }))
          .every((status) => status);

        return success;
      }
    }

    return true;
  };
