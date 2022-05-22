<script lang="ts">
	import type { Pixel } from '$lib/types/types';
	import { famContract, metapixelContract } from '$lib/utils/contracts';
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

	let loadingPainting = false;
	let loadingMinting = false;

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
				loadingPainting = true;
				const tx = await metapixelContract
					.connect(getSigner())
					.addPixel(encodedColor, pixelSelectedX, pixelSelectedY);

				await tx.wait();
			} catch (error) {
				if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
					openModal();
				}
			}
		}
		console.log(pixelSelectedX, pixelSelectedY, inputColor);
		loadingPainting = false;
	};

	const mintFAM = async () => {
		loadingMinting = true;
		try {
			const tx = await famContract.connect(getSigner()).mint();
			await tx.wait();
		} catch (e) {
			console.log(e);
		}
		loadingMinting = false;
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
			<div
				class="metapixel-card flex flex-col items-center justify-center sm:pl-36 gap-2">
				<div
					class="bg-white py-4 px-8 dark:bg-neutral-800 sideShadow min-w-[360px] rounded-2xl flex flex-col gap-1">
					<h2 class=" font-medium text-gray-800 dark:text-gray-100 ">
						Welcome To MetaPixel ! 🎉 <br /> An Interactive Art Collaborative 🎨
					</h2>
					<div class="flex justify-between">
						<p class="dark:text-gray-200">Rinkeby ETH Required</p>
						<div>
							<a
								href="https://rinkebyfaucet.com/"
								target="_blank"
								class="text-sm font-semibold  text-primary-300 dark:text-analogPurple-300 underline hover:text-primary-500 dark:hover:text-analogPurple-200"
								>FaucetA</a>
							<a
								href="https://faucet.rinkeby.io/"
								target="_blank"
								class="text-sm font-semibold  text-primary-300 dark:text-analogPurple-300 underline hover:text-primary-500 dark:hover:text-analogPurple-200"
								>FaucetB</a>
						</div>
					</div>
					<h2 class=" font-medium text-gray-800 dark:text-gray-100 ">
						Contract requires Test Tokens
						<button
							on:click={mintFAM}
							disabled={loadingMinting}
							class=" text-primary-400 dark:text-analogPurple-300  font-semibold underline disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed
						">Mint</button>
					</h2>
					<div class="dark:text-white">
						<h3 class="font-bold">To Play:</h3>
						<ol class="list-decimal pl-4">
							<li>Make sure you have the correct contracts</li>
							<li>Use the color selector and grab your color</li>
							<li>Click a pixel on the board. Only one at a time</li>
							<li>Click on "Paint"</li>
							<li>Confirm the transaction</li>
							<li>
								Draw with friends & win prizes !
								<br /> There's One lucky pixel !
							</li>
						</ol>
					</div>
				</div>
				<div
					class="sideShadow px-8 py-4 min-w-[360px]  rounded-2xl  dark:bg-neutral-800 ">
					<div class="flex justify-between items-center">
						<input
							class="h-10"
							bind:value={inputColor}
							type="color"
							id="color" />

						<button
							disabled={loadingPainting}
							on:click={paint}
							class="px-5 py-2 font-semibold text-white rounded-lg {!loadingPainting
								? 'bg-gradient-to-r from-complementary-600 to-triadicGreen-600 transition duration-300 hover:scale-105 hover:opacity-80'
								: 'bg-gray-400 dark:bg-neutral-700'}  disabled:cursor-not-allowed"
							>{loadingPainting ? 'Painting' : $_('actions.paint')}
						</button>
					</div>
					<div class="flex flex-col mt-4 gap-1 dark:text-white">
						<div class="flex justify-between">
							<p class=" ">Jackpot:</p>
							{#if jackpot}
								<p class="">{jackpot}</p>
							{:else}
								<LoadingSkeleton styles={{ width: '80px', height: '20px' }} />
							{/if}
						</div>
						<div class=" flex justify-between">
							<p class="">Paint $:</p>
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
