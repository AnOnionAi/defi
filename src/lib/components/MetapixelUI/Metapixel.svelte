<script lang="ts">
	import {
		getERC20Contract,
		metapixelContract,
		mushTokenContract
	} from '$lib/utils/contracts';
	import { getBoardSize } from '$lib/utils/metapixel';
	import { queryBoard, pixelFee } from '$lib/utils/queryBoard';
	import { getSigner } from '$lib/utils/web3Utils';
	import { getContext, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import HavePatience from '../Modals/HavePatience.svelte';
	import { useQuery } from '@sveltestack/svelte-query';
	import BigSpinner from '../LoadingUI/BigSpinner.svelte';
	import Grid from './Grid.svelte';
	import getJackpot from '$lib/utils/metapixel/getJackpot';
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';
	import { BigNumber, ethers } from 'ethers';
	import WinningAnnouncement from './WinningAnnouncement.svelte';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { METAPIXEL_ADDRESS } from '$lib/config';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { Token } from '$lib/types/types';
	import { getNotificationsContext } from 'svelte-notifications';
	import {
		spawnErrorNotification,
		spawnSuccessNotification
	} from '$lib/utils/spawnNotifications';

	const { open } = getContext('simple-modal');
	const { addNotification } = getNotificationsContext();
	const usdcContract = getERC20Contract(getContractAddress(Token.USDC));

	let inputColor = '#fe7688';
	let pixelPrice;
	let pixelSelectedX;
	let pixelSelectedY;
	let jackpot: string;
	let gridSizeX = 0;
	let gridSizeY = 0;

	let lotteryEnd = false;
	let winnerAddress: string;

	let loadingPainting = false;

	$: userAddress = $accounts?.[0];

	const boardPixels = useQuery('boardPixels', queryBoard, {
		refetchInterval: 6000
	});

	const tokenAllowance = useQuery(
		['tokenAllowance', userAddress],
		async () => {
			const allowance = await usdcContract.allowance(
				userAddress,
				METAPIXEL_ADDRESS
			);
			console.log('refetched');
			return allowance;
		},
		{
			enabled: !!userAddress
		}
	);

	$: {
		tokenAllowance.updateOptions({
			enabled: !!userAddress
		});
	}

	const approveToken = async () => {
		try {
			const approvalTx = await usdcContract
				.connect(getSigner())
				.approve(METAPIXEL_ADDRESS, ethers.constants.MaxUint256);
			spawnSuccessNotification(addNotification, 'SENT');
			await approvalTx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
			$tokenAllowance.refetch();
		} catch (e) {
			spawnErrorNotification(addNotification, e);
		}
	};

	metapixelContract.on(
		'LotteryTriggered',
		(address: string, lottPott: BigNumber) => {
			winnerAddress = address;
			jackpot = ethers.utils.formatEther(lottPott);
			lotteryEnd = true;
			setTimeout(() => {
				lotteryEnd = false;
			}, 15000);
		}
	);

	const openModal = () => {
		open(HavePatience, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

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
			const selectedColor = inputColor.substring(1, inputColor.length);

			const encodedColor = parseInt(selectedColor, 16);

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
		loadingPainting = false;
	};
</script>

<div class="h-full w-full select-none">
	{#if lotteryEnd}
		<WinningAnnouncement {winnerAddress} {jackpot} />
	{/if}

	{#if $boardPixels.isLoading}
		<div class="flex h-full w-full  flex-col items-center justify-center gap-4">
			<BigSpinner tailwindWidthClass="w-20" tailwindnHeightClass="h-20" />
			<h1 class="text-xl font-bold text-gray-600 dark:text-gray-200">
				Loading Metapixel...
			</h1>
		</div>
	{:else if $boardPixels.data}
		<div class="Metapixel grid-rows xl:grid-cols grid">
			<div
				class="metapixel-card  flex flex-col items-center justify-center gap-12 p-4">
				{#if !$tokenAllowance.data?.isZero() && $tokenAllowance.isSuccess}
					<div
						class="sideShadow w-[360px] rounded-2xl p-8  dark:bg-neutral-800  lg:w-[420px] ">
						<div class="flex items-center justify-between">
							<input
								class="h-10"
								bind:value={inputColor}
								type="color"
								id="color" />

							<button
								disabled={loadingPainting}
								on:click={paint}
								class="rounded-lg px-5 py-2 font-semibold text-white {!loadingPainting
									? 'bg-gradient-to-r from-complementary-600 to-triadicGreen-600 transition duration-300 hover:scale-105 hover:opacity-80'
									: 'bg-gray-400 dark:bg-neutral-700'}  disabled:cursor-not-allowed"
								>{loadingPainting ? 'Painting' : $_('actions.paint')}
							</button>
						</div>
						<div class="mt-4 flex flex-col gap-1 dark:text-white">
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
										{ethers.utils.formatEther(pixelPrice)} USDC
									</p>
								{:else}
									<LoadingSkeleton styles={{ width: '80px', height: '20px' }} />
								{/if}
							</div>
						</div>
					</div>
				{/if}

				{#if $tokenAllowance.data?.isZero() && $tokenAllowance.isSuccess}
					<div
						class="sideShadow flex w-[420px] flex-col items-center gap-2 rounded-2xl p-8 dark:bg-neutral-800">
						<img src="/icons/usdc.svg" class="h-12" alt="USDC Token" />
						<p class="font-medium dark:text-white">
							Approve USDC spend and start painting
						</p>
						<button
							on:click={approveToken}
							class="rounded-lg bg-primary-400 py-1 px-4  font-medium text-white hover:bg-primary-300 dark:bg-analogPurple-400 dark:hover:bg-analogPurple-500  "
							>Approve</button>
					</div>
				{/if}

				<div
					class="sideShadow flex w-[360px] flex-col gap-2 rounded-2xl bg-white p-8 dark:bg-neutral-800 lg:w-[420px]">
					<div class="dark:text-white">
						<h3 class="text-xl font-bold">To Play:</h3>
						<ol class="list-decimal pl-2 text-gray-700 dark:text-gray-300">
							<li>Make sure you have the correct contracts</li>
							<li>Use the color selector and grab your color</li>
							<li>Click on a pixel on the board</li>
							<li>Click on "Paint"</li>
							<li>Confirm the transaction!</li>
						</ol>
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
