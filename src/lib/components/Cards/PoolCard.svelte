<script lang="ts">
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { LoadingState, PoolInfo, PoolInfoResponse } from '$lib/ts/types';
	import { Token } from '$lib/ts/types';
	import { metaMaskCon } from '$lib/utils/helpers';
	import {
		approveToken,
		getTokenAllowance,
		getTokenBalance,
		getTokenDecimals
	} from '$lib/utils/erc20';
	import { onDestroy, onMount } from 'svelte';
	import { getContext } from 'svelte';
	import { BigNumber, ethers } from 'ethers';
	import Fa from 'svelte-fa';
	import {
		faChevronUp,
		faChevronDown
	} from '@fortawesome/free-solid-svg-icons';
	import {
		getStakedTokens,
		getPendingMush,
		getPoolLength,
		getPoolInfo,
		deposit,
		withdraw,
		harvestRewards,
		getMushPerBlock,
		getPoolMultiplier,
		getPoolWeight
	} from '$lib/utils/masterc';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { darkMode } from '$lib/stores/dark';
	import { Circle } from 'svelte-loading-spinners';
	import {
		transactionCompleted,
		transactionDeniedByTheUser,
		transactionSend
	} from '$lib/config/constants/notifications';
	import { getNotificationsContext } from 'svelte-notifications';
	import { getPoolApr } from '$lib/utils/yieldCalculator';
	import { tokenPrice } from '$lib/stores/NativeTokenPrice';
	import { getPriceOfMushPair } from '$lib/utils/lpTokenUtils';
	import { getPoolTokenPriceUSD } from '$lib/utils/coinGecko';
	import shortLargeAmount from '$lib/utils/shortLargeAmounts';
	import DepositWithdraw from '../Modals/DepositWithdraw.svelte';
	import SushiswapBadge from '../Badges/SushiswapBadge.svelte';
	import MultiplierBadge from '../Badges/MultiplierBadge.svelte';
	import { totalAllocPoints } from '$lib/stores/MasterChefData';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	import { isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import CustomSpinner from '../LoadingUI/CustomSpinner.svelte';

	const { addNotification } = getNotificationsContext();
	const { open } = getContext('simple-modal');

	export let info: PoolInfo;
	export let isFarm = false;

	let poolFeePercentage: number = null;
	let stakingTokenPrice: number;
	let stakingTokenAmount: number;
	let rewardTokenPrice: number;
	let poolLiquidityUSD: number;
	let tokenAllocatedPerBlock: number;
	let poolApr;
	let stakingTokenDecimals = 18;

	let loadingState: LoadingState = {
		loadingApproval: false,
		loadingDeposit: false,
		loadingWithdraw: false,
		loadingHarvest: false
	};

	let poolMultiplier: number;

	let isHidden = true;

	let userAcc: string;
	let tokenApproved: boolean;
	let canStake: boolean;
	let canWithdraw: boolean;
	let canHarvest: boolean;

	let wantWithdrawAmount: string;
	let idInterval;

	let tokenAllowance: BigNumber = ethers.constants.Zero;
	let userBalance: BigNumber = ethers.constants.Zero;
	let userEarnings: BigNumber = ethers.constants.Zero;
	let userStakedTokens: BigNumber = ethers.constants.Zero;

	$: rewardTokenPrice = $tokenPrice;
	$: userAcc = $accounts?.[0];

	$: tokenApproved = !tokenAllowance.isZero();
	$: canStake = !tokenAllowance.isZero() && !userBalance.isZero();
	$: canWithdraw = !userStakedTokens.isZero();
	$: canHarvest = !userEarnings.isZero();

	$: if (userAcc) {
		refreshData();
		idInterval = setInterval(refreshData, 8000);
	} else {
		clearInterval(idInterval);
	}

	const refreshData = async () => {
		try {
			tokenAllowance = await getTokenAllowance(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF),
				userAcc
			);
			if (tokenAllowance.isZero()) return;
			userBalance = await getTokenBalance(info.tokenAddr, userAcc);
			if (userBalance.isZero()) return;
			userStakedTokens = await getStakedTokens(info.pid, userAcc);
			if (userStakedTokens.isZero()) return;
			userEarnings = await getPendingMush(info.pid);
		} catch (e) {
			console.log('Failed to refresh pool Data');
		}
	};

	onMount(async () => {
		stakingTokenDecimals = await getTokenDecimals(info.tokenAddr);
		const poolInfo: PoolInfoResponse = await getPoolInfo(info.pid);
		poolFeePercentage = poolInfo.depositFeeBP * 0.01;

		poolMultiplier = getPoolMultiplier(poolInfo.allocPoint);
		stakingTokenPrice = await getStakingTokenPrice();

		const sta: BigNumber = await getTokenBalance(
			info.tokenAddr,
			getContractAddress(Token.MASTERCHEF)
		);
		stakingTokenAmount = parseFloat(
			ethers.utils.formatUnits(sta, stakingTokenDecimals)
		);
		poolLiquidityUSD = stakingTokenPrice * stakingTokenAmount;

		const poolWeightbn = getPoolWeight($totalAllocPoints, poolInfo.allocPoint);
		const tokenPerBlock = await getMushPerBlock();
		const mushPerBlock: number = parseFloat(
			ethers.utils.formatEther(tokenPerBlock)
		);
		tokenAllocatedPerBlock = mushPerBlock * poolWeightbn.toNumber();

		poolApr = getPoolApr(
			stakingTokenPrice,
			rewardTokenPrice,
			stakingTokenAmount,
			tokenAllocatedPerBlock
		);
		if (poolApr === null) {
			poolApr = 'Infinity';
		}
	});

	onDestroy(() => {
		clearInterval(idInterval);
	});

	const getStakingTokenPrice = async () => {
		if (isFarm) {
			stakingTokenPrice = await getPriceOfMushPair(info.tokenAddr);
			return stakingTokenPrice;
		} else {
			const price = await getPoolTokenPriceUSD(info.tokenAddr);
			stakingTokenPrice = price;
			return stakingTokenPrice;
		}
	};

	const onDeposit = async (amount) => {
		loadingState.loadingDeposit = true;
		addNotification(transactionSend);
		try {
			const tx = await deposit(info.pid, amount, stakingTokenDecimals);
			await tx.wait();
			addNotification(transactionCompleted);
		} catch (error) {
			console.log('Internal Error on DepositHandler', error);
			addNotification(transactionDeniedByTheUser);
		}
		loadingState.loadingDeposit = false;
	};

	const onWithdraw = async (amount) => {
		loadingState.loadingWithdraw = true;
		wantWithdrawAmount = amount;
		addNotification(transactionSend);
		try {
			const tx = await withdraw(
				info.pid,
				wantWithdrawAmount,
				stakingTokenDecimals
			);
			await tx.wait();
			addNotification(transactionCompleted);
		} catch (error) {
			console.log('Internal Error on WithdrawHandler', error);
			addNotification(transactionDeniedByTheUser);
		}
		loadingState.loadingWithdraw = false;
	};

	const onHarvest = async () => {
		loadingState.loadingHarvest = true;
		try {
			addNotification(transactionSend);
			const tx = await deposit(info.pid, '0');
			await tx.wait();
			addNotification(transactionCompleted);
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			console.log('Error: ', error);
		}
		loadingState.loadingHarvest = false;
	};

	const onApprove = async () => {
		loadingState.loadingApproval = true;
		try {
			addNotification(transactionSend);
			const tx = await approveToken(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF)
			);
			await tx.wait();
			addNotification(transactionCompleted);
		} catch {
			addNotification(transactionDeniedByTheUser);
			console.log('Oops');
		}
		loadingState.loadingApproval = false;
	};

	const openModal = (action: string) => {
		open(
			DepositWithdraw,
			{
				userStakedTokens,
				userBalance,
				stakingTokenDecimals,
				info,
				onDeposit,
				onWithdraw,
				action: action
			},
			{
				closeButton: false,
				closeOnEsc: true,
				closeOnOuterClick: true
			}
		);
	};

	const openMetamaskAlertModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	const showPoolInfo = () => {
		isHidden = !isHidden;
	};
