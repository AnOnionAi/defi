<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import addresses from '$lib/config/constants/addresses.json'
	import type { LPair, VaultInfo } from '$lib/ts/types';
	import { getTokenBalance,approveToken,getTokenAllowance, isNotZero } from '$lib/utils/erc20';
	import { metaMaskCon } from '$lib/utils/helpers';
	import {getContractAddress} from '$lib/utils/addressHelpers'
	import {Token} from "$lib/ts/types"
	import { parseBigNumberToString,parseBigNumberToDecimal} from '$lib/utils/balanceParsers';
	import {getTokenPriceUSD} from '$lib/utils/coinGecko'
	import type { BigNumber } from '@ethersproject/bignumber';
	import { getUniPair } from '$lib/utils/contracts';
	import { Chasing } from 'svelte-loading-spinners'

	export let tkn0Img;
	export let tkn1Img;
	export let vaultConfig: VaultInfo;

	const getTokenFromDex = `${vaultConfig.platform.swapperURL}`
	
	let userAcc: string;
	let isHidden: boolean = true;
	let isApproved: boolean;
	let depositedTokens;
	let userTokens: BigNumber;
	let apy: string;
	let tvl: string;
	let daily: string;
	let borderStyle:string = 'rounded-lg'
	let tkn0Price: number;
	let tkn1Price: number;

	const loadingState = {
		something: false,
		approve: false,
		deposit: false,
		withdraw: false,
		harvest:false,
	}

	const unsubscribe = accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
		}
	});

	const openAccordeon = ():void => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};

	const handleTransaction = async(transaction:Promise<any>,transactionName: string) => {
		loadingState.something=true
		loadingState[transactionName] = true
		console.log(loadingState)
		try {
			const tx = await transaction;
			console.log(tx)
			await tx.wait()
			
		} catch (error) {
			console.log("Transaction rejected by the user")
		}
		loadingState.something=false
		loadingState[transactionName] = false
		console.log(loadingState)
	}


	$: if (!isHidden) {
		if (userAcc) {

			getTokenAllowance("0x8F760623f496F6e91219858166Aa68Af2561D51a","0x5cc76D4888401015138708029e4a965Bb0962b40",userAcc).then(res => {
				isApproved = isNotZero(res)
			});

			getTokenBalance(vaultConfig.pair.pairContract, userAcc).then((balance) => {
				userTokens = balance;
			});

			getTokenPriceUSD(vaultConfig.pair.token0Contract).then((response)=> {
				tkn0Price = response[vaultConfig.pair.token0Contract.toLowerCase()].usd
			})

			getTokenPriceUSD(vaultConfig.pair.token1Contract).then((response)=> {
				tkn1Price = response[vaultConfig.pair.token1Contract.toLowerCase()].usd
			})

			console.log(isApproved)
		}
	}
</script>

