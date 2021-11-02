import create from 'zustand';
import { Analytics } from '../services/analytics';
import {
  checkWin,
  countAdjacentMines,
  createBoard,
  generateMines,
  openAdjacentCells,
  openCell,
} from '../services/board';
import { Coords, Difficulty } from '../utils/constants';
import { now } from '../utils/now';
import { combineImmer } from './middlewares/combineImmer';

export type GameStatus = 'starting' | 'playing' | 'win' | 'lose';

const initialDifficultyLevel = 'beginner' as Difficulty;

export const useGameStore = create(
  combineImmer(
    {
      status: 'starting' as GameStatus,
      difficulty: initialDifficultyLevel,
      board: createBoard(initialDifficultyLevel),
      startedAt: now(),
    },
    (set, get) => ({
      initGame(difficulty: Difficulty = get().difficulty) {
        set((state) => {
          state.board = createBoard(difficulty);
          state.status = 'starting';
          state.difficulty = difficulty;
        });
      },
      clickCell({ x, y }: Coords) {
        set((state) => {
          if (state.status === 'win' || state.status === 'lose') {
            return;
          }

          if (state.status === 'starting') {
            generateMines(state.board, state.difficulty, { x, y });
            countAdjacentMines(state.board);

            state.status = 'playing';
            state.startedAt = now();

            Analytics.logStartGame({
              difficulty: state.difficulty,
            });
          }

          const success = openCell(state.board, { x, y });

          if (!success) {
            state.status = 'lose';

            Analytics.logLoseGame({
              difficulty: state.difficulty,
              startedAt: state.startedAt,
            });
          }

          if (checkWin(state.board, state.difficulty)) {
            state.status = 'win';

            Analytics.logWinGame({
              difficulty: state.difficulty,
              startedAt: state.startedAt,
            });
          }
        });
      },
      clickNumberCell({ x, y }: Coords) {
        set((state) => {
          const success = openAdjacentCells(state.board, { x, y });

          if (!success) {
            state.status = 'lose';
          } else if (checkWin(state.board, state.difficulty)) {
            state.status = 'win';
          }
        });
      },
      flagCell({ x, y }: Coords) {
        set((state) => {
          const clickedCell = state.board[y][x];

          if (state.status === 'playing') {
            clickedCell.isFlagged = !clickedCell.isFlagged;
          }
        });
      },
    }),
  ),
);

export type GameState = ReturnType<typeof useGameStore.getState>;