</script>

<div
	class="self-start   bg-white dark:bg-neutral-800 {!$darkMode &&
		'shadow-xl'}  relative transform select-none rounded-3xl transition duration-300 hover:scale-105">
	<div class="absolute flex w-full flex-row-reverse p-4 ">
		<div>
			{#if isFarm}
				<SushiswapBadge />
			{/if}
			<MultiplierBadge multiplier={poolMultiplier} />
		</div>
	</div>
	<div class="cardContainer flex h-full flex-col py-4 px-8">
		<img
			src={info.tokenImagePath}
			alt={info.tokenName}
			class="my-2 self-center" />
		<div>
			<p class="mb-3 text-lg font-bold dark:text-white">{info.tokenName}</p>
		</div>
		<div class="mb-2 flex justify-between">
			<p class="text-gray-800  dark:text-gray-200">APR:</p>
			{#if poolApr == 'Infinity'}
				<p class="font-medium dark:text-white">∞</p>
			{:else if poolApr}
				<p class="font-medium dark:text-white">{shortLargeAmount(poolApr)}%</p>
			{:else}
				<p
					class="w-12 h-full bg-neutral-200 dark:bg-neutral-300 rounded-lg animate-pulse" />
			{/if}
		</div>

		<div class="mb-2 flex justify-between">
			<p class="capitalize  text-gray-800 dark:text-gray-200">
				{$_('actions.earn')}:
			</p>
			<p class="font-medium dark:text-white">MUSH</p>
		</div>

		<div class="mb-6 flex justify-between text-lg">
			<p class="capitalize  text-gray-800 dark:text-gray-200">
				{$_('actions.depositFee')}:
			</p>
			{#if poolFeePercentage != null}
				<p class="font-medium dark:text-white">{poolFeePercentage}%</p>
			{:else}
				<p
					class="w-12 h-full bg-neutral-200 dark:bg-neutral-300 rounded-lg animate-pulse" />
			{/if}
		</div>

		<div class="mb-2 flex w-full flex-col">
			<p class="text-left text-xs font-medium uppercase dark:text-white">
				<span class="text-pink-400">MUSH </span>{$_('pastActions.earned')}
			</p>
			<div class="flex w-full justify-between">
				{#if userEarnings}
					<p class="flex items-center text-xl dark:text-white">
						{parseFloat(ethers.utils.formatEther(userEarnings)).toFixed(2)}
					</p>
				{:else}
					<p class="text-xl flex items-center dark:text-white">0</p>
				{/if}
				<button
					disabled={!canHarvest || loadingState.loadingHarvest}
					on:click={onHarvest}
					class="rounded-lg py-2 
					{canHarvest &&
						'bg-gradient-to-r from-complementary-600 to-triadicGreen-600 dark:bg-gradient-to-r dark:from-complementary-500 dark:to-triadicGreen-500'} px-4 text-sm font-semibold tracking-wide 
					text-white disabled:cursor-not-allowed disabled:bg-neutral-300 dark:disabled:bg-neutral-600"
					>{$_('actions.harvest')}</button>
			</div>
		</div>

		<p class="text-left text-xs font-medium uppercase dark:text-white">
			<span class="text-pink-400">{info.tokenName} </span>{$_(
				'pastActions.staked'
			)}
		</p>
		<div class="mb-6 mt-2  flex h-10 w-full">
			{#if !$accounts}
				<button
					on:click={isMetaMaskInstalled()
						? metaMaskCon
						: openMetamaskAlertModal}
					class="h-full w-full rounded-xl bg-triadicGreen-600 font-semibold tracking-wide text-white hover:bg-triadicGreen-600">
					{$_('actions.unlock')}
				</button>
			{:else if !tokenApproved}
				<button
					on:click={onApprove}
					class="flex justify-center items-center bg-triadicGreen-700 dark:bg-triadicGreen-600 hover:bg-triadicGreen-600 dark:hover:bg-triadicGreen-700 active:scale-90  ease-in-out  duration-300 text-white tracking-wide font-semibold w-full h-full rounded-xl">
					{$_('actions.approve')}
					{isFarm ? 'Farm' : 'Pool'}
					{#if loadingState.loadingApproval}
						<div class="ml-2">
							<CustomSpinner />
						</div>
					{/if}
				</button>
			{:else}
				<div class="flex justify-between items-center w-full h-full">
					{#if userStakedTokens}
						<p class="flex text-xl dark:text-white">
							{parseFloat(
								ethers.utils.formatUnits(userStakedTokens, stakingTokenDecimals)
							).toPrecision(4)}
						</p>
					{:else}
						<p
							class="w-12 h-full bg-neutral-200 dark:bg-neutral-300 rounded-lg animate-pulse" />
					{/if}

					<div class="flex space-x-2">
						<button
							disabled={!canStake || loadingState.loadingDeposit}
							on:click={() => openModal('DEPOSIT')}
							class="bg-triadicGreen-700 dark:bg-triadicGreen-600 hover:bg-green-600 py-2 px-3 rounded-lg text-xl text-white disabled:bg-neutral-300 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
							>+</button>
						<button
							disabled={!canWithdraw || loadingState.loadingWithdraw}
							on:click={() => openModal('WITHDRAW')}
							class="bg-triadicGreen-700 dark:bg-triadicGreen-600 py-2 px-3 rounded-lg text-xl text-white disabled:bg-neutral-300 dark:disabled:bg-neutral-600  disabled:cursor-not-allowed"
							>-</button>
					</div>
				</div>
			{/if}
		</div>

		<div
			on:click={showPoolInfo}
			class="group flex cursor-pointer items-center justify-center dark:text-white">
			<p
				class="mr-2 font-medium  group-hover:text-triadicGreen-500 {!isHidden &&
					'text-triadicGreen-500'} ">
				{$_('poolCard.details')}
			</p>
			{#if isHidden}
				<div
					class="group-hover:text-triadicGreen-500 {!isHidden &&
						'text-triadicGreen-500'}">
					<Fa icon={faChevronDown} size="xs" translateY={0.15} />
				</div>
			{:else}
				<div
					class="group-hover:text-triadicGreen-500 {!isHidden &&
						'text-triadicGreen-500'}">
					<Fa icon={faChevronUp} size="xs" translateY={0.15} />
				</div>
			{/if}
		</div>
	</div>
	{#if !isHidden}
		<div
			in:slide={{ duration: 350 }}
			out:slide={{ duration: 350 }}
			class="px-8 pb-4 dark:text-white">
			<div class="mb-1 flex justify-between">
				<p>{$_('actions.stake')}</p>
				<p class="font-medium">{info.tokenName}</p>
			</div>
			<div class="mb-1 flex justify-between">
				<p>{$_('poolCard.totalLiquidity')}:</p>
				{#if poolLiquidityUSD}
					${shortLargeAmount(poolLiquidityUSD)}
				{:else}
					0
				{/if}
			</div>
			<a
				class="font-medium hover:text-green-500"
				href={`https://polygonscan.com/address/${info.tokenAddr}`}
				target="_blank">{$_('poolCard.viewonMatic')}</a>
		</div>
	{/if}
</div>

<style>
	.cardContainer {
		width: 336px;
		height: 496px;
	}

	img {
		width: 120px;
		height: 120px;
	}
</style>
