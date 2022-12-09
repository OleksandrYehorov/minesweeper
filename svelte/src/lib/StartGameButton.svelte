<script lang="ts">
	import { gameStore, initGame } from './store/store';
	import { match } from 'ts-pattern';
	import dizzyFace from '$lib/images/dizzy-face.png';
	import smilingFace from '$lib/images/smiling-face.png';
	import smilingFaceWithSunglasses from '$lib/images/smiling-face-with-sunglasses.png';

	$: emoji = match($gameStore.status)
		.with('starting', () => ({ src: smilingFace, alt: 'smiling face' }))
		.with('playing', () => ({ src: smilingFace, alt: 'smiling face' }))
		.with('win', () => ({ src: smilingFaceWithSunglasses, alt: 'smiling face with sunglasses' }))
		.with('lose', () => ({ src: dizzyFace, alt: 'dizzy face' }))
		.run();
</script>

<!-- TODO: inverted-shadow -->
<button aria-label="restart" on:click={() => initGame()} class="shadow">
	<img src={emoji.src} alt={emoji.alt} />
</button>

<style>
	button {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		width: 2.6rem;
		height: 2.6rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		outline: none;
	}

	img {
		width: 80%;
	}
</style>
