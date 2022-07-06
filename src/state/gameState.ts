import { proxy } from 'valtio';
import * as boardService from '../services/board';
import { Coords, Difficulty } from '../utils/constants';
import { devtools, subscribeKey } from 'valtio/utils';

const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get(searchParams, prop) {
    const a = searchParams.get(prop as string);
    console.log(a);
  },
  set(searchParams, prop, value) {
    searchParams.set(prop as string, value);
    return true;
  },
});

export type GameStatus = 'starting' | 'playing' | 'win' | 'lose';

const initialDifficulty = 'beginner' as Difficulty;

const initialGameState = {
  status: 'starting' as GameStatus,
  difficulty: initialDifficulty,
  board: boardService.createBoard(initialDifficulty),
  totalCellsCount: 0,
  openCellsCount: 0,
  flaggedMinesCount: 0,
  flaggedEmptyCount: 0,
  startedAt: 0,
};

export const gameState = proxy(initialGameState);

devtools(gameState, { enabled: import.meta.env.DEV });

subscribeKey(gameState, 'difficulty', (value) => {});

export type GameState = typeof gameState;

export const initGame = (difficulty = gameState.difficulty) =>
  boardService.initGame(gameState, difficulty);

export const clickCell = (coords: Coords) =>
  boardService.clickCell(gameState, coords);

export const clickNumberCell = (coords: Coords) =>
  boardService.clickNumberCell(gameState, coords);

export const flagCell = (coords: Coords) =>
  boardService.flagCell(gameState, coords);
