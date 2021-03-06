import { Difficulty, boardSizes, Coords } from './constants';
import { range } from './range';

interface BaseCell {
  readonly id: number;
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
  let id = 0;

  return [...range({ to: height })].map(() => {
    return [...range({ to: width })].map<GameCell>(() => ({
      id: id++,
      isOpen: false,
      isFlagged: false,
      isMine: false,
      adjacentMines: 0,
    }));
  });
};

const getRandomInteger = ({ min = 0, max = Number.MAX_SAFE_INTEGER }) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateMines = (
  board: GameBoard,
  difficulty: Difficulty,
  startCoords: Coords
): void => {
  const { width, height, mines } = boardSizes[difficulty];
  let i = 0;

  while (i < mines) {
    const x = getRandomInteger({ max: width - 1 });
    const y = getRandomInteger({ max: height - 1 });
    const cell = board[y][x];
    const isStartCell = x === startCoords.x && y === startCoords.y;
    const skipCell = cell.isMine || isStartCell;

    if (!skipCell) {
      cell.isMine = true;
      i += 1;
    }
  }
};

export const getAdjacentCoords = (
  board: GameBoard,
  { x, y }: Coords
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
  coords: Coords
): GameCell[] => {
  const adjacentCellsCoordinates = getAdjacentCoords(board, coords);

  return adjacentCellsCoordinates.map(({ x, y }) => board[y][x]);
};

export const countAdjacentMines = (board: GameBoard): void => {
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.isMine) return;

      const adjacentMines = getAdjacentCells(board, { x, y }).filter(
        ({ isMine }) => isMine
      ).length;

      cell.adjacentMines = adjacentMines;
    });
  });
};

export const openCell = (
  board: GameBoard,
  { x, y }: Coords,
  memo: boolean[][] = []
): boolean => {
  const cell = board[y][x];
  cell.isOpen = true;

  if (memo[y] == null) memo[y] = [];
  if (memo[y][x]) return true;
  memo[y][x] = true;

  if (cell.isMine) return false;

  if (cell.adjacentMines === 0) {
    const adjacentCoords = getAdjacentCoords(board, { x, y });

    adjacentCoords.forEach((coords) => openCell(board, coords, memo));
  }

  return true;
};

export const checkWin = (board: GameBoard, difficulty: Difficulty): boolean => {
  const { mines } = boardSizes[difficulty];

  const closedCells = board.flat().filter(({ isOpen }) => !isOpen);

  return (
    closedCells.length === mines && closedCells.every(({ isMine }) => isMine)
  );
};

export const openAdjacentCells = (
  board: GameBoard,
  { x, y }: Coords
): boolean => {
  const cell = board[y][x];

  if (cell.isOpen && !cell.isMine && cell.adjacentMines > 0) {
    const adjacentCells = getAdjacentCells(board, { x, y });
    const adjacentFlaggedCellsCount = adjacentCells.filter(
      ({ isFlagged }) => isFlagged
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
