import { minesMockData } from '../test-utils/minesMockData';
import { Difficulty, boardSizes, Coords } from '../utils/constants';
import { getRandomInteger } from '../utils/getRandomInteger';

interface BaseCell {
  readonly id: string;
  isOpen: boolean;
  isFlagged: boolean;
}

interface MineCell extends BaseCell {
  isMine: true;
}

interface NumberCell extends BaseCell {
  isMine: false;
  adjacentMines: number;
}

export type GameCell = MineCell | NumberCell;

export type GameBoard = GameCell[][];

export const createBoard = (difficulty: Difficulty): GameBoard => {
  const { width, height } = boardSizes[difficulty];

  return Array.from({ length: height }).map((...[, y]) => {
    return Array.from({ length: width }).map<GameCell>((...[, x]) => ({
      id: `cell x${x} y${y}`,
      isOpen: false,
      isFlagged: false,
      isMine: false,
      adjacentMines: 0,
    }));
  });
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
    const skipCell = board[y][x].isMine || isStartCell;

    if (!skipCell) {
      board[y][x].isMine = true;
      i++;
    }
  }
};

export const getAdjacentCoords = (
  board: GameBoard,
  { x, y }: Coords,
): Coords[] => {
  return [
    { x: x - 1, y: y - 1 }, // top left
    { x, y: y - 1 }, // top
    { x: x + 1, y: y - 1 }, // top right
    { x: x - 1, y }, // left
    { x: x + 1, y }, // right
    { x: x - 1, y: y + 1 }, // bottom left
    { x, y: y + 1 }, // bottom
    { x: x + 1, y: y + 1 }, // bottom right
  ].filter((coords) => board[coords.y]?.[coords.x] != null);
};

export const getAdjacentCells = (
  board: GameBoard,
  coords: Coords,
): GameCell[] => {
  const adjacentCellsCoordinates = getAdjacentCoords(board, coords);

  return adjacentCellsCoordinates.map(({ x, y }) => board[y][x]);
};

export const countAdjacentMines = (board: GameBoard): void => {
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.isMine) return;

      const adjacentMines = getAdjacentCells(board, { x, y }).filter(
        ({ isMine }) => isMine,
      ).length;

      cell.adjacentMines = adjacentMines;
    });
  });
};

export const openCell = (board: GameBoard, coords: Coords): boolean => {
  const cell = board[coords.y][coords.x];
  cell.isOpen = true;

  if (cell.isMine) return false;

  const visitedCells = Array.from({ length: board.length }, () =>
    Array.from({ length: board[0].length }, () => false),
  );

  const cellsToVisit = [coords];

  while (cellsToVisit.length > 0) {
    const { x, y } = cellsToVisit.shift() as Coords;
    const currentCell = board[y][x];

    currentCell.isOpen = true;
    visitedCells[y][x] = true;

    if (!currentCell.isMine && currentCell.adjacentMines === 0) {
      const adjacentCoords = getAdjacentCoords(board, { x, y });
      cellsToVisit.push(
        ...adjacentCoords.filter(filterAdjacentCoords(visitedCells)),
      );
    }
  }

  return true;
};

const filterAdjacentCoords =
  (memo: boolean[][]) =>
  ({ x, y }: Coords) =>
    memo[y][x] === false;

export const checkWin = (board: GameBoard, difficulty: Difficulty): boolean => {
  const { mines } = boardSizes[difficulty];

  const closedCells = board.flat().filter(({ isOpen }) => !isOpen);

  return (
    closedCells.length === mines && closedCells.every(({ isMine }) => isMine)
  );
};

export const openAdjacentCells = (
  board: GameBoard,
  { x, y }: Coords,
): boolean => {
  const cell = board[y][x];

  if (cell.isOpen && !cell.isMine && cell.adjacentMines > 0) {
    const adjacentCells = getAdjacentCells(board, { x, y });
    const adjacentFlaggedCellsCount = adjacentCells.filter(
      ({ isFlagged }) => isFlagged,
    ).length;

    if (adjacentFlaggedCellsCount === cell.adjacentMines) {
      const adjacentCellsCoords = getAdjacentCoords(board, { x, y });

      const cellsToOpen = adjacentCellsCoords
        .map<[GameCell, Coords]>((coords) => [
          board[coords.y][coords.x],
          coords,
        ])
        .filter(([{ isFlagged, isOpen }]) => !isOpen && !isFlagged);

      const success = cellsToOpen
        .map(([, coords]) => openCell(board, { x: coords.x, y: coords.y }))
        .every((status) => status);

      return success;
    }
  }

  return true;
};
