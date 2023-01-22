import { pipe } from 'remeda';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  clickCell,
  clickNumberCell,
  createBoard,
  flagCell,
  GameBoard,
  initGame,
} from '../services/board';
import { Coords, Difficulty } from '../utils/constants';

export type GameStatus = 'starting' | 'playing' | 'win' | 'lose';

const initialDifficultyLevel = 'beginner' as Difficulty;

export type GameState = {
  status: GameStatus;
  difficulty: Difficulty;
  board: GameBoard;
  totalCellsCount: number;
  openCellsCount: number;
  flaggedMinesCount: number;
  flaggedEmptyCount: number;
  startedAt: number;
  initGame(difficulty?: Difficulty): void;
  clickCell({ x, y }: Coords): void;
  clickNumberCell({ x, y }: Coords): void;
  flagCell({ x, y }: Coords): void;
};

export const useGameStore = pipe(
  immer<GameState>((set, get) => ({
    status: 'starting' as GameStatus,
    difficulty: initialDifficultyLevel,
    board: createBoard(initialDifficultyLevel),
    totalCellsCount: 0,
    openCellsCount: 0,
    flaggedMinesCount: 0,
    flaggedEmptyCount: 0,
    startedAt: 0,
    initGame(difficulty = get().difficulty) {
      set((state) => {
        initGame(state, difficulty);
      });
    },
    clickCell(coords) {
      set((state) => {
        clickCell(state, coords);
      });
    },
    clickNumberCell(coords) {
      set((state) => {
        clickNumberCell(state, coords);
      });
    },
    flagCell(coords) {
      set((state) => {
        flagCell(state, coords);
      });
    },
  })),
  devtools,
  create(),
);
