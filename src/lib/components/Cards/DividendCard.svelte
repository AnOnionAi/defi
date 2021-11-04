<script lang="ts">
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { getTokenBalance, isNotZero } from '$lib/utils/erc20';
	import { getPendingReward, getSharesTotal, getUserInfo, harvest } from '$lib/utils/dividends';
	import { stakedWantTokens, deposit, withdraw } from '$lib/utils/vaultChef';
	import { Token } from '$lib/ts/types';
	import { onMount } from 'svelte';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { Chasing } from 'svelte-loading-spinners';
	import { BigNumber, ethers } from 'ethers';
	import { parseBigNumberToDecimal, parseBigNumberToString } from '$lib/utils/balanceParsers';
	import {
		transactionCompleted,
		transactionDeniedByTheUser,
		transactionSend,
		wrongInput
	} from '$lib/config/constants/notifications';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	const numericRegex: RegExp = /^\d+(\.\d+)*$/;

	const mushUsdPrice = 0.000000000001; //todo: change this value to the real mushPrice fetching an api.

	let TVL: BigNumber;

	let userBalance: BigNumber;
	let userStakedTokens: BigNumber;
	let userReward: BigNumber;
	let userCanHarvest: boolean = false;
	let depositInput: string = '';
	let withdrawInput: string = '';

	interface LoadingState {
		loadingDeposit: boolean;
		loadingWithdraw: boolean;
		loadingHarvest: boolean;
	}
	let loadingState: LoadingState = {
		loadingDeposit: false,
		loadingHarvest: false,
		loadingWithdraw: false
	};

	async function refreshUserData() {
		try {
			console.log('Balances Fetched');
			userBalance = await getTokenBalance(getContractAddress(Token.MUSHTOKEN), $accounts[0]);
			userStakedTokens = await stakedWantTokens(2, $accounts[0]);
			const [, rewardDebt] = await getUserInfo($accounts[0]);
			TVL = await getSharesTotal();
			userReward = await getPendingReward($accounts[0]);
			userCanHarvest = isNotZero(userReward);
		} catch {
			console.log('Failed on fetching data');
		}
	}

	async function handleDeposit() {
		if (!depositInput.trim().match(numericRegex)) {
			addNotification(wrongInput);
			return;
		}
		addNotification(transactionSend);
		try {
			loadingState.loadingDeposit = true;
			const tx = await deposit(2, depositInput.trim());
			await tx.wait();
			loadingState.loadingDeposit = false;
			userBalance = userBalance.sub(BigNumber.from(ethers.utils.parseEther(depositInput.trim())));
			userStakedTokens = userStakedTokens.add(
				BigNumber.from(ethers.utils.parseEther(depositInput.trim()))
			);
			addNotification(transactionCompleted);
			setTimeout(refreshUserData, 20000);
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingDeposit = false;
			console.log(loadingState.loadingDeposit);
		}
		loadingState.loadingDeposit = false;
	}

	async function handleWithdraw() {
		if (!withdrawInput.trim().match(numericRegex)) {
			addNotification(wrongInput);
			return;
		}
		addNotification(transactionSend);

		try {
			loadingState.loadingWithdraw = true;
			const tx = await withdraw(2, withdrawInput.trim());
			await tx.wait();
			addNotification(transactionCompleted);
			userBalance = userBalance.add(BigNumber.from(ethers.utils.parseEther(withdrawInput.trim())));
			userStakedTokens = userStakedTokens.sub(
				BigNumber.from(ethers.utils.parseEther(withdrawInput.trim()))
			);
			loadingState.loadingWithdraw = false;
			setTimeout(refreshUserData, 20000);
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingWithdraw = false;
		}
	}

	async function handleHarvest() {
		loadingState.loadingHarvest = true;
		addNotification(transactionSend);
		try {
			const tx = await harvest();
			await tx.wait();
			addNotification(transactionCompleted);
			userCanHarvest = false;
			userReward = ethers.constants.Zero;
			setTimeout(refreshUserData, 20000);
		} catch {
			console.log('Failed on Harvest');
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingHarvest = false;
		}
		loadingState.loadingHarvest = false;
	}

	onMount(() => {
		if ($accounts) {
			getTokenBalance(getContractAddress(Token.MUSHTOKEN), $accounts[0]).then(
				(balance) => (userBalance = balance)
			);
			stakedWantTokens(2, $accounts[0]).then((stakedTokens) => (userStakedTokens = stakedTokens));
			getSharesTotal().then((totalShares) => {
				TVL = totalShares;
			});

			getPendingReward($accounts[0]).then((reward) => {
				userReward = reward;
				console.log(userReward);
				userCanHarvest = isNotZero(userReward);
			});
		}
	});
</script>

