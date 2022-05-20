<script lang="ts">
	import type { Pixel } from '$lib/types/types';

	import { metapixelContract } from '$lib/utils/contracts';
	import { getBoardSize } from '$lib/utils/metapixel';
	import { queryBoard, pixelFee } from '$lib/utils/queryBoard';
	import { getSigner } from '$lib/utils/web3Utils';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import BigSpinner from '../LoadingUI/BigSpinner.svelte';
	import Grid from './Grid.svelte';

	let inputColor;
	let inputColorValue;
	let pixelPrice;
	let pixelSelectedX;
	let pixelSelectedY;
	let pixelSelectedColor;

	let loading = true;

	let gridSizeX = 0;
	let gridSizeY = 0;

	let boardPixels: Array<Pixel> = [];

	onMount(async () => {
		const { x, y } = await getBoardSize();
		gridSizeX = x;
		gridSizeY = y;
		console.log(gridSizeX, gridSizeY);
		boardPixels = await queryBoard(x, y);

		pixelPrice = await pixelFee();

		loading = false;
	});

	const paint = async () => {
		if (
			(pixelSelectedX || pixelSelectedX == 0) &&
			(pixelSelectedY || pixelSelectedY == 0) &&
			pixelSelectedColor
		) {
			pixelSelectedColor = pixelSelectedColor.substring(
				1,
				pixelSelectedColor.length
			);

			pixelSelectedColor = parseInt(pixelSelectedColor, 16);

			console.log(pixelSelectedColor);

			const tx = await metapixelContract
				.connect(getSigner())
				.addPixel(pixelSelectedColor, pixelSelectedX, pixelSelectedY);

			await tx.wait();
			/* 	location.reload(); */
		} else {
			console.log('No entro');
		}

		console.log(pixelSelectedX, pixelSelectedY, pixelSelectedColor);
	};

	const changeColor = () => {
		inputColorValue = inputColor.value;
	};

	$: inputColorValue = inputColor?.value;
</script>

<div class="h-full w-full select-none">
	{#if loading}
		<div class="flex h-full w-full  flex-col items-center justify-center gap-4">
			<BigSpinner tailwindWidthClass="w-20" tailwindnHeightClass="h-20" />
			<h1 class="text-xl font-bold text-gray-600 dark:text-gray-200">
				Loading Metapixel...
			</h1>
		</div>
	{:else}
		<div class="Metapixel grid grid-rows xl:grid-cols">
			<div
				class="metapixel-card information flex items-center justify-center p-4">
				<div
					class="sideShadow m-auto w-max rounded-2xl bg-white dark:bg-neutral-800">
					<img
						src="/icons/usdc.svg"
						alt="USDC Token"
						class="imgToken m-auto mb-8 mt-8" />

					<div class="options grid grid-cols-2">
						<div class="input-color m-auto">
							<input
								on:change={changeColor}
								bind:this={inputColor}
								type="color"
								id="color"
								value="#fe7688" />
						</div>
						<div class="button-paint m-auto">
							<button
								on:click={paint}
								class="false s-YQIdR16N_soy flex items-center rounded-lg bg-black px-5 py-3 font-semibold tracking-wide text-white hover:bg-pink-500 disabled:opacity-50"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.paint')}</p>
							</button>
						</div>
					</div>

					<div class="description mt-8 flex flex-col px-8 pb-4">
						<div class="mb-2 flex justify-between">
							<p class="mr-2 dark:text-white">Jackpot:</p>
							<p class="dark:text-white">$48124</p>
						</div>
						<div class="mb-2 flex justify-between">
							<p class="mr-2 dark:text-white">Price to Paint:</p>
							<p class="dark:text-white">${pixelPrice}</p>
						</div>
					</div>
				</div>
			</div>
			<Grid
				grid={[gridSizeX, gridSizeY]}
				pixels={boardPixels}
				bind:pixelSelectedX
				bind:pixelSelectedY
				bind:pixelSelectedColor
				bind:inputColorValue />
		</div>
	{/if}
</div>

<style>
	@media only screen and (min-width: 1160px) {
		.Metapixel {
			grid-template-columns: 25% 75%;
		}
	}

	@media only screen and (max-width: 480px) {
		.metapixel-card {
			justify-self: flex-start;
		}
	}

	.metapixel-card {
		max-width: 100vw;
	}

	.Metapixel {
		overflow: scroll;
	}

	.imgToken {
		width: 40%;
		height: 40%;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
