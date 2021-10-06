<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { LPair, VaultInfo } from '$lib/ts/types';
	import { getTokenBalance, approveToken, getTokenAllowance, isNotZero } from '$lib/utils/erc20';
	import { metaMaskCon } from '$lib/utils/helpers';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { Token } from '$lib/ts/types';
	import { parseBigNumberToString, parseBigNumberToDecimal } from '$lib/utils/balanceParsers';
	import { getTokenPriceUSD } from '$lib/utils/coinGecko';
	import type { BigNumber } from '@ethersproject/bignumber';
	import { getUniPair } from '$lib/utils/contracts';
	import { deposit, withdraw, stakedWantTokens } from '$lib/utils/vaultChef';
	import {Chasing} from "svelte-loading-spinners"
	import { providers } from 'ethers';
	import {transactionCompleted,transactionDeniedByTheUser,transactionSend} from '$lib/config/constants/notifications'

	import {getNotificationsContext} from "svelte-notifications"
	const { addNotification } = getNotificationsContext();


	export let tkn0Img;
	export let tkn1Img;
	export let vaultConfig: VaultInfo;

	const getTokenFromDex = `${vaultConfig.platform.swapperURL}`;

	let userAcc: string;
	let isHidden: boolean = true;
	let isApproved: boolean;
	let stakedTokens;
	let userTokens: BigNumber;
	let apy: string;
	let tvl: string;
	let daily: string;
	let borderStyle: string = 'rounded-lg';
	let tkn0Price: number;
	let tkn1Price: number;

	let userApproveAmount;
	let userDepositAmount;
	let userWithdrawAmount;

	const loadingState = {
		something: false,
		approve: false,
		deposit: false,
		withdraw: false,
		harvest: false
	};

	const unsubscribe = accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
		}
	});

	const openAccordeon = (): void => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};

	const handleTransaction = async (transaction: Promise<any>, transactionName: string) => {
		loadingState.something = true;
		loadingState[transactionName] = true;
		addNotification(transactionSend)
		try {
			const tx = await transaction;
			console.log(tx);
			await tx.wait();
			addNotification(transactionCompleted)
		} catch (error) {
			console.log(error);
			addNotification(transactionDeniedByTheUser)
		}
		loadingState.something = false;
		loadingState[transactionName] = false;
	};

	$: if (!isHidden) {
		if (userAcc) {
			console.log(userDepositAmount);
			getTokenAllowance(
				vaultConfig.pair.pairContract,
				getContractAddress(Token.VAULTCHEF),
				userAcc
			).then((res) => {
				isApproved = isNotZero(res);
			});

			getTokenBalance(vaultConfig.pair.pairContract, userAcc).then((balance) => {
				userTokens = balance;
			});

			stakedWantTokens(vaultConfig.pid, userAcc).then((stakedAmount) => {
				stakedTokens = stakedAmount;
			});

			getTokenPriceUSD(vaultConfig.pair.token0Contract).then((response) => {
				tkn0Price = response[vaultConfig.pair.token0Contract.toLowerCase()].usd;
			});

			getTokenPriceUSD(vaultConfig.pair.token1Contract).then((response) => {
				tkn1Price = response[vaultConfig.pair.token1Contract.toLowerCase()].usd;
			});
		}
	}
</script>

