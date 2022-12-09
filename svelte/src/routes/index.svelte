<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Game from '$lib/Game.svelte';
</script>

<svelte:head>
	<title>Minesweeper</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Game />

<style>
</style>
