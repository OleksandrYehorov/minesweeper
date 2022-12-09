<svelte:options immutable />

<script lang="ts">
	import { clickCell, clickNumberCell, flagCell, gameStore, type GameStatus } from './store/store';
	import mineImage from '$lib/images/mine.svg';
	import crossedMineImage from '$lib/images/crossedMine.svg';
	import flagImage from '$lib/images/flag.svg';
	import { flash, isFlagged, isNumberCell, type GameCell } from './services/cell';
	import MinesNumber from './MinesNumber.svelte';
	import { afterUpdate } from 'svelte';

	export let x: number;
	export let y: number;

	let el: HTMLDivElement;

	const handleClickCell = () => clickCell({ x, y });
	const handleClickNumberCell = () => clickNumberCell({ x, y });
	const handleFlagCell = () => flagCell({ x, y });

	let cellData: GameCell;
	let gameStatus: GameStatus;

	// $: gameStore.subscribe(({ board, status }) => {
	// 	// console.log('🚀 ~ file: Cell.svelte ~ line 28 ~ $:gameStore.subscribe ~ subscribe');
	// 	cellData = board[y][x];
	// 	gameStatus = status;
	// });

	$: {
		cellData = $gameStore.board[y][x];
		gameStatus = $gameStore.status;
	}
	$: console.log(cellData);

	// $: ({ status: gameStatus, board } = $gameStore);
	// $: cellData = board[y][x];

	afterUpdate(() => {
		console.log('Cell');
		// flash(el);
	});
</script>

{#if cellData === 'ExplodedMine'}
	<div bind:this={el} aria-label="Exploded mine" class="cell open exploded" data-open={true}>
		<img class="mine-icon" src={mineImage} alt="mine" />
	</div>
{:else if isNumberCell(cellData)}
	<div
		bind:this={el}
		aria-label={cellData === 0 ? `Open cell` : `Open cell with ${cellData} adjacent cells`}
		on:click={handleClickNumberCell}
		class="cell open"
		data-open={true}
	>
		<MinesNumber value={cellData} />
	</div>
{:else if cellData === 'Mine' && gameStatus === 'lose'}
	<div bind:this={el} aria-label="Revealed mine" class="cell open" data-open={true}>
		<img class="mine-icon" src={mineImage} alt="mine" />
	</div>
{:else if cellData === 'FlaggedEmpty' && gameStatus === 'lose'}
	<div bind:this={el} aria-label="Flagged cell with no mine" class="cell open" data-open={true}>
		<img class="crossed-mine-icon" src={crossedMineImage} alt="crossed mine" />
	</div>
{:else if cellData === 'Mine' && gameStatus === 'win'}
	<div
		bind:this={el}
		aria-label="Flagged cell"
		class="cell closed flagged shadow"
		data-open={false}
	>
		<img class="flag-icon" src={flagImage} alt="flag" />
	</div>
{:else if isFlagged(cellData)}
	<div
		bind:this={el}
		aria-label="Flagged cell"
		class="cell closed flagged shadow"
		data-open={false}
		on:contextmenu|preventDefault={handleFlagCell}
	>
		<img class="flag-icon" src={flagImage} alt="flag" />
	</div>
{:else}
	<div
		bind:this={el}
		aria-label="Unrevealed cell"
		class="cell closed shadow"
		disabled={isFlagged(cellData)}
		data-open={false}
		on:click={handleClickCell}
		on:contextmenu|preventDefault={handleFlagCell}
	/>
{/if}

<style>
	.cell {
		box-sizing: border-box;
		width: 28px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		outline: none;
		background: none;
	}

	.open {
		border-color: grey;
		border-style: solid;
		border-width: 0;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	/* .open > * {
		margin: -1px 0 0 -1px;
	} */

	.exploded {
		background-color: red;
	}

	/* .closed {
	}

	.flagged {
	} */

	.flagged:active:not(:disabled) {
		border-color: grey;
		border-style: solid;
		border-width: 0;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.flag-icon {
		width: 18px;
		height: 18px;
	}

	.mine-icon {
		width: 21px;
		height: 21px;
	}

	.crossed-mine-icon {
		width: 21px;
		height: 21px;
	}
</style>