<div class="">
	<div
		on:click={openAccordeon}
		class="max-w-7xl mx-auto border border-gray-300 hover:cursor-pointer shadow-xl {isHidden == false &&
			'shadow-none'} p-5 {isHidden && 'rounded-lg'} {!isHidden &&
			'rounded-t-lg'}  hover:bg-gradient-to-t from-{vaultConfig.platform
			.brandColor}-500 to-{vaultConfig.platform.brandColor}-200 dark:bg-dark-600 dark:border-none"
	>
		
		<div class="sm:flex sm:justify-between sm:items-center sm:mx-20">
			<div class="flex justify-center items-center">
				<div class="flex relative h-12 w-14">
					<img src={tkn0Img} alt="Token 1" class="h-8 w-8">
					<img src={tkn1Img} alt="Token 2" class="h-8 w-8 absolute bottom-0 right-1">
				</div>
				<div class="ml-2">
					<p class="font-bold uppercase smaller-font text-gray-600 dark:text-gray-400">
						Earn {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP
					</p>
					<h3 class="text-lg font-semibold dark:text-white ">
						{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
					</h3>
					<div class="flex justify-center font-medium items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>
				</div>
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
		
	</div>
	{#if !isHidden}
		<div class="bg-gray-100 max-w-7xl mx-auto dark:bg-dark-300 rounded-b-lg px-5 py-5">
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
						<div class="flex items-center">
							<p class="text-gray-600 font-medium dark:text-white tracking-tight">Wallet:</p>
							{#if userTokens}
								<p class="font-bold	pl-1 dark:text-white font-semibold tracking-tighter">
									{parseBigNumberToString(userTokens)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{:else}
								<p class="font-bold	pl-1 dark:text-white font-semibold text-sm">
									0.000000000000000000 WMATIC-USDC
									<!-- N/A {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name} -->
								</p>
							{/if}
						</div>
						<div
							class="flex my-2 py-2 px-3 bg-gray-300 dark:bg-dark-500 rounded-lg  lg:w-11/12 justify-between"
						>
							<input
								bind:value={userDepositAmount}
								placeholder="Enter Value"
								class="bg-gray-300  text-gray-900 font-bold w-8/12 dark:bg-dark-500	dark:text-white"
								type="text"
							/>
							{#if isApproved}
								<button
									class:cursor-not-allowed={loadingState.something}
									disabled={loadingState.something}
									on:click={async () =>
										handleTransaction(deposit(vaultConfig.pid, '0.00000000001'), 'deposit')}
									class="flex items-center  disabled:cursor-not-allowed  {loadingState.deposit &&
										'bg-pink-500'} bg-black hover:bg-pink-500 text-white font-bold rounded-lg px-5 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig
										.platform.brandColor}-500 to-dark-100"
								>
									<p>Deposit</p>
									{#if loadingState.deposit}
										<div class="pl-2">
											<Chasing size="20" unit="px" color="#ffff" />
										</div>
									{/if}
								</button>
							{:else}
								<button
									class:cursor-not-allowed={loadingState.approve}
									disabled={loadingState.approve}
									on:click={async () =>
										handleTransaction(
											approveToken(
												vaultConfig.pair.pairContract,
												getContractAddress(Token.VAULTCHEF)
											),
											'approve'
										)}
									class="flex items-center bg-black hover:bg-pink-500 disabled:bg-pink-500 {loadingState.something &&
										'cursor-not-allowed'} text-white font-bold rounded-lg px-5 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig
										.platform.brandColor}-500 to-dark-100"
								>
									<p>Approve</p>
									{#if loadingState.approve}
										<div class="pl-2">
											<Chasing size="20" unit="px" color="#ffff" />
										</div>
									{/if}
								</button>
							{/if}
						</div>
						<div class="flex">
							<p class="pl-1 text-gray-500 font-bold dark:text-white font-medium">Deposit Fee:</p>
							<p class="px-1  font-bold dark:text-white font-medium">{vaultConfig.depositFee}%</p>
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-1/3">
						<div class="flex">
							<p class="text-gray-600 font-medium dark:text-white font-medium">Deposited:</p>
							{#if stakedTokens}
								<p class="font-bold	pl-1 dark:text-white font-medium tracking-tight">
									{parseBigNumberToString(stakedTokens)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{:else}
								<p class="font-bold	pl-1 dark:text-white font-medium">
									0 {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{/if}
						</div>
						<div
							class="flex justify-between my-2 py-2 px-3 bg-gray-300 rounded-lg  dark:bg-dark-500 lg:w-11/12 "
						>
							<input
								bind:value={userWithdrawAmount}
								placeholder="Enter Value"
								class="bg-gray-300 text-gray-900 font-bold w-8/12 dark:bg-dark-500 dark:text-white"
								type="text"
							/>
							<button
								disabled={loadingState.something}
								on:click={async () =>
									handleTransaction(
										withdraw(vaultConfig.pid,userWithdrawAmount.toString()),
										'withdraw'
									)}
								class="flex items-center disabled:cursor-not-allowed {loadingState.withdraw &&
									'bg-pink-500'} bg-black hover:bg-pink-500 text-white font-bold rounded-lg px-4 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig
									.platform.brandColor}-500 to-dark-100"
							>
								<p>Withdraw</p>
								{#if loadingState.withdraw}
									<div class="pl-2">
										<Chasing size="20" unit="px" color="#ffff" />
									</div>
								{/if}
							</button>
						</div>
						<div class="flex">
							<p class="mr-1 font-medium text-gray-500">Withdrawal Fee:</p>
							{#if vaultConfig.withdrawalFee}
								<p class="font-medium">{vaultConfig.withdrawalFee}%</p>
							{:else}
								<p class="font-medium">Not Avaliable</p>
							{/if}
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-1/3">
						<p class="font-medium text-gray-500">
							Your {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} Earnings
						</p>
						<div
							class="flex justify-between items-center my-2 py-2 px-3 bg-gray-300 rounded-lg  dark:bg-dark-500 lg:w-10/12"
						>
							<p class=" bg-gray-300  font-bold w-8/12 text-lg dark:bg-dark-500 dark:text-white">
								0.00000
							</p>

							<button
								on:click={async () =>
									handleTransaction(
										approveToken(
											'0x8F760623f496F6e91219858166Aa68Af2561D51a',
											'0x5cc76D4888401015138708029e4a965Bb0962b40'
										),
										'harvest'
									)}
								disabled={loadingState.something}
								class="flex items-center bg-black hover:bg-pink-500 text-white font-bold rounded-lg px-6 py-3 tracking-wide dark:bg-gradient-to-b from-{vaultConfig
									.platform
									.brandColor}-500 to-dark-100 disabled:cursor-not-allowed {loadingState.harvest &&
									'bg-pink-500'}"
							>
								<p>Harvest</p>
								{#if loadingState.harvest}
									<div class="pl-2">
										<Chasing size="20" unit="px" color="#ffff" />
									</div>
								{/if}
							</button>
						</div>
						<div class="pl-1">
							<p class="text-gray-500 font-bold pb-1 dark:text-gray-400 font-semibold">
								Current Prices:
							</p>
							<p class="	 dark:text-white ">
								{#if tkn0Price}
									{vaultConfig.pair.token0quote}: ${tkn0Price}
								{:else}
									{vaultConfig.pair.token0quote}: N/A
								{/if}
							</p>
							<p class=" dark:text-white">
								{#if tkn1Price}
									{vaultConfig.pair.token1quote}: ${tkn1Price}
								{:else}
									{vaultConfig.pair.token1quote}: N/A
								{/if}
							</p>
							<div class="py-2">
								<a
									class="block text-gray-600 font-semibold hover:text-green-500 dark:text-gray-400"
									href={getTokenFromDex}
									>Get {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP</a
								>
								<a
									class="block text-gray-600 font-semibold hover:text-green-500 dark:text-gray-400"
									href="https://polygonscan.com/">View Info</a
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


	.secondary-font {
		color: rgb(151, 157, 198);
	}

	.smaller-font{
		font-size: 0.62rem;
	}

</style>
