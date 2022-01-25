<script lang="ts">
	import { Provider } from '$lib/utils/web3Helpers';
	import ERC20ABI from '$lib/config/abi/ERC20.json';
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { PoolInfo } from '$lib/ts/types';
	import { Token } from '$lib/ts/types';
	import { metaMaskCon } from '$lib/utils/helpers';
	import { approveToken, getTokenAllowance, isNotZero, getTokenBalance } from '$lib/utils/erc20';
	import { onDestroy, onMount } from 'svelte';
	import { getContext } from 'svelte';
	import { BigNumber, ethers } from 'ethers';
	import Fa from 'svelte-fa';
	import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import {
		deposit,
		withdraw,
		getRewards,
		getStakedTokens,
		MasterChef,
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
	import BN from 'bignumber.js';
	import { tokenPrice } from '$lib/stores/NativeTokenPrice';
	import { getPriceOfMushPair } from '$lib/utils/lpTokenUtils';
	import { getPoolTokenPriceUSD } from '$lib/utils/coinGecko';
	import shortLargeAmount from '$lib/utils/shortLargeAmounts';
	import DepositWithdraw from '../Modals/DepositWithdraw.svelte';
	import SushiswapBadge from '../Badges/SushiswapBadge.svelte';
	import MultiplierBadge from '../Badges/MultiplierBadge.svelte';

	interface LoadingState {
		loadingApproval: boolean;
		loadingDeposit: boolean;
		loadingWithdraw: boolean;
		loadingHarvest: boolean;
	}

	export let info: PoolInfo;
	export let isFarm: boolean = false;

	let poolFeePercentage: number = null;
	let stakingTokenPrice: number;
	let stakingTokenAmount: number;
	let rewardTokenPrice: number;
	let poolLiquidityUSD: number;
	let tokenAllocatedPerBlock: number;
	let poolApr;
	let tokenDecimals;

	let loadingState: LoadingState = {
		loadingApproval: false,
		loadingDeposit: false,
		loadingWithdraw: false,
		loadingHarvest: false
	};

	let poolMultiplier: number;

	let isHidden: boolean = true;
	let tokenApproved: boolean;
	let userAcc: string;
	let tokenAllowance: BigNumber;
	let canStake: boolean;
	let canWithdraw: boolean;
	let canHarvest: boolean;
	let userStakedTokens: BigNumber;
	let userEarnings: BigNumber;
	let userBalance: BigNumber;
	let wantWithdrawAmount: any;
	let idInterval;

	const stakingTokenContract = new ethers.Contract(
		info.tokenAddr,
		ERC20ABI,
		Provider.getProviderSingleton()
	);

	tokenPrice.subscribe((tokenPrice) => {
		rewardTokenPrice = tokenPrice;
	});

	const { addNotification } = getNotificationsContext();
	const { open } = getContext('simple-modal');

	onMount(async () => {
		tokenDecimals = await stakingTokenContract.decimals();
		const totalAllocPoints = await MasterChef.getTotalAllocPoint();
		const poolInfo = await MasterChef.getPoolInfo(info.pid);
		poolFeePercentage = poolInfo.depositFeeBP * 0.01;
		poolMultiplier = getPoolMultiplier(poolInfo.allocPoint);
		stakingTokenPrice = await getStakingTokenPrice();
		const sta: BigNumber = await stakingTokenContract.balanceOf(
			getContractAddress(Token.MASTERCHEF)
		);
		stakingTokenAmount = parseFloat(ethers.utils.formatUnits(sta, tokenDecimals));
		poolLiquidityUSD = stakingTokenPrice * stakingTokenAmount;
		const poolWeightbn = getPoolWeight(totalAllocPoints, poolInfo.allocPoint);
		const tokenPerBlock = await MasterChef.getMushPerBlock();
		const mushPerBlock: number = parseFloat(ethers.utils.formatEther(tokenPerBlock));
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
			const tx = await deposit(info.pid, amount, tokenDecimals);
			await tx.wait();
			addNotification(transactionCompleted);
		} catch (error) {
			console.log('Internal Error on DepositHandler', error);
			addNotification(transactionDeniedByTheUser);
		}
		loadingState.loadingDeposit = false;
		userStakedTokens = await getStakedTokens(info.pid, userAcc);
	};

	const onWithdraw = async (amount) => {
		loadingState.loadingWithdraw = true;
		wantWithdrawAmount = amount;
		addNotification(transactionSend);
		try {
			const tx = await withdraw(info.pid, wantWithdrawAmount, tokenDecimals);
			await tx.wait();
			loadingState.loadingWithdraw = false;
			addNotification(transactionCompleted);
			userStakedTokens = await getStakedTokens(info.pid, userAcc);
		} catch (error) {
			console.log('Internal Error on WithdrawHandler', error);
			addNotification(transactionDeniedByTheUser);
		}
	};

	const onHarvest = async () => {
		loadingState.loadingHarvest = true;
		try {
			addNotification(transactionSend);
			const tx = await deposit(info.pid, '0');
			await tx.wait();
			addNotification(transactionCompleted);
			userEarnings = ethers.constants.Zero;
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			console.log('Error: ', error);
		}
		loadingState.loadingHarvest = false;
	};

	const openModal = (action: string) => {
		open(
			DepositWithdraw,
			{
				userStakedTokens,
				userBalance,
				tokenDecimals,
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
	const unsubscribe = accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
			tokenAllowance = await getTokenAllowance(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF),
				userAcc
			);
			tokenApproved = isNotZero(tokenAllowance);
			if (tokenApproved) {
				userBalance = await getTokenBalance(info.tokenAddr, userAcc);

				canStake = isNotZero(userBalance);
				userEarnings = await getRewards(info.pid, userAcc);
				canHarvest = isNotZero(userEarnings);
				userStakedTokens = await getStakedTokens(info.pid, userAcc);
			}
			if (canStake) {
				userStakedTokens = await getStakedTokens(info.pid, userAcc);

				canWithdraw = isNotZero(userStakedTokens);
			}
			idInterval = setInterval(async () => {
				await fetchRecentData();
			}, 10000);
		}
	});

	onDestroy(() => {
		clearInterval(idInterval);
	});

	const fetchRecentData = async () => {
		if (tokenApproved) {
			userEarnings = await getRewards(info.pid, userAcc);
			userBalance = await getTokenBalance(info.tokenAddr, userAcc);
			userStakedTokens = await getStakedTokens(info.pid, userAcc);
		}
	};

	const showPoolInfo = () => {
		isHidden = !isHidden
	};
	const approveHandler = async () => {
		loadingState.loadingApproval = true;

		try {
			const tx = await approveToken(info.tokenAddr, getContractAddress(Token.MASTERCHEF));
			await tx.wait();
			addNotification(transactionCompleted);
			tokenApproved = true;
			canStake = true;
			tokenAllowance = await getTokenAllowance(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF),
				userAcc
			);
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingApproval = false;
			console.log('Error on approveHandler🥶', error);
		}
		loadingState.loadingApproval = false;
	};
