<script lang="ts">
	import type { Pixel } from '$lib/types/types';

	export let grid = [4, 4];
	export let pixels: Pixel[];

	$: col = `repeat(${grid[1]}, 1fr)`;
	$: row = `repeat(${grid[0]}, 1fr)`;

	const size = 36;
</script>

<div
	class="sideShadow container m-auto mb-8 mt-5 w-11/12"
	style="grid-template-rows: {row}; grid-template-columns: {col};">
	{#each { length: size } as _, i (i)}
		<div style="background-color: #{pixels[i].color};" />
	{/each}
</div>

<style>
	.container {
		display: grid;
		border: 1px solid #999;
		border-radius: 2px;
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
</style>
