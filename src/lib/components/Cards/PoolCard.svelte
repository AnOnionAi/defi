<script lang="ts">
	import { Provider } from '$lib/utils/web3Helpers';
	import ERC20ABI from '$lib/config/abi/ERC20.json';
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { LoadingState, PoolInfo, PoolInfoResponse } from '$lib/ts/types';
	import { Token } from '$lib/ts/types';
	import { metaMaskCon } from '$lib/utils/helpers';
	import { approveToken, getTokenAllowance, isNotZero, getTokenBalance,  getTokenName, getTokenDecimals } from '$lib/utils/erc20';
	import { onDestroy, onMount } from 'svelte';
	import { getContext } from 'svelte';
	import { BigNumber, ethers } from 'ethers';
	import Fa from 'svelte-fa';
	import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import {
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
	import { totalAllocPoints } from '$lib/stores/MasterChefData';



	const { addNotification } = getNotificationsContext();
	const { open } = getContext('simple-modal');


	export let info: PoolInfo;
	export let isFarm: boolean = false;

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

	let isHidden: boolean = true;
	
	let userAcc: string;
	let tokenApproved: boolean;
	let canStake: boolean;
	let canWithdraw: boolean;
	let canHarvest: boolean;
	
	
	let wantWithdrawAmount: any;
	let idInterval;


	let tokenAllowance: BigNumber = ethers.constants.Zero;
	let userBalance: BigNumber  = ethers.constants.Zero;
	let userEarnings: BigNumber = ethers.constants.Zero;
	let userStakedTokens: BigNumber = ethers.constants.Zero;

	$:rewardTokenPrice  = $tokenPrice;
	$:userAcc = $accounts?.[0];

	$:tokenApproved = !tokenAllowance.isZero()
	$:canStake = !tokenAllowance.isZero() &&  !userBalance.isZero();
	$:canWithdraw = !userStakedTokens.isZero();
	$:canHarvest = !userEarnings.isZero();

	$: if(userAcc){
		refreshData();
		idInterval = setInterval(refreshData,8000);
	}else{
		clearInterval(idInterval);
	}

	$:{
		/* console.log({
				tokenAllowance,
				userBalance,
				userStakedTokens,
				userEarnings
			}) */
	}

	const refreshData = async () =>{ 
		console.log("data refresh account:",$accounts,userAcc)
		try{
			tokenAllowance = await getTokenAllowance(info.tokenAddr,getContractAddress(Token.MASTERCHEF),userAcc);
			if(tokenAllowance.isZero()) return;
			userBalance = await getTokenBalance(info.tokenAddr,userAcc);
			if(userBalance.isZero()) return;
			userStakedTokens = await MasterChef.getStakedTokens(info.pid,userAcc)
			if(userStakedTokens.isZero()) return;
			userEarnings = await MasterChef.getPendingMush(info.pid)	
		}catch(e){
		}
		
	}

	onMount(async () => {
		stakingTokenDecimals = await getTokenDecimals(info.tokenAddr);
		const poolInfo:PoolInfoResponse = await MasterChef.getPoolInfo(info.pid);
		poolFeePercentage = poolInfo.depositFeeBP * 0.01;

		poolMultiplier = getPoolMultiplier(poolInfo.allocPoint);
		stakingTokenPrice = await getStakingTokenPrice();

		const sta: BigNumber = await getTokenBalance(info.tokenAddr,getContractAddress(Token.MASTERCHEF));
		stakingTokenAmount = parseFloat(ethers.utils.formatUnits(sta, stakingTokenDecimals));
		poolLiquidityUSD = stakingTokenPrice * stakingTokenAmount;
		
		const poolWeightbn = getPoolWeight($totalAllocPoints, poolInfo.allocPoint);
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
			const tx = await MasterChef.deposit(info.pid, amount,stakingTokenDecimals);
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
			const tx = await MasterChef.withdraw(info.pid, wantWithdrawAmount, stakingTokenDecimals);
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
			const tx = await MasterChef.deposit(info.pid, '0');
			await tx.wait();
			addNotification(transactionCompleted);
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			console.log('Error: ', error);
		}
		loadingState.loadingHarvest = false;
	};

	const onApprove = async() =>{
		loadingState.loadingApproval=true;
		try{
			addNotification(transactionSend);
			const tx = await approveToken(info.tokenAddr,getContractAddress(Token.MASTERCHEF));
			await tx.wait();
			addNotification(transactionCompleted);
		}
		catch{
			addNotification(transactionDeniedByTheUser);
			console.log("Oops")
		}
		loadingState.loadingApproval = false;
	}

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
	

	const showPoolInfo = () => {
		isHidden = !isHidden
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
		<MultiplierBadge multiplier={poolMultiplier}/>
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
					class="text-sm py-2 px-4 rounded-lg bg-green-500 text-white font-semibold tracking-wide disabled:bg-gray-400 disabled:cursor-not-allowed"
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
					on:click={onApprove}
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
							{parseFloat(ethers.utils.formatUnits(userStakedTokens, stakingTokenDecimals)).toPrecision(4)}
						</p>
					{:else}
						<p class="w-12 h-full bg-gray-200 dark:bg-dark-300 rounded-lg animate-pulse" />
					{/if}

					<div class="flex space-x-2">
						<button
							disabled={!canStake || loadingState.loadingDeposit}
							on:click={() => openModal('DEPOSIT')}
							class="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-xl text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
							>+</button
						>
						<button
							disabled={!canWithdraw || loadingState.loadingWithdraw}
							on:click={() => openModal('WITHDRAW')}
							class="bg-green-500 hover:bg-green-600 py-2 px-3 rounded-lg text-xl text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
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
