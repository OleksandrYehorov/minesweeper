<svelte:options immutable />

<script lang="ts">
	import Header from './Header.svelte';
	import Board from './Board.svelte';
	import DifficultySelect from './DifficultySelect.svelte';
</script>

<div class="container shadow">
	<Header />
	<Board />
	<DifficultySelect />
</div>

<style>
	.container {
		box-sizing: border-box;
		padding: 0.4rem;
		user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: calc(100% - 2rem);
		max-height: calc(100% - 2rem);
	}

	@media (max-width: 768px) {
		.container {
			max-width: calc(100% - 1rem);
			max-height: calc(100% - 1rem);
		}
	}
</style>
