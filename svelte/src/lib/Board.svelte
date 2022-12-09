<svelte:options immutable />

<script lang="ts">
	import Cell from './Cell.svelte';
	import { gameStore } from './store/store';
	import { boardSizes } from './utils/constants';

	let height: number;
	let width: number;

	gameStore.subscribe(({ difficulty }) => {
		// console.log('store');
		({ height, width } = boardSizes[difficulty]);
	});
</script>

<div class="container inverted-shadow invisible-scrollbar">
	{#each Array.from({ length: height }) as _, y (y)}
		<div class="row">
			{#each Array.from({ length: width }) as _, x (`x: ${x}, y: ${y}`)}
				<Cell {x} {y} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.container {
		box-sizing: border-box;
		width: 100%;
		overflow: scroll;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
	}

	.row {
		display: flex;
	}

	/* TODO: check .open-cell */
	.row:first-child .open-cell {
		border-top-width: 0;
	}

	.open-cell:first-child {
		border-top-width: 0;
	}
</style>
