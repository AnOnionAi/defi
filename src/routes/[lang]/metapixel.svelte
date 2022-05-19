<script lang="ts">
	import { onMount } from 'svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';
	import type { BigNumber } from 'ethers';
	import { getSigner } from '$lib/utils/web3Utils';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { _ } from 'svelte-i18n';
	import {
		famContract,
		isApproved,
		metapixelContract
	} from '$lib/utils/contracts';
	import { METAPIXEL_ADDRESS } from '$lib/config';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import Approve from '$lib/components/MetapixelUI/Approve.svelte';
	import Grid from '$lib/components/MetapixelUI/Grid.svelte';
	import type { Pixel } from '$lib/types/types';

	const development = false;

	$: userAddress = $accounts?.[0];

	$: {
		if (userAddress) {
			checkApproved(userAddress);
		}
	}

	const pixels: Pixel[] = [
		{ coords: { x: 0, y: 0 }, color: '40D015' },
		{ coords: { x: 1, y: 0 }, color: '40D015' },
		{ coords: { x: 2, y: 0 }, color: '40D015' },
		{ coords: { x: 3, y: 0 }, color: '40D015' },
		{ coords: { x: 4, y: 0 }, color: '40D015' },
		{ coords: { x: 5, y: 0 }, color: '40D015' },
		{ coords: { x: 0, y: 1 }, color: '40D015' },
		{ coords: { x: 1, y: 1 }, color: '40D015' },
		{ coords: { x: 2, y: 1 }, color: '40D015' },
		{ coords: { x: 3, y: 1 }, color: '40D015' },
		{ coords: { x: 4, y: 1 }, color: '40D015' },
		{ coords: { x: 5, y: 1 }, color: '40D015' },
		{ coords: { x: 0, y: 2 }, color: '40D015' },
		{ coords: { x: 1, y: 2 }, color: '40D015' },
		{ coords: { x: 2, y: 2 }, color: '40D015' },
		{ coords: { x: 3, y: 2 }, color: '40D015' },
		{ coords: { x: 4, y: 2 }, color: '40D015' },
		{ coords: { x: 5, y: 2 }, color: '40D015' },
		{ coords: { x: 0, y: 3 }, color: '40D015' },
		{ coords: { x: 1, y: 3 }, color: '40D015' },
		{ coords: { x: 2, y: 3 }, color: '40D015' },
		{ coords: { x: 3, y: 3 }, color: '40D015' },
		{ coords: { x: 4, y: 3 }, color: '40D015' },
		{ coords: { x: 5, y: 3 }, color: '40D015' },
		{ coords: { x: 0, y: 4 }, color: '40D015' },
		{ coords: { x: 1, y: 4 }, color: '40D015' },
		{ coords: { x: 2, y: 4 }, color: '40D015' },
		{ coords: { x: 3, y: 4 }, color: '40D015' },
		{ coords: { x: 4, y: 4 }, color: '40D015' },
		{ coords: { x: 5, y: 4 }, color: '40D015' },
		{ coords: { x: 0, y: 5 }, color: '40D015' },
		{ coords: { x: 1, y: 5 }, color: '40D015' },
		{ coords: { x: 2, y: 5 }, color: '40D015' },
		{ coords: { x: 3, y: 5 }, color: '40D015' },
		{ coords: { x: 4, y: 5 }, color: '40D015' },
		{ coords: { x: 5, y: 5 }, color: '40D015' }
	];

	const grid = [6, 6];

	let tokenApproved = false;
	let gridContainer;
	let pixelSelectedX;
	let pixelSelectedY;
	let pixelSelectedColor;
	let pixelPrice;
	let token;
	let tokenSymbol;
	let inputColor;

	const checkApproved = async (userAddress) => {
		const allowance: BigNumber = await famContract.allowance(
			userAddress,
			METAPIXEL_ADDRESS
		);

		const estaAprobado = !allowance.isZero();
		console.log('Allowance', allowance);
		console.log(estaAprobado);
		tokenApproved = estaAprobado;
	};

	const changeColor = (e) => {
		e.target.style.backgroundColor = inputColor.value;
		pixelSelectedColor = inputColor.value;
	};

	const changePixelSelected = (x, y) => {
		pixelSelectedX = x;
		pixelSelectedY = y;
	};

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

			const tx = await metapixelContract
				.connect(getSigner())
				.addPixel(pixelSelectedColor, pixelSelectedX, pixelSelectedY);

			await tx.wait();
			location.reload();
		} else {
			console.log('No entro');
		}
	};

	onMount(async () => {
		let sizeX: BigNumber = await metapixelContract.gridSizeX();
		let sizeY: BigNumber = await metapixelContract.gridSizeY();

		pixelPrice = await metapixelContract.pixelFee();
		token = await famContract.name();
		tokenSymbol = await famContract.symbol();
	});
</script>

<!-- <DisabledFeature /> -->

{#if !userAddress}
	<div class="flex h-full w-full items-center justify-center">
		<div class="w-1/2 min-w-[320px] max-w-3xl ">
			<Connect />
		</div>
	</div>
{/if}
{#if userAddress && !isApproved}
	<Approve />
{/if}
{#if userAddress && isApproved}
	<div class="Metapixel grid-rows lg:grid-cols grid">
		<div
			class="metapixel-card information flex items-center justify-center p-4">
			<div
				class="sideShadow m-auto grid w-max grid-rows-2 rounded-2xl bg-white dark:bg-neutral-800">
				<img
					src="/icons/usdc.svg"
					alt="USDC Token"
					class="imgToken m-auto mb-8" />

				<div class="options grid grid-cols-2">
					<div class="input-color m-auto">
						<input
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

		<Grid {grid} {pixels} />
	</div>
{/if}

<style>
	@media only screen and (max-width: 1160px) {
		.Metapixel {
			grid-template-rows: 25% 80%;
		}
	}

	@media only screen and (min-width: 1160px) {
		.Metapixel {
			grid-template-columns: 25% 80%;
		}
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}

	.imgToken {
		width: 60%;
		height: 60%;
	}
</style>