</script>

<div
	class="self-start min-w-84 max-w-84  bg-white dark:bg-dark-900 {!$darkMode &&
		'shadow-xl'} {$darkMode &&
		'border-2 border-green-500'} rounded-2xl relative transform transition duration-300 hover:scale-101 select-none"
>
	<div class="absolute flex flex-row-reverse p-4 w-full">
		<div>
			{#if isFarm}
			<SushiswapBadge/>
		{/if}
		<MultiplierBadge/>
		</div>
	</div>
	<div class="py-4 px-8 flex flex-col h-124">
		<img src={info.tokenImagePath} alt={info.tokenName} class="w-30 h-30 self-center my-2" />
		<div>
			<p class="font-bold dark:text-white text-lg mb-3">{info.tokenName}</p>
		</div>
		<div class="flex justify-between mb-2">
			<p class="dark:text-gray-200  text-gray-800">APR:</p>
			{#if poolApr == 'Infinity'}
				<p class="font-medium dark:text-white">∞</p>
			{:else if poolApr}
				<p class="font-medium dark:text-white">{shortLargeAmount(poolApr)}%</p>
			{:else}
				<p class="w-12 h-full bg-gray-200 dark:bg-dark-300 rounded-lg animate-pulse" />
			{/if}
		</div>

		<div class="flex justify-between mb-2">
			<p class="dark:text-gray-200  text-gray-800 capitalize">{$_('actions.earn')}:</p>
			<p class="font-medium dark:text-white">MUSH</p>
		</div>

		<div class="flex justify-between text-lg mb-6">
			<p class="dark:text-gray-200  text-gray-800 capitalize">{$_('actions.depositFee')}:</p>
			{#if poolFeePercentage != null}
				<p class="font-medium dark:text-white">{poolFeePercentage}%</p>
			{:else}
				<p class="w-12 h-full bg-gray-200 dark:bg-dark-300 rounded-lg animate-pulse" />
			{/if}
		</div>

		<div class="flex flex-col w-full mb-2">
			<p class="text-xs text-left font-medium dark:text-white uppercase">
				<span class="text-pink-400">MUSH </span>{$_('pastActions.earned')}
			</p>
			<div class="flex w-full justify-between">
				{#if userEarnings}
					<p class="text-xl flex items-center dark:text-white">
						{parseFloat(ethers.utils.formatEther(userEarnings)).toFixed(2)}
					</p>
				{:else}
					<p class="text-xl flex items-center dark:text-white">0</p>
				{/if}
				<button
					disabled={!canHarvest || loadingState.loadingHarvest}
					on:click={onHarvest}
					class="text-sm py-2 px-4 rounded-lg bg-green-500 text-white font-semibold tracking-wide disabled:bg-gray-400"
					>{$_('actions.harvest')}</button
				>
			</div>
		</div>

		<p class="text-xs text-left font-medium dark:text-white uppercase">
			<span class="text-pink-400">{info.tokenName} </span>{$_('pastActions.staked')}
		</p>
		<div class="flex h-10  w-full mb-6 mt-2">
			{#if !$accounts}
				<button
					on:click={metaMaskCon}
					class="bg-green-500 hover:bg-green-600 text-white tracking-wide font-semibold w-full h-full rounded-xl"
				>
					{$_('actions.unlock')}
				</button>
			{:else if !tokenApproved}
				<button
					on:click={approveHandler}
					class="flex justify-center items-center bg-green-500 hover:bg-green-600 text-white tracking-wide font-semibold w-full h-full rounded-xl"
				>
					{$_('actions.approve')}
					{isFarm ? 'Farm' : 'Pool'}
					{#if loadingState.loadingApproval}
						<div class="ml-1">
							<Circle color="#fff" size={16} duration="2s" />
						</div>
					{/if}
				</button>
			{:else}
				<div class="flex justify-between items-center w-full h-full">
					{#if userStakedTokens}
						<p class="flex text-xl dark:text-white">
							{parseFloat(ethers.utils.formatUnits(userStakedTokens, tokenDecimals)).toPrecision(4)}
						</p>
					{:else}
						<p class="w-12 h-full bg-gray-200 dark:bg-dark-300 rounded-lg animate-pulse" />
					{/if}

					<div class="flex space-x-2">
						<button
							on:click={() => openModal('DEPOSIT')}
							class="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-xl text-white"
							>+</button
						>
						<button
							on:click={() => openModal('WITHDRAW')}
							class="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-xl text-white"
							>-</button
						>
					</div>
				</div>
			{/if}
		</div>

		<div
			on:click={showPoolInfo}
			class="flex items-center justify-center dark:text-white cursor-pointer hover:text-green-500"
		>
			<p class="font-medium mr-2">{$_('poolCard.details')}</p>
			{#if isHidden}
				<Fa icon={faChevronDown} size="xs" translateY={0.15} />
			{:else}
				<Fa icon={faChevronUp} size="xs" translateY={0.15} />
			{/if}
		</div>
	</div>
	{#if !isHidden}
		<div
			in:slide={{ duration: 350 }}
			out:slide={{ duration: 350 }}
			class="px-8 pb-4 dark:text-white"
		>
			<div class="flex justify-between mb-1">
				<p>{$_('actions.stake')}</p>
				<p class="font-medium">{info.tokenName}</p>
			</div>
			<div class="flex justify-between mb-1">
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
				target="_blank">{$_('poolCard.viewonMatic')}</a
			>
		</div>
	{/if}
</div>
