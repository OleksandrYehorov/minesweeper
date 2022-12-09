<script lang="ts">
	import { onMount } from 'svelte';
	import { gameStore, initGame } from './store/store';
	import { difficultyLevels, type Difficulty } from './utils/constants';

	let difficultyQuery: Difficulty = 'beginner';

	const handleClick = (difficulty: Difficulty) => {
		initGame(difficulty);
		difficultyQuery = difficulty;
	};

	onMount(() => {
		initGame(difficultyQuery);
	});
</script>

<div class="select inverted-shadow">
	{#each difficultyLevels as difficulty (difficulty)}
		<button
			class="shadow"
			class:active={$gameStore.difficulty === difficulty}
			on:click={() => handleClick(difficulty)}
		>
			{difficulty}
		</button>
	{/each}
</div>

<style>
	.select {
		display: flex;
		flex-direction: column;
	}

	button {
		opacity: 0.6;
		margin: 0;
		padding: 0.2rem;
		outline: none;
		cursor: pointer;
		text-transform: capitalize;
		flex-grow: 1;
		color: black;
	}

	.active {
		opacity: 1;
	}
</style>
