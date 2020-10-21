import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createBoard,
  generateMines,
  countAdjacentMines,
  GameBoard,
  openCell,
  checkWin,
} from '../utils/board';
import { Coords, Difficulty } from '../utils/constants';

export type GameStatus = 'starting' | 'playing' | 'win' | 'lose';

export interface GameBoardState {
  status: GameStatus;
  difficulty: Difficulty;
  board: GameBoard;
}

const initialDifficultyLevel: Difficulty = 'beginner';

const initialState: GameBoardState = {
  status: 'starting',
  difficulty: initialDifficultyLevel,
  board: createBoard(initialDifficultyLevel),
};

const { actions, reducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame(state, action: PayloadAction<Difficulty | undefined>) {
      const { payload: difficulty = state.difficulty } = action;

      state.board = createBoard(difficulty);
      state.status = 'starting';
      state.difficulty = difficulty;
    },
    clickCell(state, action: PayloadAction<Coords>) {
      const { payload } = action;
      const { x, y } = payload;

      if (state.status === 'win' || state.status === 'lose') {
        return;
      }

      if (state.status === 'starting') {
        generateMines(state.board, state.difficulty, { x, y });
        countAdjacentMines(state.board);

        state.status = 'playing';
      }

      if (state.board[y][x].isMine) {
        state.status = 'lose';
      }

      openCell(state.board, { x, y });

      if (checkWin(state.board, state.difficulty)) {
        state.status = 'win';
      }
    },
    flagCell(state, action: PayloadAction<Coords>) {
      const { payload } = action;
      const { x, y } = payload;

      if (state.status === 'playing') {
        state.board[y][x].isFlagged = !state.board[y][x].isFlagged;
      }
    },
  },
});

export const { clickCell, flagCell, initGame } = actions;

export const gameReducer = reducer;
