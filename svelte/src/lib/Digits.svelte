<script lang="ts">
	export let ariaLabel: string;
	export let value: number;

	$: width = Math.max(3, String(value).length);
	$: ghostNumbers = '8'.repeat(width);
</script>

<div class="container inverted-shadow">
	<div class="numbers numbers-ghost">{ghostNumbers}</div>
	<div aria-label={ariaLabel} class="numbers numbers-main">{value}</div>
</div>

<style>
	.container {
		position: relative;
		background-color: black;
		height: 2.6rem;
		box-sizing: border-box;
	}

	.numbers {
		color: red;
		font-family: 'DSEG7-Classic';
		font-weight: bold;
		font-size: 1.8rem;
		letter-spacing: -0.1rem;
		box-sizing: border-box;
		padding: 0.1rem;
	}

	.numbers-main {
		position: absolute;
		top: 0;
		right: 0;
	}

	.numbers-ghost {
		opacity: 0.3;
	}
</style>
