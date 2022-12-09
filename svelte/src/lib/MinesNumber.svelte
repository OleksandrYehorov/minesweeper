<script lang="ts">
	export let value: number;

	const numbersColors = [
		'#0000fd',
		'#017e00',
		'#fd0000',
		'#010180',
		'#830003',
		'#008080',
		'#000000',
		'#808080'
	] as const;

	$: color = numbersColors[value - 1];
</script>

{#if value != 0}
	<span style:color class="number">{value}</span>
{/if}

<style>
	.number {
		font-family: 'Lato', sans-serif;
		font-weight: 900;
		font-size: 1.2rem;
	}
</style>
