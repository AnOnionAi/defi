<script lang="ts">
	import { slide } from 'svelte/transition';
	import { isLoading, _ } from 'svelte-i18n';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { LoadingState, PoolInfo } from '$lib/types/types';
	import { Token } from '$lib/types/types';
	import { metaMaskCon } from '$lib/utils/metamaskCalls';
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
		getPoolInfo,
		deposit,
		withdraw,
		getMushPerBlock,
		getPoolMultiplier,
		getPoolWeight,
		masterChefContract
	} from '$lib/utils/masterc';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { darkMode } from '$lib/stores/dark';
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
	import {
		spawnErrorNotification,
		spawnSuccessNotification
	} from '$lib/utils/spawnNotifications';
	import { useQuery } from '@sveltestack/svelte-query';
	import fetchMasterChefPool from '$lib/utils/fetchPool';
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';
	import { height } from '@fortawesome/free-solid-svg-icons/faChevronUp';
	import fetchPoolUserBalance from '$lib/utils/fetchPoolUserBalance';
	import { dataset_dev } from 'svelte/internal';

	const { addNotification } = getNotificationsContext();
	const { open } = getContext('simple-modal');

	export let info: PoolInfo;
	export let isFarm = false;

	let poolApr;

	let loadingState: LoadingState = {
		loadingApproval: false,
		loadingDeposit: false,
		loadingWithdraw: false,
		loadingHarvest: false
	};

	let isHidden = true;

	let userAcc: string;
	let tokenApproved: boolean;
	let canStake: boolean;
	let canWithdraw: boolean;
	let canHarvest: boolean;

	let wantWithdrawAmount: string;

	$: userAcc = $accounts?.[0];

	$: tokenApproved = $poolUserQuery.data
		? !$poolUserQuery.data?.tokenAllowance.isZero()
		: false;
	$: userHasBalance = $poolUserQuery.data
		? !$poolUserQuery.data.userBalance.isZero()
		: false;
	$: canStake = tokenApproved && userHasBalance;
	$: canWithdraw = $poolUserQuery.data
		? !$poolUserQuery.data.userStakedTokens.isZero()
		: false;
	$: canHarvest = $poolUserQuery.data
		? !$poolUserQuery.data.userEarnings.isZero()
		: false;

	const poolQuery = useQuery(
		['poolQuery', info.pid, info.tokenAddr, isFarm],
		async () => {
			const poolQueryResponse = await fetchMasterChefPool(
				info.pid,
				info.tokenAddr,
				isFarm
			);
			return poolQueryResponse;
		},
		{
			refetchInterval: 4000
		}
	);

	const poolUserQuery = useQuery(
		['poolUserQuery', info.pid, info.tokenAddr, userAcc],
		async () => {
			if (!userAcc) return null;
			const poolUserResponse = await fetchPoolUserBalance(
				info.pid,
				userAcc,
				info.tokenAddr
			);
			return poolUserResponse;
		},
		{
			refetchInterval: 4000
		}
	);

	$: {
		if ($poolQuery.data && $tokenPrice) {
			poolApr = getPoolApr(
				$poolQuery.data?.stakingTokenPrice,
				$tokenPrice,
				$poolQuery.data?.stakedInPool,
				$poolQuery.data?.tokenAllocatedPerBlock
			);
		}
	}

	const onDeposit = async (amount) => {
		loadingState.loadingDeposit = true;
		try {
			const tx = await deposit(info.pid, amount, info.tokenDecimals);
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
		} catch (error) {
			spawnErrorNotification(addNotification, error);
		}
		loadingState.loadingDeposit = false;
	};

	const onWithdraw = async (amount) => {
		loadingState.loadingWithdraw = true;
		wantWithdrawAmount = amount;
		try {
			const tx = await withdraw(
				info.pid,
				wantWithdrawAmount,
				info.tokenDecimals
			);
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
		} catch (error) {
			spawnErrorNotification(addNotification, error);
		}
		loadingState.loadingWithdraw = false;
	};

	const onHarvest = async () => {
		loadingState.loadingHarvest = true;
		try {
			const tx = await deposit(info.pid, '0');
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
		} catch (error) {
			spawnErrorNotification(addNotification, error);
		}
		loadingState.loadingHarvest = false;
	};

	const onApprove = async () => {
		loadingState.loadingApproval = true;
		try {
			const tx = await approveToken(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF)
			);
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
		} catch (error) {
			spawnErrorNotification(addNotification, error);
		}
		loadingState.loadingApproval = false;
	};

	const openModal = (action: string) => {
		open(
			DepositWithdraw,
			{
				userStakedTokens: $poolUserQuery.data?.userStakedTokens,
				userBalance: $poolUserQuery.data?.userBalance,
				stakingTokenDecimals: info.tokenDecimals,
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

	const toggleOpen = () => {
		isHidden = !isHidden;
	};
</script>

<div
	class="self-start   bg-white dark:bg-neutral-800 {!$darkMode &&
		'customShadow'}  relative transform select-none rounded-3xl transition duration-300 ">
	<div class="absolute flex w-full flex-row-reverse p-4 ">
		<div>
			{#if isFarm}
				<SushiswapBadge />
			{/if}
			<MultiplierBadge multiplier={$poolQuery.data?.poolMultiplier} />
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
			{#if poolApr === null}
				<p class="font-medium dark:text-white">∞</p>
			{:else if poolApr}
				<p class="font-medium dark:text-white">
					{shortLargeAmount(poolApr)}%
				</p>
			{:else}
				<LoadingSkeleton styles={{ width: '60px', height: '24px' }} />
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
			{#if $poolQuery.data?.poolFeePercentage === null}
				<p class="font-medium dark:text-white">∞</p>
			{:else if $poolQuery.data?.poolFeePercentage}
				<p class="font-medium dark:text-white">
					{$poolQuery.data?.poolFeePercentage}%
				</p>
			{:else if $poolQuery.isLoading}
				<LoadingSkeleton styles={{ width: '60px', height: '24px' }} />
			{/if}
		</div>

		<div class="mb-2 flex w-full flex-col">
			<p class="text-left text-xs font-medium uppercase dark:text-white">
				<span class="text-pink-400">MUSH </span>{$_('pastActions.earned')}
			</p>
			<div class="flex w-full justify-between">
				{#if $poolUserQuery.data?.userEarnings}
					<p class="flex items-center text-xl dark:text-white">
						{parseFloat(
							ethers.utils.formatEther($poolUserQuery.data?.userEarnings)
						).toFixed(2)}
					</p>
				{:else if $poolUserQuery.isLoading || $poolUserQuery.data === null}
					<LoadingSkeleton styles={{ width: '60px', height: '32px' }} />
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
					class="h-full w-full rounded-xl bg-triadicGreen-600 font-semibold tracking-wide text-white hover:bg-triadicGreen-800">
					{$_('actions.unlock')}
				</button>
			{:else if !tokenApproved}
				<button
					on:click={onApprove}
					class="flex h-full w-full items-center justify-center rounded-xl bg-triadicGreen-700 font-semibold  tracking-wide  text-white duration-300 ease-in-out hover:bg-triadicGreen-600 active:scale-90 dark:bg-triadicGreen-600 dark:hover:bg-triadicGreen-800">
					{$_('actions.approve')}
					{isFarm ? 'Farm' : 'Pool'}
					{#if loadingState.loadingApproval}
						<div class="ml-2">
							<CustomSpinner />
						</div>
					{/if}
				</button>
			{:else}
				<div class="flex h-full w-full items-center justify-between">
					{#if $poolUserQuery.data?.userStakedTokens}
						<p class="flex text-xl dark:text-white">
							{parseFloat(
								ethers.utils.formatUnits(
									$poolUserQuery.data?.userStakedTokens,
									info.tokenDecimals
								)
							).toFixed(1)}
							{#if parseFloat(ethers.utils.formatUnits($poolUserQuery.data?.userStakedTokens, info.tokenDecimals)) < 0.0001 && !$poolUserQuery.data?.userStakedTokens.isZero()}
								<span
									>.... {ethers.utils
										.formatUnits(
											$poolUserQuery.data?.userStakedTokens,
											info.tokenDecimals
										)
										.slice(-2)}</span>
							{/if}
						</p>
					{:else}
						<p
							class="h-full w-12 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-300" />
					{/if}

					<div class="flex space-x-2">
						<button
							disabled={!canStake || loadingState.loadingDeposit}
							on:click={() => openModal('DEPOSIT')}
							class="rounded-lg bg-triadicGreen-700 py-2 px-5 text-xl text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-neutral-300 dark:bg-triadicGreen-600 dark:disabled:bg-neutral-600"
							>+</button>
						<button
							disabled={!canWithdraw || loadingState.loadingWithdraw}
							on:click={() => openModal('WITHDRAW')}
							class=" rounded-lg bg-triadicGreen-700 py-2 px-3 text-2xl font-bold text-white disabled:cursor-not-allowed disabled:bg-neutral-300 dark:bg-triadicGreen-600  dark:disabled:bg-neutral-600"
							>-</button>
					</div>
				</div>
			{/if}
		</div>

		<div
			on:click={toggleOpen}
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
				{#if $poolQuery.data?.poolLiquidity}
					${shortLargeAmount($poolQuery.data?.poolLiquidity)}
				{:else if $poolQuery.isLoading}
					<LoadingSkeleton styles={{ width: '60px', height: '20px' }} />
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

	.customShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
