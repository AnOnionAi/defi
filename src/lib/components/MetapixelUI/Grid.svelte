<script lang="ts">
	import type { Pixel } from '$lib/types/types';

	export let grid: [number, number];
	export let pixels: Array<Pixel>;

	export let pixelSelectedX;
	export let pixelSelectedY;
	export let inputColorValue: string;

	let selectedPixel: null | HTMLDivElement = null;
	let selectedPixelIndex: null | number = null;
	$: col = `repeat(${grid[0]}, 10px)`; //10
	$: row = `repeat(${grid[1]}, 10px)`;
	$: board = maintainLocalPixel(pixels);
	$: size = grid[0] * grid[1];

	const selectPixel = (clickEvent, pixelIndex) => {
		if (selectedPixel !== null) {
			selectedPixel.style.backgroundColor = '#ffffff';
		}
		selectedPixel = clickEvent.target;
		selectedPixel.style.backgroundColor = inputColorValue;
		pixelSelectedX = pixels[pixelIndex].coords.x;
		pixelSelectedY = pixels[pixelIndex].coords.y;
		selectedPixelIndex = pixelIndex;
	};

	const maintainLocalPixel = (board: Array<Pixel>): Array<Pixel> => {
		const boardCopy = [...board];
		if (selectedPixelIndex) {
			boardCopy[selectedPixelIndex] = {
				...boardCopy[selectedPixelIndex],
				color: inputColorValue.replace('#', '')
			};
		}
		return [...boardCopy];
	};
</script>

<div
	class="sideShadow container m-auto mb-8 mt-5"
	style="grid-template-rows: {row}; grid-template-columns: {col};">
	{#each { length: size } as _, i (i)}
		<div
			id={`${i}`}
			on:click={(e) => selectPixel(e, i)}
			style="background-color: #{board[i]?.color || 'ffffff'};"
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
