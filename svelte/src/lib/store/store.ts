import type { GameBoard } from '$lib/services/board';
import * as boardService from '$lib/services/board';
import type { Coords, Difficulty } from '$lib/utils/constants';
import { get, writable } from 'svelte/store';
// import produce from 'immer';

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
};

export const gameStore = writable<GameState>({
	status: 'starting' as GameStatus,
	difficulty: initialDifficultyLevel,
	board: boardService.createBoard(initialDifficultyLevel),
	totalCellsCount: 0,
	openCellsCount: 0,
	flaggedMinesCount: 0,
	flaggedEmptyCount: 0,
	startedAt: 0
});

export function initGame(difficulty = get(gameStore).difficulty) {
	gameStore.update(boardService.initGame(difficulty));
}

export function clickCell(coords: Coords) {
	gameStore.update(boardService.clickCell(coords));
}

export function clickNumberCell(coords: Coords) {
	gameStore.update(boardService.clickNumberCell(coords));
}

export function flagCell(coords: Coords) {
	gameStore.update(boardService.flagCell(coords));
}
