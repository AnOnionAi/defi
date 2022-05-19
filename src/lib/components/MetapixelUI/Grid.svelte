<script lang="ts">
	import type { Pixel } from '$lib/types/types';

	export let grid: [number, number];
	export let pixels: Array<Pixel>;

	$: col = `repeat(${grid[1]}, 10px)`;
	$: row = `repeat(${grid[0]}, 10px)`;

	$: size = grid[0] * grid[1];
</script>

<div
	class="sideShadow container m-auto mb-8 mt-5 w-11/12"
	style="grid-template-rows: {row}; grid-template-columns: {col};">
	{#each { length: size } as _, i (i)}
		<div style="background-color: #{pixels[i]?.color || 'fff'};" />
	{/each}
</div>

<style>
	.container {
		display: grid;
		border: 1px solid #999;
		grid-gap: 1px;
		background-color: #f9fafb;
		height: 90vh;
		width: 90vh;
	}

	.container div {
		background: #fff;
	}

	.container div:hover {
		transform: scale(1.3);
		z-index: 2;
		border: 1px solid;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
