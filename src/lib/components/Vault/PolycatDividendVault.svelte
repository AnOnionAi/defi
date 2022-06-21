<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { Token } from '$lib/types/types';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { getPoolTokenPriceUSD } from '$lib/utils/coinGecko';
	import { approveToken } from '$lib/utils/erc20';
	import { fetchVault } from '$lib/utils/fetchVault';
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	import { isMetaMaskInstalled, metaMaskCon } from '$lib/utils/metamaskCalls';
	import { deposit, withdraw } from '$lib/utils/vaultChef';
	import {
		faChevronUp,
		faChevronDown
	} from '@fortawesome/free-solid-svg-icons';
	import { useQuery } from '@sveltestack/svelte-query';
	import { ethers } from 'ethers';
	import { getContext } from 'svelte';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';
	import { Chasing } from 'svelte-loading-spinners';
	import { getNotificationsContext } from 'svelte-notifications';
	import { slide } from 'svelte/transition';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	import VaultHeading from './VaultHeading.svelte';

	const { open } = getContext('simple-modal');
	const { addNotification } = getNotificationsContext();

	export let vaultConfig;

	let isOpen = false;
	let vaultApproved = false;
	let userDepositAmount: string;
	let userWithdrawAmount: string;

	const loadingState = {
		something: false,
		approve: false,
		deposit: false,
		withdraw: false,
		harvest: false
	};

	$: userAcc = $accounts?.[0];
	$: allIn = true;
	$: vaultApproved = $fishVaultQuery.data?.tokenAllowance
		? !$fishVaultQuery.data?.tokenAllowance.isZero()
		: false;

	const openAccordeon = () => {
		isOpen = !isOpen;
	};

	const openModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	const fishVaultQuery = useQuery(
		['fishVaultQuery', userAcc, vaultConfig.pid, vaultConfig.tokenAddress],
		async () => {
			const fishVaultQueryResponse = await fetchVault(
				vaultConfig.pid,
				userAcc,
				vaultConfig.tokenAddress
			);
			console.log(fishVaultQueryResponse);
			return fishVaultQueryResponse;
		},
		{
			enabled: isOpen && !!userAcc,
			refetchInterval: 4000
		}
	);

	const fishPriceQuery = useQuery(
		['fishPriceQuery', vaultConfig.tokenAddress],
		async () => {
			const fishPrice = await getPoolTokenPriceUSD(vaultConfig.tokenAddress);
			return fishPrice;
		},
		{
			enabled: isOpen
		}
	);

	$: {
		fishVaultQuery.updateOptions({
			enabled: !!userAcc && isOpen
		});
	}

	$: {
		if (isOpen) {
			fishPriceQuery.updateOptions({
				enabled: isOpen
			});
		}
	}

	const approveFish = async () => {
		loadingState.something = true;
		loadingState.approve = true;
		const tx = await approveToken(
			vaultConfig.tokenAddress,
			getContractAddress(Token.VAULTCHEF)
		);
		if (!tx) return;
		await tx.wait();
		loadingState.something = false;
		loadingState.approve = false;
	};

	const depositFish = async () => {
		loadingState.something = true;
		loadingState.deposit = true;
		const tx = await deposit(vaultConfig.pid, userDepositAmount);
		if (!tx) return;
		await tx.wait();
		loadingState.something = false;
		loadingState.deposit = false;
	};

	const withdrawFish = async () => {
		loadingState.something = true;
		loadingState.withdraw = true;
		const tx = await withdraw(vaultConfig.pid, userWithdrawAmount);
		if (!tx) return;
		await tx.wait();
		loadingState.something = false;
		loadingState.withdraw = false;
	};
</script>

