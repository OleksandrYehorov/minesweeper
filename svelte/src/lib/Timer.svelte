<script lang="ts">
	import { browser } from '$app/env';
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';
	import { match } from 'ts-pattern';
	import Digits from './Digits.svelte';
	import { gameStore, type GameStatus } from './store/store';

	let value = 0;
	let interval: number | undefined;
	let prevStatus: GameStatus = get(gameStore).status;

	// TODO: fix
	gameStore.subscribe(({ status }) => {
		if (!browser) return;

		if (status !== prevStatus) {
			match(status)
				.with('playing', () => {
					interval = window.setInterval(() => {
						value += 1;
					}, 1000);
				})
				.with('lose', 'win', () => {
					window.clearInterval(interval);
				})
				.with('starting', () => {
					value = 0;
				})
				.run();

			prevStatus = status;
		}
	});

	onDestroy(() => {
		if (browser) window.clearInterval(interval);
	});
</script>

<Digits {value} ariaLabel="timer" />
