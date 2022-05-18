<script lang="ts">
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';
	import { BigNumber, ethers } from 'ethers';
	import { getSigner } from '$lib/utils/web3Utils';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { _ } from 'svelte-i18n';
	import { isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import { metaMaskCon } from '$lib/utils/metamaskCalls';
	import MetamaskNotInstalled from '../../lib/components/Modals/MetamaskNotInstalled.svelte';
	import {
		famContract,
		isApproved,
		metapixelContract
	} from '$lib/utils/contracts';
	import { METAPIXEL_ADDRESS } from '$lib/config';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import ApproveMush from '$lib/components/Cards/ApproveMush.svelte';
	import Approve from '$lib/components/MetapixelUI/Approve.svelte';
	const { open } = getContext('simple-modal');

	const development = false;

	$: userAddress = $accounts?.[0];

	$: {
		if (userAddress) {
			checkApproved(userAddress);
		}
	}

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

			/* await tx.wait() */
		} else {
			console.log('No entro');
		}
	};

	const onApprove = async () => {
		await famContract
			.connect(getSigner())
			.approve(METAPIXEL_ADDRESS, ethers.constants.MaxUint256);
	};

	onMount(async () => {
		let sizeX: BigNumber = await metapixelContract.gridSizeX();
		let sizeY: BigNumber = await metapixelContract.gridSizeY();

		pixelPrice = await metapixelContract.pixelFee();
		token = await famContract.name();
		tokenSymbol = await famContract.symbol();
	});

	const openMetamaskAlertModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	// 1. Usuario no esta logueado  <Login/>
	// 2. Usuario logueado PERO sin approve <Approve/>
	// 3. Usuario logueado y con approve.
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
{#if userAddress && isApproved}{/if}

<!-- 
	<div class="Metapixel grid grid-rows lg:grid-cols">
		<div class="metapixel-card information p-4">
			<div
				class="bg-white dark:bg-neutral-800 rounded-2xl sideShadow w-max m-auto grid grid-rows-2">
				<div class="options grid grid-cols-2">
					<div class="input-color m-auto">
						<input
							bind:this={inputColor}
							type="color"
							id="color"
							value="#fe7688" />
					</div>
					<div class="button-paint m-auto">
						{#if !userAddress}
							<button
								on:click={isMetaMaskInstalled()
									? metaMaskCon
									: openMetamaskAlertModal}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.unlock')}</p>
							</button>
						{:else if userAddress && !tokenApproved}
							<button
								on:click={onApprove}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.approve')}</p>
							</button>
						{:else}
							<button
								on:click={paint}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.paint')}</p>
							</button>
						{/if}
					</div>
				</div>

				<div class="description mt-8 px-8 pb-4 flex flex-col">
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Jackpot:</p>
						<p class="dark:text-white">$48124</p>
					</div>
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Token:</p>
						<p class="dark:text-white">{token}({tokenSymbol})</p>
					</div>
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Price to Paint:</p>
						<p class="dark:text-white">${pixelPrice}</p>
					</div>
				</div>
			</div>
		</div>

		<div
			bind:this={gridContainer}
			id="grid"
			class="m-auto mb-8 mt-5 w-11/12 sideShadow" />
	</div> -->
<style>
	@media only screen and (max-width: 1160px) {
		.Metapixel {
			grid-template-rows: 25% 80%;
		}
		#grid {
			margin-top: 2em;
		}
	}

	@media only screen and (min-width: 1160px) {
		.Metapixel {
			grid-template-columns: 25% 80%;
		}
	}

	.metapixel-card {
		width: 336px;
		height: 496px;
	}

	#grid {
		background-color: #f9fafb;
	}

	.options {
		padding: 1em;
		margin-bottom: 1em;
		justify-content: center;
		align-items: center;
	}

	#grid {
		height: 90vh;
		width: 90vh;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		gap: 1px;
		padding: 1px;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
