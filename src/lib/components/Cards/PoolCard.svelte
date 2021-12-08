<script lang="ts">
	import { Provider } from '$lib/utils/web3Helpers';
	import ERC20ABI from "$lib/config/abi/ERC20.json"
	import { fly } from 'svelte/transition';
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
	import { deposit, withdraw, getRewards, getStakedTokens, MasterChef, getPoolMultiplier, getPoolWeight } from '$lib/utils/masterc';
	import {
		parseBigNumberToDecimal,
		parseBigNumberToString
	} from '$lib/utils/balanceParsers';
	import DepositModal from '$lib/components/Modals/DepositModal.svelte';
	import WithdrawModal from '$lib/components/Modals/WithdrawModal.svelte';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { darkMode } from '$lib/stores/dark';
	import { Circle } from 'svelte-loading-spinners';
	import {
		transactionCompleted,
		transactionDeniedByTheUser,
		transactionSend
	} from '$lib/config/constants/notifications';
	import { getNotificationsContext } from 'svelte-notifications';
	import { ethersToBigNumber } from '$lib/utils/bigNumber';
	import { getPoolApr } from '$lib/utils/yieldCalculator';
	import BN from "bignumber.js"
	import {fetchNativeTokenPrice, tokenPrice} from "$lib/stores/NativeTokenPrice"
	import { getERC20Contract } from '$lib/utils/contracts';
import { getPriceOfMushPair } from '$lib/utils/lpTokenUtils';
import { getTokenPriceUSD } from '$lib/utils/coinGecko';
import shortLargeAmount from '$lib/utils/shortLargeAmounts';

	interface LoadingState {
		loadingApproval: boolean;
		loadingDeposit: boolean;
		loadingWithdraw: boolean;
		loadingHarvest: boolean;
	}
	export let info: PoolInfo;
	export let isFarm:boolean = false;

	let poolFeePercentage:number = null;
	let stakingTokenPrice: number;
	let stakingTokenAmount: number
	let rewardTokenPrice: number;
	let poolLiquidityUSD: number;
	let tokenAllocatedPerBlock:number;
	let poolApr;

	let loadingState: LoadingState = {
		loadingApproval: false,
		loadingDeposit: false,
		loadingWithdraw: false,
		loadingHarvest: false
	};
	
	let poolMultiplier:number;
	

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

	const stakingTokenContract = new ethers.Contract(info.tokenAddr,ERC20ABI,Provider.getProviderSingleton());
	tokenPrice.subscribe(tokenPrice=>{
		rewardTokenPrice = tokenPrice
	})

	const { addNotification } = getNotificationsContext();
	const { open } = getContext('simple-modal');

	onMount(async()=>{
		const totalAllocPoints = await MasterChef.getTotalAllocPoint()
		const poolInfo = await  MasterChef.getPoolInfo(info.pid);
		console.log(poolInfo.depositFeeBP)
		poolFeePercentage = poolInfo.depositFeeBP * 0.0001
		poolMultiplier = getPoolMultiplier(poolInfo.allocPoint);
		stakingTokenPrice = await getStakingTokenPrice();
		const sta:BigNumber = await stakingTokenContract.balanceOf(getContractAddress(Token.MASTERCHEF))
		stakingTokenAmount = parseFloat(ethers.utils.formatEther(sta))
		poolLiquidityUSD = stakingTokenPrice * stakingTokenAmount;
		const poolWeightbn = getPoolWeight(totalAllocPoints,poolInfo.allocPoint)
		const tokenPerBlock = await  MasterChef.getMushPerBlock()
		const mushPerBlock: number = parseFloat(ethers.utils.formatEther(tokenPerBlock))
		tokenAllocatedPerBlock = mushPerBlock * poolWeightbn.toNumber()
		
		poolApr = getPoolApr(stakingTokenPrice,rewardTokenPrice,stakingTokenAmount,tokenAllocatedPerBlock);
		
	})
	
	const getStakingTokenPrice = async() => {
		if (isFarm){
			stakingTokenPrice = await getPriceOfMushPair(info.tokenAddr)
			return stakingTokenPrice;
		}
		else{
			const response = getTokenPriceUSD(info.tokenAddr)
			stakingTokenPrice = response[info.tokenAddr];
			return stakingTokenPrice;
		}
	}
	
	
	const onOkay = async (amount) => {
		loadingState.loadingDeposit = true;
		addNotification(transactionSend);
		try {
			const tx = await deposit(info.pid, amount);
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
			const tx = await withdraw(info.pid, wantWithdrawAmount);
			await tx.wait();
			loadingState.loadingWithdraw = false;
			addNotification(transactionCompleted);
			userStakedTokens = await getStakedTokens(info.pid, userAcc);
		} catch (error) {
			console.log('Internal Error on WithdrawHandler', error);
			addNotification(transactionDeniedByTheUser);
		}
	};

	const onHarvest = async() => {
		loadingState.loadingHarvest=true;
		try{
			const tx = await deposit(info.pid,"0");
			addNotification(transactionSend);
			await tx.wait();
			addNotification(transactionCompleted);
			userEarnings = ethers.constants.Zero;
		}catch(error){
			addNotification(transactionDeniedByTheUser);
			console.log("Error: ",error)
		}
		loadingState.loadingHarvest=false;
	}




	const goDeposit = () => {
		open(
			DepositModal,
			{
				userBalance,
				info,
				onOkay
			},
			{
				closeButton: false,
				closeOnEsc: true,
				closeOnOuterClick: true
			}
		);
	};
	const goWithdraw = () => {
		open(
			WithdrawModal,
			{
				userStakedTokens,
				info,
				onWithdraw
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
			console.log(tokenAllowance);

			tokenApproved = isNotZero(tokenAllowance);
			if (tokenApproved) {
				userBalance = await getTokenBalance(info.tokenAddr, userAcc);

				canStake = isNotZero(userBalance);
				userEarnings = await getRewards(info.pid, userAcc);
				canHarvest = isNotZero(userEarnings);
				userStakedTokens = await getStakedTokens(info.pid, userAcc);
				console.log(userStakedTokens,"HEY HEY")
			}
			if (canStake) {
				userStakedTokens = await getStakedTokens(info.pid, userAcc);
				console.log(userStakedTokens,"HEY HEY")
				canWithdraw = isNotZero(userStakedTokens);
			}
			idInterval = setInterval(async () => {
				/* await fetchRewards(); */
			}, 10000);
		}
	});

	onDestroy(() => {
		unsubscribe;
		clearInterval(idInterval);
	});

	const fetchRewards = async () => {
		if (tokenApproved) {
			userEarnings = await getRewards(info.pid, userAcc);
		}
	};

	const showPoolInfo = () => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};
	const approveHandler = async () => {
		loadingState.loadingApproval=true;
		
		try {
			const tx = await approveToken(info.tokenAddr, getContractAddress(Token.MASTERCHEF));
			
			await tx.wait();
			addNotification(transactionCompleted)
			tokenApproved = true;
			canStake = true;
			tokenAllowance = await getTokenAllowance(
				info.tokenAddr,
				getContractAddress(Token.MASTERCHEF),
				userAcc
			);
		} catch (error) {
			addNotification(transactionDeniedByTheUser)
			loadingState.loadingApproval=false;
			console.log('Error on approveHandler🥶', error);
		}
		loadingState.loadingApproval=false;
	};