<div class="mx-auto mb-3 max-w-6xl  sm:px-4 md:px-2 lg:px-0">
	<div
		on:click={openAccordeon}
		class="{!$darkMode &&
			'sideShadow'} mx-auto rounded-lg bg-white/80 py-6  	{isOpen &&
			'rounded-t-lg'} hover:cursor-pointer hover:bg-slate-200   dark:bg-neutral-800/80 dark:hover:bg-neutral-600/80">
		<div
			class="mx-3 block items-center justify-between md:mx-8 md:flex lg:mx-14 xl:mx-20 ">
			<div class="mx-auto w-52">
				<div class="flex items-center justify-center lg:justify-start ">
					<img src={`/icons/fish.svg`} alt={'Fish token'} class=" w-7" />

					<div class="ml-2">
						<p
							class="text-xs font-medium uppercase text-gray-600 dark:text-gray-400">
							{$_('actions.earn')}
							FISH
						</p>
						<p class="text-lg font-semibold dark:text-white ">FISH</p>

						<div
							class="flex h-6  w-20 items-center  justify-center rounded-full border-2 border-black text-xs font-medium
							 capitalize tracking-wide dark:border-white dark:text-white ">
							Polycat
						</div>
					</div>
				</div>
			</div>

			<div
				class="flex h-20 items-center  justify-between p-2 md:flex-1 lg:mx-0">
				<div class="flex w-11/12 justify-around ">
					<VaultHeading headingText={'APY'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{'0'}%
						</p>
					</VaultHeading>
					<VaultHeading headingText={'Staked'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{'0'}
						</p>
					</VaultHeading>
					<VaultHeading headingText={'Wallet'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{'0'}
						</p>
					</VaultHeading>
					<VaultHeading headingText={'TVL'}>
						<p class="text-lg tracking-tighter dark:text-white">
							${'0'}
						</p>
					</VaultHeading>
				</div>
				<div class="dark:text-white">
					{#if isOpen}
						<Fa icon={faChevronUp} />
					{:else}
						<Fa icon={faChevronDown} />
					{/if}
				</div>
			</div>
		</div>
	</div>
	{#if isOpen}
		<div
			in:slide={{ duration: 400 }}
			out:slide={{ duration: 400 }}
			class="max-w-8xl mx-auto rounded-b-lg bg-neutral-200 px-5 py-5  dark:bg-neutral-800">
			{#if !$accounts}
				<button
					on:click={isMetaMaskInstalled() ? metaMaskCon : openModal}
					class=" mx-auto block w-10/12  transform rounded-xl py-2 text-xl font-semibold tracking-wide  text-white transition duration-300 hover:bg-blue-400 "
					>{$_('actions.unlock')}
				</button>
			{:else if $accounts && !vaultApproved}
				<button
					on:click={approveFish}
					class=" mx-auto block w-10/12 transform rounded-xl bg-black py-2 text-xl font-semibold tracking-wide text-white transition  duration-300 hover:bg-white hover:text-black  "
					>{$_('actions.approve')} FISH
				</button>
			{:else if $accounts && vaultApproved}
				<div class="flex-wrapper flex  flex-col justify-around lg:flex-row">
					<div class="lg:w-4/12">
						<div class="flex items-center">
							<p
								class="text-sm font-medium tracking-tight text-gray-600 dark:text-white">
								{$_('actions.wallet')}:
							</p>
							{#if $fishVaultQuery.data.userBalance}
								<p class="pl-1 text-sm font-medium dark:text-white">
									{ethers.utils.formatEther($fishVaultQuery.data.userBalance)}
									FISH
								</p>
							{:else if $fishVaultQuery.isLoading}
								<p class="pl-1 text-sm font-semibold dark:text-white">
									{$_('vaultAccordeon.loading')}...
								</p>
							{:else if $fishVaultQuery.isError}
								<p class="pl-1 text-sm font-medium dark:text-white">N/A FISH</p>
							{/if}
						</div>
						<div
							class="my-2 flex justify-between rounded-lg bg-neutral-300 py-2 px-3  dark:bg-neutral-700 lg:w-11/12">
							<input
								on:keypress={onyAllowFloatNumbers}
								bind:value={userDepositAmount}
								placeholder="Enter Value"
								class="w-8/12  bg-transparent font-bold text-gray-900 	dark:text-white"
								type="text" />

							{#if userDepositAmount}
								<button
									on:click={depositFish}
									class:cursor-not-allowed={loadingState.something}
									disabled={loadingState.something}
									class="flex  items-center  bg-triadicGreen-700 hover:bg-triadicGreen-600 disabled:cursor-not-allowed dark:bg-triadicGreen-800 dark:hover:bg-triadicGreen-900  {allIn &&
										'glowingButton bg-triadicGreen-600'} rounded-lg px-4 py-3 font-bold text-white transition duration-300">
									<p>{$_('actions.deposit')}</p>
									{#if loadingState.deposit}
										<div class="pl-2">
											<Chasing size="20" unit="px" color="#ffff" />
										</div>
									{/if}
								</button>
							{:else}
								<button
									class:cursor-not-allowed={loadingState.something}
									disabled={loadingState.something}
									class="flex flex-col items-center  rounded-lg bg-gradient-to-r from-complementary-600 to-triadicGreen-600 px-4 py-1 font-bold text-white transition duration-300 disabled:cursor-not-allowed">
									<p>{$_('actions.deposit')}</p>
									<p class="text-xs">MAX</p>
									{#if loadingState.deposit}
										<div class="pl-2">
											<Chasing size="20" unit="px" color="#ffff" />
										</div>
									{/if}
								</button>
							{/if}
						</div>
						<div class="flex">
							<p class="pl-1 font-medium  text-gray-500 dark:text-white">
								{$_('actions.depositfee')}:
							</p>
							<p class="px-1   font-medium dark:text-white">
								{vaultConfig.depositFee}%
							</p>
						</div>
						<div class="flex">
							<p class="pl-1 font-medium  text-gray-500 dark:text-white">
								{$_('actions.performanceFee')}:
							</p>
							<p class="px-1   font-medium dark:text-white">5%</p>
						</div>
					</div>

					<div class="pt-4 lg:w-4/12 lg:pt-0">
						<div class="flex">
							<p class="text-sm font-medium text-gray-600 dark:text-white">
								{$_('pastActions.deposited')}:
							</p>
							{#if $fishVaultQuery.data?.userStakedTokens}
								<p
									class="pl-1 text-sm font-medium tracking-tight dark:text-white ">
									{ethers.utils.formatEther(
										$fishVaultQuery.data?.userStakedTokens
									)}
									FISH
								</p>
							{:else if $fishVaultQuery.isLoading}
								<p class="pl-1 font-medium dark:text-white">
									{$_('vaultAccordeon.loading')}...
								</p>
							{:else if $fishVaultQuery.isError}
								<p class="pl-1 text-sm font-medium dark:text-white">N/A FISH</p>
							{/if}
						</div>
						<div
							class="my-2 flex justify-between rounded-lg bg-neutral-300 py-2 px-3  dark:bg-neutral-700 lg:w-11/12 ">
							<input
								on:keypress={onyAllowFloatNumbers}
								bind:value={userWithdrawAmount}
								placeholder="Enter Value"
								class="w-8/12 bg-transparent font-bold text-gray-900 dark:text-white"
								type="text" />
							<button
								on:click={withdrawFish}
								disabled={loadingState.something}
								class="flex items-center rounded-lg  bg-triadicYellow-700 px-4 py-3 font-semibold tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-50">
								<p>{$_('actions.withdraw')}</p>
								{#if loadingState.withdraw}
									<div class="pl-2">
										<Chasing size="20" unit="px" color="#ffff" />
									</div>
								{/if}
							</button>
						</div>
						<div class="flex font-medium dark:text-white">
							<p class="mr-1 text-gray-500 dark:text-white">
								{$_('actions.withdrawalfee')}:
							</p>
							{#if !isNaN(vaultConfig.withdrawalFee)}
								<p class="">{vaultConfig.withdrawalFee}%</p>
							{:else}
								<p class="">{$_('actions.notAvaliable')}</p>
							{/if}
						</div>
					</div>

					<div class="pt-4 lg:w-3/12 lg:pt-0">
						<div class="pl-1">
							<p class="pb-1  font-medium text-gray-500 dark:text-gray-400">
								{$_('vaultAccordeon.currentPrices')}:
							</p>
							{#if $fishPriceQuery.data}
								<p class="font-light dark:text-white">
									{'FISH'}: ${$fishPriceQuery.data}
								</p>
							{:else if $fishPriceQuery.isLoading || $fishPriceQuery.isIdle}
								<p class="font-light dark:text-white">
									{'FISH'}: {$_('vaultAccordeon.loading')}...
								</p>
							{:else}
								<p class="font-light dark:text-white">
									{'FISH'}: N/A
								</p>
							{/if}

							<div class="py-2">
								<a
									target="_blank"
									class="block font-medium text-gray-600  dark:text-gray-400"
									href={`https://polygonscan.com/address/${vaultConfig.tokenAddress}`}>
									<span class="hover:text-green-500">
										{$_('vaultAccordeon.viewInfo')}
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.glowingButton {
		box-shadow: rgba(177, 255, 162, 1) 0px 5px 10px;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	input {
		font-size: 18px;
		font-weight: medium;
		outline: none;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.gradientQuickswap {
		background: rgb(33, 114, 229);
		background: linear-gradient(
			198deg,
			rgba(33, 114, 229, 1) 5%,
			rgba(181, 0, 114, 1) 95%
		);
	}

	.gradientQuickswap:hover {
		background: rgb(33, 114, 229);
	}

	.gradientSushiswap {
		background: rgb(222, 92, 168);
		background: linear-gradient(
			18deg,
			rgba(222, 92, 168, 1) 33%,
			rgba(254, 118, 136, 1) 75%
		);
	}

	.gradientSushiswap:hover {
		background: rgb(222, 92, 168);
	}
</style>
