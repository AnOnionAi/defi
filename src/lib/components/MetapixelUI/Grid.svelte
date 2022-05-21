<script lang="ts">
	import type { Pixel } from '$lib/types/types';

	export let grid: [number, number];
	export let pixels: Array<Pixel>;

	export let pixelSelectedX;
	export let pixelSelectedY;
	export let pixelSelectedColor;
	export let inputColorValue;

	$: col = `repeat(${grid[0]}, 10px)`; //10
	$: row = `repeat(${grid[1]}, 10px)`;

	$: size = grid[0] * grid[1];

	const changePixelSelected = (index) => {
		pixelSelectedX = pixels[index].coords.x;
		pixelSelectedY = pixels[index].coords.y;
		console.log(pixelSelectedX, pixelSelectedY);
	};

	const changeColor = (e) => {
		e.target.style.backgroundColor = inputColorValue;
		pixelSelectedColor = inputColorValue;
	};

	console.log(pixels);
</script>

<div
	class="sideShadow container m-auto mb-8 mt-5"
	style="grid-template-rows: {row}; grid-template-columns: {col};">
	{#each { length: size } as _, i (i)}
		<div
			on:click={changeColor}
			on:click={() => changePixelSelected(i)}
			style="background-color: #{pixels[i]?.color || 'ffffff'};"
			class="text-xs" />
	{/each}
</div>

<style>
	.container {
		display: grid;
		background-color: #f9fafb;
		height: min-content;
		width: max-content;
		max-width: max-content;
		overflow-x: scroll;
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
