<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { getTokenBalance, isNotZero } from '$lib/utils/erc20';
	import { getPendingReward, getSharesTotal, getUserInfo, harvest } from '$lib/utils/dividends';
	import { stakedWantTokens, deposit, withdraw } from '$lib/utils/vaultChef';
	import { LoadingState, Token } from '$lib/ts/types';
	import { onDestroy, onMount } from 'svelte';
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
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	import { tokenPrice } from '$lib/stores/NativeTokenPrice';

	const { addNotification } = getNotificationsContext();

	$: mushUsdPrice = $tokenPrice;

	let pollingInterval;

	let TVL: BigNumber;
	let userAddress: string;
	let userBalance: BigNumber;
	let userStakedTokens: BigNumber;
	let userReward: BigNumber;

	let userCanWithdraw: boolean = false;
	let userCanHarvest: boolean = false;
	let userCanDeposit: boolean = false;

	let depositInput: string = '';
	let withdrawInput: string = '';

	let loadingState: LoadingState = {
		loadingDeposit: false,
		loadingHarvest: false,
		loadingWithdraw: false
	};

	$: userAddress = $accounts?.[0];
	$: userCanDeposit = !userBalance?.isZero();
	$: userCanWithdraw = !userStakedTokens?.isZero();
	$: userCanDeposit = !userReward?.isZero();

	$: if (userAddress) {
		refreshUserData();
		pollingInterval = setInterval(refreshUserData, 8000);
	} else {
		clearInterval(pollingInterval);
	}

	onDestroy(() => {
		clearInterval(pollingInterval);
	});

	const refreshUserData = async () => {
		try {
			userBalance = await getTokenBalance(getContractAddress(Token.MUSHTOKEN), userAddress);
			console.log(userBalance);
			userStakedTokens = await stakedWantTokens(2, userAddress);
			TVL = await getSharesTotal();
			userReward = await getPendingReward(userAddress);
		} catch {
			console.log('Failed on fetching data');
		}
	};

	const handleDeposit = async () => {
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
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingDeposit = false;
		}
		loadingState.loadingDeposit = false;
	};

	const handleWithdraw = async () => {
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
		} catch (error) {
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingWithdraw = false;
		}
	};

	const handleHarvest = async () => {
		loadingState.loadingHarvest = true;
		addNotification(transactionSend);
		try {
			const tx = await harvest();
			await tx.wait();
			addNotification(transactionCompleted);
			userCanHarvest = false;
			userReward = ethers.constants.Zero;
		} catch {
			console.log('Failed on Harvest');
			addNotification(transactionDeniedByTheUser);
			loadingState.loadingHarvest = false;
		}
		loadingState.loadingHarvest = false;
	};
</script>

<div class="h-full w-full">
	<div class="h-full w-full">
		<div class="flex flex-col justify-around w-full h-4/12">
			<div class="flex w-23/24 mx-auto justify-between items-center">
				<div class="flex items-center">
					<img src="/mushRound.png" alt="Mush Token Icon" class="w-10" />
					<h2 class="text-2xl font-bold pl-2  dark:text-white">MUSH</h2>
				</div>
				<div>
					<p
						class="rounded-full flex py-1 px-4  border-2 border-blue-500 text-blue-500 inline text-xs font-semibold dark:border-blue-400 dark:text-blue-400"
					>
						<span class="mr-1">{$_('actions.earn')} USDC </span>
						<img src="/vaultTokensIcons/usdc.svg" alt="" class="w-4" />
					</p>
				</div>
			</div>

			<div class="w-full h-26 flex flex-col justify-between ">
				<div class="flex w-full h-12 text-center">
					<div class="w-6/12">
						<p class="text-xs text-gray-600 font-semibold dark:text-gray-300">APR</p>
						<p class="font-medium dark:text-white">185.4%</p>
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
						<p class="text-xs text-gray-600 font-semibold dark:text-gray-300 ">
							{$_('actions.wallet')}
						</p>
						<p class="font-medium dark:text-white">
							{#if userBalance}
								{parseBigNumberToString(userBalance)}
							{:else}
								-- MUSH
							{/if}
						</p>
					</div>

					<div class="w-6/12">
						<p class="text-xs text-gray-600 font-semibold dark:text-gray-300">
							{$_('actions.deposit')}
						</p>
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

		<div class="w-full h-8/12 flex flex-col justify-around">
			<div class="flex flex-col text-sm h-2/6 justify-center">
				<p class="text-gray-600 font-semibold mb-1 ml-1 dark:text-gray-300">
					{$_('your.wallet')}:
					<span class="text-black dark:text-white">
						{#if userBalance}
							{parseBigNumberToString(userBalance)} MUSH
						{:else}
							-- MUSH
						{/if}
					</span>
				</p>

				<div
					class="bg-gray-200 dark:bg-gray-800 rounded-xl h-5/6 max-h-17 py-2 flex justify-between px-4"
				>
					<input
						on:keypress={onyAllowFloatNumbers}
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
						<p>{$_('actions.deposit')}</p>
						{#if loadingState.loadingDeposit}
							<div class="pl-3">
								<Chasing size={18} unit="px" color="#FFF" />
							</div>
						{/if}
					</button>
				</div>
			</div>

			<div class="flex flex-col text-sm h-2/6 justify-center">
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

				<div
					class="bg-gray-200  dark:bg-gray-800 rounded-xl h-5/6 max-h-17 py-2 flex justify-between px-4"
				>
					<input
						type="text"
						on:keypress={onyAllowFloatNumbers}
						bind:value={withdrawInput}
						class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12"
					/>
					<button
						on:click={handleWithdraw}
						disabled={loadingState.loadingWithdraw}
						class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5 {loadingState.loadingWithdraw &&
							'cursor-not-allowed'} disabled:opacity-50 disabled:bg-green-500"
					>
						<p>{$_('actions.withdraw')}</p>
						{#if loadingState.loadingWithdraw}
							<div class="pl-3">
								<Chasing size={18} unit="px" color="#FFF" />
							</div>
						{/if}
					</button>
				</div>
			</div>

			<div class="flex flex-col text-sm h-2/6 justify-center">
				<p class="text-gray-600 dark:text-gray-300 font-semibold mb-1 ml-1">
					USDC {$_('pastActions.earned')}:
					<span class="text-black" />
				</p>

				<div
					class="bg-gray-200 dark:bg-gray-800 rounded-xl h-5/6 max-h-17 py-2 flex justify-between px-4"
				>
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
						<p>{$_('actions.harvest')}</p>
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
</div>

<style>
</style>
