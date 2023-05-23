import { Difficulty, boardSizes, Coords } from '../utils/constants';
import { getRandomInteger } from '../utils/getRandomInteger';
import { GameCell, isFlagged, isMine, isNumberCell } from './cell';
import { GameState } from '../store/gameStore';
import { now } from '../utils/now';
import { Analytics } from './analytics';
import { match } from 'ts-pattern';
import seedrandom from 'seedrandom';
import { testSeed } from '../utils/minesMockData';

export type GameBoard = GameCell[][];

export const createBoard = (difficulty: Difficulty): GameBoard => {
  const { width, height } = boardSizes[difficulty];

  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 'Empty'),
  );
};

const seed = import.meta.env.MODE === 'test' ? testSeed : undefined;

export const generateMines = (
  board: GameBoard,
  difficulty: Difficulty,
  startCoords: Coords,
): void => {
  const { width, height, mines } = boardSizes[difficulty];

  const rng = seedrandom(seed);

  let i = 0;
  while (i < mines) {
    const x = getRandomInteger(rng, { max: width - 1 });
    const y = getRandomInteger(rng, { max: height - 1 });

    const isStartCell = x === startCoords.x && y === startCoords.y;
    const skipCell = isMine(board[y][x]) || isStartCell;

    if (!skipCell) {
      board[y][x] = 'Mine';
      i++;
    }
  }
};

const getAdjacentCoords = (board: GameBoard, { x, y }: Coords): Coords[] =>
  [
    { x: x - 1, y: y - 1 }, // top left
    { x, y: y - 1 }, // top
    { x: x + 1, y: y - 1 }, // top right
    { x: x - 1, y }, // left
    { x: x + 1, y }, // right
    { x: x - 1, y: y + 1 }, // bottom left
    { x, y: y + 1 }, // bottom
    { x: x + 1, y: y + 1 }, // bottom right
  ].filter(({ x, y }) => board[y]?.[x] != null);

export const openCell = (state: GameState, { x, y }: Coords): boolean => {
  const cell = state.board[y][x];
  const visited = new Set<string>();

  if (isNumberCell(cell)) return true;

  if (isMine(cell)) {
    state.board[y][x] = 'ExplodedMine';
    return false;
  }

  const cellsToVisit = [{ x, y }];

  while (cellsToVisit.length > 0) {
    const { x, y } = cellsToVisit.shift() as Coords;

    if (visited.has(`${x}${y}`)) continue;

    const adjacentMines = getAdjacentCoords(state.board, { x, y })
      .map(getCell(state.board))
      .filter(isMine).length;

    state.board[y][x] = adjacentMines as GameCell;
    state.openCellsCount++;
    visited.add(`${x}${y}`);

    if (adjacentMines === 0) {
      const nextCellsToVisit = getAdjacentCoords(state.board, { x, y }).filter(
        ({ x, y }) => {
          const cell = state.board[y][x];
          return cell === 'Empty' || cell === 'Mine';
        },
      );
      cellsToVisit.push(...nextCellsToVisit);
    }
  }

  return true;
};

export const checkWin = (state: GameState): boolean => {
  const { mines } = boardSizes[state.difficulty];

  return mines + state.openCellsCount === state.totalCellsCount;
};

const getCell =
  (board: GameBoard) =>
  ({ x, y }: Coords) =>
    board[y][x];

export const openAdjacentCells = (
  state: GameState,
  { x, y }: Coords,
): boolean => {
  const cell = state.board[y][x];

  if (isNumberCell(cell) && cell !== 0) {
    const adjacentCellsCoords = getAdjacentCoords(state.board, { x, y });
    const adjacentCells = adjacentCellsCoords.map(getCell(state.board));
    const adjacentFlaggedCellsCount = adjacentCells.filter(isFlagged).length;

    if (adjacentFlaggedCellsCount === cell) {
      const cellsToOpen = adjacentCellsCoords
        .map<[GameCell, Coords]>((coords) => [
          getCell(state.board)(coords),
          coords,
        ])
        .filter(([cell]) => cell === 'Empty' || cell === 'Mine')
        .map(([, coords]) => coords);

      const success = cellsToOpen
        .map((coords) => openCell(state, coords))
        .every((status) => status);

      return success;
    }
  }

  return true;
};

function checkGameEnd(state: GameState, success: boolean) {
  if (success) {
    if (checkWin(state)) {
      state.status = 'win';
      Analytics.logWinGame({
        difficulty: state.difficulty,
        startedAt: state.startedAt,
      });
    }
  } else {
    state.status = 'lose';
    Analytics.logLoseGame({
      difficulty: state.difficulty,
      startedAt: state.startedAt,
    });
  }
}

export const initGame = (state: GameState, difficulty: Difficulty) => {
  state.status = 'starting';
  state.difficulty = difficulty;
  state.board = createBoard(difficulty);
  state.totalCellsCount =
    boardSizes[difficulty].height * boardSizes[difficulty].width;
  state.openCellsCount = 0;
  state.flaggedMinesCount = 0;
  state.flaggedEmptyCount = 0;
  state.startedAt = now();
};

export const clickCell = (state: GameState, { x, y }: Coords) => {
  if (state.status === 'win' || state.status === 'lose') {
    return;
  }

  if (state.status === 'starting') {
    generateMines(state.board, state.difficulty, { x, y });

    state.status = 'playing';
    state.startedAt = now();

    Analytics.logStartGame({ difficulty: state.difficulty });
  }

  const success = openCell(state, { x, y });

  checkGameEnd(state, success);
};

export const clickNumberCell = (state: GameState, { x, y }: Coords) => {
  const success = openAdjacentCells(state, { x, y });

  checkGameEnd(state, success);
};

export const flagCell = (state: GameState, { x, y }: Coords) => {
  if (state.status === 'playing') {
    state.board[y][x] = match<GameCell, GameCell>(state.board[y][x])
      .with('Empty', () => {
        state.flaggedEmptyCount++;
        return 'FlaggedEmpty';
      })
      .with('Mine', () => {
        state.flaggedMinesCount++;
        return 'FlaggedMine';
      })
      .with('FlaggedEmpty', () => {
        state.flaggedEmptyCount--;
        return 'Empty';
      })
      .with('FlaggedMine', () => {
        state.flaggedMinesCount--;
        return 'Mine';
      })
      .run();
  }
};
