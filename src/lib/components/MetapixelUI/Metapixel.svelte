<script lang="ts">
	import type { Pixel } from '$lib/types/types';
	import { metapixelContract } from '$lib/utils/contracts';
	import { getBoardSize } from '$lib/utils/metapixel';
	import { queryBoard, pixelFee } from '$lib/utils/queryBoard';
	import { getSigner } from '$lib/utils/web3Utils';
	import { getContext, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import HavePatience from '../Modals/HavePatience.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	const { open } = getContext('simple-modal');

	const openModal = () => {
		open(HavePatience, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	import BigSpinner from '../LoadingUI/BigSpinner.svelte';
	import Grid from './Grid.svelte';
	import getJackpot from '$lib/utils/metapixel/getJackpot';
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';
	import { ethers } from 'ethers';

	let inputColor = '#fe7688';
	let pixelPrice;
	let pixelSelectedX;
	let pixelSelectedY;
	let jackpot: string;
	let gridSizeX = 0;
	let gridSizeY = 0;

	const boardPixels = useQuery('boardPixels', queryBoard, {
		refetchInterval: 6000
	});

	onMount(async () => {
		const { x, y } = await getBoardSize();
		gridSizeX = x;
		gridSizeY = y;
		pixelPrice = await pixelFee();
		jackpot = await getJackpot();
	});

	const paint = async () => {
		if (
			(pixelSelectedX || pixelSelectedX == 0) &&
			(pixelSelectedY || pixelSelectedY == 0) &&
			inputColor
		) {
			inputColor = inputColor.substring(1, inputColor.length);

			const encodedColor = parseInt(inputColor, 16);

			try {
				const tx = await metapixelContract
					.connect(getSigner())
					.addPixel(encodedColor, pixelSelectedX, pixelSelectedY);

				await tx.wait();
			} catch (error) {
				if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
					openModal();
				}
			}
		} else {
			console.log('No entro');
		}

		console.log(pixelSelectedX, pixelSelectedY, inputColor);
	};
</script>

<div class="h-full w-full select-none">
	{#if $boardPixels.isLoading}
		<div class="flex h-full w-full  flex-col items-center justify-center gap-4">
			<BigSpinner tailwindWidthClass="w-20" tailwindnHeightClass="h-20" />
			<h1 class="text-xl font-bold text-gray-600 dark:text-gray-200">
				Loading Metapixel...
			</h1>
		</div>
	{:else if $boardPixels.data}
		<div class="Metapixel grid grid-rows xl:grid-cols">
			<div class="metapixel-card  flex items-center justify-center p-4">
				<div
					class="sideShadow p-8 min-w-[320px]  rounded-2xl  dark:bg-neutral-800 ">
					<div class="flex justify-between">
						<div class="">
							<p class="text-xs">Selected Color:</p>
							<input bind:value={inputColor} type="color" id="color" />
						</div>
						<div class="">
							<button
								on:click={paint}
								class="rounded-lg bg-black px-5 py-2 font-semibold tracking-wide text-white hover:bg-pink-500 disabled:opacity-50"
								>{$_('actions.paint')}
							</button>
						</div>
					</div>

					<div class="flex flex-col  pt-2 gap-1">
						<div class="flex justify-between">
							<p class=" ">Jackpot:</p>
							{#if jackpot}
								<p class="">{jackpot}</p>
							{:else}
								<LoadingSkeleton styles={{ width: '80px', height: '20px' }} />
							{/if}
						</div>
						<div class=" flex justify-between">
							<p class="">Price to Paint:</p>
							{#if pixelPrice}
								<p class="">
									{ethers.utils.formatEther(pixelPrice)} FAM
								</p>
							{:else}
								<LoadingSkeleton styles={{ width: '80px', height: '20px' }} />
							{/if}
						</div>
					</div>
				</div>
			</div>
			<Grid
				grid={[gridSizeX, gridSizeY]}
				pixels={$boardPixels.data}
				bind:pixelSelectedX
				bind:pixelSelectedY
				bind:inputColorValue={inputColor} />
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

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