<div class="my-3">
	<div
		on:click={openAccordeon}
		class="border border-gray-300 hover:cursor-pointer shadow-xl {isHidden == false &&
			'shadow-none'} p-5 {isHidden && 'rounded-lg'} {!isHidden && 'rounded-t-lg'} relative hover:bg-gradient-to-t from-{vaultConfig.platform.brandColor}-500 to-{vaultConfig.platform.brandColor}-200 dark:bg-dark-600 dark:border-none"
	>
		<span class="absolute top-0">
			<img class="w-12 inline mt-2" src={tkn0Img} alt={vaultConfig.pair.token0Name}/>
		</span>
		<span class="absolute bottom-1 right-1">
			<img class="w-12 inline pt-2" src={tkn1Img}  alt={vaultConfig.pair.token1Name}/>
		</span>
		<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
			<div class="text-center">
				<p class="font-bold uppercase text-xs text-gray-600 dark:text-gray-400">
					Earn {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP
				</p>
				<h3 class="text-xl font-semibold dark:text-white tracking-tighter">
					{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
				</h3>
			</div>
			<div class="">
				<div class="flex flex-row justify-around ">
					<div class="text-center w-24">
						<div class="font-medium sm:px-3 text-sm dark:text-white">
							{#if apy}
								APY
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-medium text-gray-600 dark:text-gray-400">APY</div>
					</div>
					<div class="text-center w-24">
						<div class="font-medium sm:px-3 text-sm dark:text-white">
							{#if userTokens}
								{parseBigNumberToDecimal(userTokens)}
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-medium text-gray-600 dark:text-gray-400 ">WALLET</div>
					</div>
				</div>
				<div class="flex flex-row justify-around">
					<div class="text-center w-24">
						<div class="font-medium sm:px-3 dark:text-white">
							{#if tvl}
								TVL
							{:else}
								0
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-medium text-gray-600 dark:text-gray-400">TVL</div>
					</div>
					<div class="text-center w-24">
						<div class="font-medium sm:px-3 dark:text-white">
							{#if daily}
								DAILY
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-medium text-gray-600 dark:text-gray-400">DAILY</div>
					</div>
				</div>
			</div>
		</div>
		<p
			class="absolute font-semibold top-0 right-0 p-3 bg-{vaultConfig.platform
				.brandColor}-500  rounded-tr-xl rounded-bl-xl text-white tracking-wide"
		>
			{vaultConfig.platform.name}
		</p>
	</div>
	{#if !isHidden}
		<div class="bg-gray-100 dark:bg-dark-300 rounded-b-lg px-8 py-5">
			{#if !$accounts}
				<button
					on:click={metaMaskCon}
					class="w-full bg-{vaultConfig.platform
						.brandColor}-500  rounded-xl p-2 text-white font-semibold text-xl tracking-wide "
					>Unlock
				</button>
			{:else}
				<div class="flex flex-col  lg:flex-row flex-wrapper justify-around">
					<div class="lg:w-1/3">
						<div class="flex">
							<p class="text-gray-600 font-medium dark:text-white">In Your Wallet:</p>
							{#if userTokens}
								<p class="font-bold	px-2 dark:text-white font-semibold tracking-tighter">
									{parseBigNumberToString(userTokens)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{:else}
								<p class="font-bold	px-2 dark:text-white font-semibold">
									N/A {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{/if}
						</div>
						<div class="flex my-2 py-2 px-3 bg-gray-300 dark:bg-dark-500 rounded-lg max-w-sm lg:w-11/12">
							<input
								placeholder="Enter Value"
								class="bg-gray-300  text-gray-900 font-bold w-8/12 dark:bg-dark-500	dark:text-white"
								type="number"
							/>
							{#if isApproved}
							<button
							class:cursor-not-allowed={loadingState.something}
							disabled={loadingState.deposit}
							on:click={async()=> handleTransaction(approveToken("0x8F760623f496F6e91219858166Aa68Af2561D51a","0x5cc76D4888401015138708029e4a965Bb0962b40"),"deposit")}
							class="flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-pink-500 bg-black hover:bg-pink-500 text-white font-bold rounded-lg px-4 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig.platform
								.brandColor}-500 to-dark-100"
								>
								<p class="pr-2">Deposit</p> 
								{#if loadingState.deposit}
								<Chasing size="20" unit="px" color="#ffff" />
								{/if}
							</button>
							{:else}
							<button
							class:cursor-not-allowed={loadingState.approve}
							disabled={loadingState.approve}
							on:click={async()=> handleTransaction(approveToken("0x8F760623f496F6e91219858166Aa68Af2561D51a","0x5cc76D4888401015138708029e4a965Bb0962b40"),"approve")}
							class="flex items-center bg-black hover:bg-pink-500 text-white font-bold rounded-lg px-4 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig.platform
								.brandColor}-500 to-dark-100"
								>
								<p class="pr-2">Approve</p> 
								{#if loadingState.approve}
								<Chasing size="20" unit="px" color="#ffff" />
								{/if}
							</button>
							{/if}
							
						</div>
						<div class="flex">
							<p class="text-gray-500 font-bold dark:text-white font-medium">Deposit Fee:</p>
							<p class="px-1  font-bold dark:text-white font-medium">{vaultConfig.depositFee}%</p>
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-1/3">
						<div class="flex">
							<p class="text-gray-600 font-medium dark:text-white font-medium">Deposited:</p>
							{#if depositedTokens}
								<p class="font-bold	px-2 dark:text-white font-medium">
									{depositedTokens}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{:else}
								<p class="font-bold	px-2 dark:text-white font-medium">
									0 {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{/if}
						</div>
						<div class="flex my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm dark:bg-dark-500 lg:w-11/12">
							<input
								placeholder="Enter Value"
								class="bg-gray-300 text-gray-900 font-bold w-8/12 dark:bg-dark-500 dark:text-white"
								type="number"
							/>
							<button
							disabled={loadingState.something}
								on:click={async()=> handleTransaction(approveToken("0x8F760623f496F6e91219858166Aa68Af2561D51a","0x5cc76D4888401015138708029e4a965Bb0962b40"),"withdraw")}
								class="flex items-center disabled:cursor-not-allowed {loadingState.withdraw && 'bg-pink-500'} bg-black hover:bg-{vaultConfig.platform.brandColor}-500 text-white font-bold rounded-lg px-4 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig.platform
									.brandColor}-500 to-dark-100"
								>
								<p class="pr-2">Withdraw</p>
								{#if loadingState.withdraw}
								<Chasing size="20" unit="px" color="#ffff"/>
								{/if}
								
								</button
							>
						</div>
						<div class="flex">
							<p class="mr-1 font-medium text-gray-500">Withdrawal Fee:</p>
							<p class="font-medium">0%</p>
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-1/3">
						<p class="font-medium text-gray-500">Your {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} Earnings</p>
						<div class="flex items-center my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm dark:bg-dark-500 lg:w-10/12">
							<p
								class=" bg-gray-300  font-bold w-8/12 text-lg dark:bg-dark-500 dark:text-white"
							>
							0.00000
							</p>
							
							<button
							on:click={async()=> handleTransaction(approveToken("0x8F760623f496F6e91219858166Aa68Af2561D51a","0x5cc76D4888401015138708029e4a965Bb0962b40"),"harvest")}
								disabled = {loadingState.something}
								class="flex items-center bg-black hover:bg-{vaultConfig.platform.brandColor}-500 text-white font-bold rounded-lg px-6 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig.platform
									.brandColor}-500 to-dark-100 disabled:cursor-not-allowed {loadingState.harvest && 'bg-pink-500'}"
								>
								<p class="pr-2">Harvest</p>
								{#if loadingState.harvest}
								<Chasing size="20" unit="px" color="#ffff"/>
								{/if}
								</button
							>
						</div>
						<div class="pl-1">
							<p class="text-gray-600 font-semibold pb-1 dark:text-gray-400 font-semibold">Current Prices:</p>
							<p class="text-gray-800	font-medium dark:text-white ">{#if tkn0Price}
								{vaultConfig.pair.token0quote}	${tkn0Price}
								{:else}
								{vaultConfig.pair.token0quote} N/A
							{/if}</p>
							<p class="text-gray-800 font-medium dark:text-white">{#if tkn1Price}
								{vaultConfig.pair.token1quote}	${tkn1Price}
								{:else}
								{vaultConfig.pair.token1quote} N/A
							{/if}</p>
							<div class="py-2">
								<a class="block text-gray-600 font-semibold hover:text-green-500 dark:text-gray-400" href={getTokenFromDex}
									>GET {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}</a
								>
								<a class="block text-gray-600 font-semibold hover:text-green-500 dark:text-gray-400" href="https://polygonscan.com/"
									>View Info</a
								>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.usdc_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #3b75c9 100%);
	}

	.mush-green {
		background-color: #4da085;
	}

	input {
		font-size: 18px;
		font-weight: bold;
		outline: none;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}


	.secondary-font{
		color:rgb(151, 157, 198)
	}
</style>
