import { match } from 'ts-pattern';

export type NumberCell =
	| 0 // revealed square with 0-9 adjacent mines
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9;

export type GameCell =
	| 'Empty' // unrevealed empty square
	| 'Mine'
	| 'ExplodedMine' // mine that exploded
	| 'FlaggedMine'
	| 'FlaggedEmpty'
	| NumberCell; // revealed square with 0-9 adjacent mines

const closed = ['Empty', 'Mine', 'FlaggedEmpty', 'FlaggedMine'] as const;

export type ClosedCell = typeof closed[number];

export const isClosed = (cell: GameCell): cell is ClosedCell =>
	match(cell)
		.with(...closed, () => true)
		.otherwise(() => false);

const mines = ['Mine', 'FlaggedMine'] as const;

export type MineCell = typeof mines[number];

export const isMine = (cell: GameCell): cell is MineCell =>
	match(cell)
		.with(...mines, () => true)
		.otherwise(() => false);

const flagged = ['FlaggedEmpty', 'FlaggedMine'] as const;

export type FlaggedCell = typeof flagged[number];

export const isFlagged = (cell: GameCell): cell is FlaggedCell =>
	match(cell)
		.with(...flagged, () => true)
		.otherwise(() => false);

export const isNumberCell = (cell: GameCell): cell is NumberCell => typeof cell === 'number';

export function flash(element: HTMLElement) {
	requestAnimationFrame(() => {
		element.style.transition = 'none';
		element.style.color = 'rgba(255,62,0,1)';
		element.style.backgroundColor = 'rgba(255,62,0,0.2)';

		setTimeout(() => {
			element.style.transition = 'color 1s, background 1s';
			element.style.color = '';
			element.style.backgroundColor = '';
		});
	});
}