</script>

<div
	in:fly={{ y: 250, duration: 400 }}
	class=" flex flex-col  self-start px-5 py-3 bg-white shadow-lg dark:bg-dark-900 rounded-2xl space-y-2 dark:border-2  dark:border-green-500 min-w-96 max-w-96 relative"
>
	{#if isFarm}
		<div class="flex flex-row-reverse w-22/24 mt-1  absolute">
			<div class="flex items-center border-2 border-pink-400 rounded-full text-pink-400 px-2 text-xs">
				<img src="/sushi.png" alt="Sushiswap logo" class="w-3 h-3 mr-1">
				<p>SushiSwap</p>
			</div>
		</div>
	{/if}
	<div class=" flex justify-center items-center  ">
		<img class="w-32 h-32 max-h-32" src={info.tokenImagePath} alt={info.tokenName + 'Token Icon'} />
	</div>
	<div class="p-2 space-y-3 ">
		<p class="text-lg font-bold dark:text-white">{info.tokenName}</p>
		<div class="">
			
			<div class="flex justify-between">
				<p class="dark:text-white">APR:</p>
				{#if poolApr}
				<p class="dark:text-white">{shortLargeAmount(poolApr)}%</p>
					{:else}
					<p class="w-16 h-5 bg-gray-200 dark:bg-dark-400  animate-pulse rounded-md "></p>
				{/if}
			</div>
			<div class="flex justify-between">
				<p class="dark:text-white">Multiplier:</p>
				{#if poolMultiplier}
				<p class="dark:text-white">{poolMultiplier}x</p>
				{:else}
				<p class="w-10 h-5 bg-gray-200 dark:bg-dark-400  animate-pulse rounded-md "></p>
				{/if}
				
			</div>
			<div class="flex justify-between">
				<p class="dark:text-white capitalize">{$_('actions.earn')}:</p>
				<p class="dark:text-white">MUSH</p>
			</div>
			<div class="flex justify-between items-center">
				<p class="dark:text-white text-lg capitalize">{$_('actions.depositfee')}:</p>
				{#if poolFeePercentage != null}
				<p class="dark:text-white">{poolFeePercentage}%</p>
				{:else}
				<p class="w-10 h-5 bg-gray-200 dark:bg-dark-400  animate-pulse rounded-md "></p>
				{/if}
			</div>
			<div class="flex pt-5">
				<p class="text-xs font-medium dark:text-white uppercase">
					MUSH {$_('pastActions.earned')}:
				</p>
			</div>
			<div class="flex pt-1 justify-between">
				<p class="h-5 flex self-center	 font-medium dark:text-white">
					{#if userEarnings}
						{parseBigNumberToDecimal(userEarnings)}
					{:else}
						<p class="dark:text-white">0</p>
					{/if}
				</p>
				<button
					on:click={async () => onHarvest()}
					class="flex items-center text-white bg-green-400  font-semibold  py-2 px-4 rounded-md  {!canHarvest &&
						'invisible'}"
				>
					<span class="mr-1">{$_('actions.harvest')}</span>
					{#if loadingState.loadingHarvest}
					<Circle size="16" color="#fff" duration="2s" />
					{/if}
				</button>
			</div>
		</div>
		<div class="flex">
			<p class="text-xs font-medium dark:text-white uppercase">
				{info.tokenName}
				{$_('pastActions.staked')}
			</p>
		</div>
		<div class="flex w-full justify-between items-center">
			<p class="tabular-nums  font-medium dark:text-white text-left">
				{#if userStakedTokens}
					{parseBigNumberToString(userStakedTokens)}					
				{/if}
			</p>
			<div class="flex justify-around space-x-3">
				<button
					on:click={goDeposit}
					class="text-white flex items-center py-2 px-5 font-medium justify-center hover:bg-green-500 bg-green-400 rounded-md"
				>
					+
					{#if loadingState.loadingDeposit}
						<div class="ml-1">
							<Circle size="16" color="#fff" duration="2s" />
						</div>
					{/if}
				</button>
				<button
					on:click={goWithdraw}
					class="text-white flex items-center py-2 px-5 font-medium justify-center hover:bg-green-500 bg-green-400 rounded-md"
				>
					-
					{#if loadingState.loadingWithdraw}
						<div class="ml-1">
							<Circle size="16" color="#fff" duration="2s" />
						</div>
					{/if}
				</button>
			</div>
		</div>
		<div class="">
			{#if tokenApproved && $accounts}
				<div class="">
					
				</div>
			{:else if $accounts}
				<p
					on:click={async () => await approveHandler()}
					class="flex items-center justify-center bg-green-400 text-white font-bold p-2 rounded-md w-9/10 hover:bg-green-500 mx-auto cursor-pointer transform transition duration-300 hover:scale-105"
				>
					<span class="mr-1">{$_('actions.approve')}</span>
					{#if loadingState.loadingApproval}
					<Circle size="16" color="#fff" duration="2s" />
					{/if}
				</p>
			{:else if !$accounts}
				<p
					on:click={metaMaskCon}
					href="#"
					class="block bg-green-400 text-white font-bold py-3 rounded-md w-10/10 hover:bg-green-500 mx-auto cursor-pointer transform transition duration-300 hover:scale-105"
				>
					{$_('actions.unlock')}
				</p>
			{/if}
		</div>

		<div class="flex justify-center  py-3 hover:animate-bounce" on:click={showPoolInfo}>
			{#if isHidden}
				<div class="flex cursor-pointer">
					<p class="dark:text-white font-semibold">{$_('poolCard.details')}</p>
					{#if $darkMode}
						<Fa
							icon={faChevronDown}
							size="xs"
							scale={0.9}
							translateX={0.5}
							translateY={0.65}
							color={'#fff'}
						/>
					{:else}
						<Fa
							icon={faChevronDown}
							size="xs"
							scale={0.9}
							translateX={0.5}
							translateY={0.65}
							color={'#000'}
						/>
					{/if}
				</div>
			{:else}
				<div class="flex cursor-pointer ">
					<p class="dark:text-white font-semibold">{$_('poolCard.hide')}</p>
					{#if $darkMode}
						<Fa
							icon={faChevronUp}
							size="xs"
							scale={0.9}
							translateX={0.5}
							translateY={0.65}
							color={'#fff'}
						/>
					{:else}
						<Fa
							icon={faChevronUp}
							size="xs"
							scale={0.9}
							translateX={0.5}
							translateY={0.65}
							color={'#000'}
						/>
					{/if}
				</div>
			{/if}
		</div>

		<div class="px-5	 {isHidden && 'hidden'}">
			<div class="flex justify-between">
				<p class="dark:text-white">{$_('actions.stake')}:</p>
				<p class="dark:text-white">{info.tokenName}</p>
			</div>
			<div class="flex justify-between">
				<p class="dark:text-white">{$_('poolCard.totalLiquidity')}:</p>
				<p class="dark:text-white">
					{#if poolLiquidityUSD}
						${poolLiquidityUSD.toPrecision(4)}
					{:else}
						<p class="dark:text-white">0</p>
					{/if}
				</p>
			</div>
			
			<div class="flex">
				<a
				 target="_blank" href={`https://polygonscan.com/address/${info.tokenAddr}`} 
				class="dark:text-white font-medium hover:text-green-400">{$_('poolCard.viewonMatic')}</a>
			</div>
		</div>
	</div>
</div>

<style>
	@media only screen and (max-width: 700px) {
		p,
		div {
			font-size: 0.8rem;
		}
	}
</style>