<div class="h-full w-full mb-2">
	<div class="flex flex-col justify-around w-full h-4/12">
		<div class="flex w-23/24 mx-auto justify-between items-center">
			<div class="flex items-center">
				<img src="/mushRound.png" alt="" class="w-10" />
				<h2 class="text-2xl font-bold pl-2  dark:text-white">MUSH</h2>
			</div>
			<div>
				<p
					class="rounded-full py-1 px-4  border-2 border-green-500 text-green-600 inline text-xs font-semibold"
				>
					Earn MUSH 🍄
				</p>
			</div>
		</div>

		<div class="w-full h-26 flex flex-col justify-between ">
			<div class="flex w-full h-12 text-center">
				<div class="w-6/12">
					<p class="text-xs text-gray-600 font-semibold dark:text-gray-300">APR</p>
					<p class="font-medium dark:text-white">0%</p>
				</div>

				<div class="w-6/12">
					<p class="text-xs text-gray-600 font-semibold dark:text-gray-300">TVL🍄</p>
					<p class="font-medium dark:text-white">
						{#if TVL}
							{parseBigNumberToString(TVL)}
						{:else}
							- -
						{/if}
					</p>
				</div>
			</div>

			<div class="flex w-full h-12 text-center">
				<div class="w-6/12">
					<p class="text-xs text-gray-600 font-semibold dark:text-gray-300 ">Wallet</p>
					<p class="font-medium dark:text-white">
						{#if userBalance}
							{parseBigNumberToString(userBalance)}
						{:else}
							-- MUSH
						{/if}
					</p>
				</div>

				<div class="w-6/12">
					<p class="text-xs text-gray-600 font-semibold dark:text-gray-300">Deposit</p>
					<p class="font-medium dark:text-white">
						{#if userStakedTokens}
							{parseBigNumberToString(userStakedTokens)}
						{:else}
							--
						{/if}
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full h-8/12 flex flex-col justify-between">
		<div class="flex flex-col text-sm">
			<p class="text-gray-600 font-semibold mb-1 ml-1 dark:text-gray-300">
				Your Wallet:
				<span class="text-black dark:text-white">
					{#if userBalance}
						{parseBigNumberToString(userBalance)} MUSH
					{:else}
						-- MUSH
					{/if}
				</span>
			</p>

			<div class="bg-gray-200 dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-between px-4">
				<input
					bind:value={depositInput}
					type="text"
					class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12"
				/>
				<button
					disabled={loadingState.loadingDeposit}
					on:click={handleDeposit}
					class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5 {loadingState.loadingDeposit &&
						'cursor-not-allowed'} disabled:opacity-50 disabled:bg-green-500"
				>
					<p>Deposit</p>
					{#if loadingState.loadingDeposit}
						<div class="pl-3">
							<Chasing size={18} unit="px" color="#FFF" />
						</div>
					{/if}
				</button>
			</div>
			<p class="text-xs text-gray-700 dark:text-white pl-1 mt-1">
				Daily ROI Breakdown: 0.41% from Pools
			</p>
		</div>

		<div class="flex flex-col text-sm">
			<p class="text-gray-600 dark:text-gray-300 font-semibold ml-1 mb-1">
				Deposited:
				<span class="text-black dark:text-white">
					{#if userStakedTokens}
						{parseBigNumberToString(userStakedTokens)} MUSH
					{:else}
						--
					{/if}
				</span>
			</p>

			<div class="bg-gray-200  dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-between px-4">
				<input
					type="text"
					bind:value={withdrawInput}
					class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12"
				/>
				<button
					on:click={handleWithdraw}
					disabled={loadingState.loadingWithdraw}
					class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5 {loadingState.loadingWithdraw &&
						'cursor-not-allowed'} disabled:opacity-50 disabled:bg-green-500"
				>
					<p>Withdraw</p>
					{#if loadingState.loadingWithdraw}
						<div class="pl-3">
							<Chasing size={18} unit="px" color="#FFF" />
						</div>
					{/if}
				</button>
			</div>
		</div>

		<div class="flex flex-col text-sm">
			<p class="text-gray-600 dark:text-gray-300 font-semibold mb-1 ml-1">
				MUSH Earned:
				<span class="text-black" />
			</p>

			<div class="bg-gray-200 dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-between px-4">
				<p
					class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12 flex items-center"
				>
					{#if userReward}
						{parseBigNumberToString(userReward)}
					{:else}
						--.--
					{/if}
				</p>
				<button
					disabled={!userCanHarvest}
					on:click={handleHarvest}
					class="{userCanHarvest &&
						'hover:bg-green-500'} bg-black  h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5 {!userCanHarvest &&
						'cursor-not-allowed'} disabled:opacity-50 {loadingState.loadingHarvest &&
						'bg-green-500'}"
				>
					<p>Harvest</p>
					{#if loadingState.loadingHarvest}
						<div class="pl-3">
							<Chasing size={18} unit="px" color="#FFF" />
						</div>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>

<style>
</style>