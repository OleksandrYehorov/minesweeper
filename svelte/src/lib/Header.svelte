<script>
	import MinesCounter from './MinesCounter.svelte';
	import StartGameButton from './StartGameButton.svelte';
	import Timer from './Timer.svelte';
</script>

<header class="inverted-shadow">
	<div class="left">
		<MinesCounter />
	</div>
	<div class="center">
		<StartGameButton />
	</div>
	<div class="right">
		<Timer />
	</div>
</header>

<style>
	header {
		padding: 0.2rem;
		display: flex;
	}

	.left {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex: 1;
		overflow: hidden;
	}

	.center {
		display: flex;
		align-items: center;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex: 1;
		overflow: hidden;
	}
</style>
