<script lang="ts">
	import Digits from './Digits.svelte';
	import { gameStore } from './store/store';
	import { boardSizes } from './utils/constants';

	$: flagsCount = $gameStore.flaggedEmptyCount + $gameStore.flaggedMinesCount;
	$: ({ mines } = boardSizes[$gameStore.difficulty]);
	$: minesLeft = mines - flagsCount;
</script>

<Digits value={minesLeft} ariaLabel="mines count" />
