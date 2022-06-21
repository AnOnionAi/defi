<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import {
		faChevronUp,
		faChevronDown
	} from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import {
		getTokenBalance,
		approveToken,
		getTokenAllowance,
		isNotZero
	} from '$lib/utils/erc20';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { Token } from '$lib/types/types';
	import { BigNumber } from 'ethers';
	import { deposit, withdraw, stakedWantTokens } from '$lib/utils/vaultChef';
	import { Chasing } from 'svelte-loading-spinners';
	import { ethers } from 'ethers';
	import { getContext } from 'svelte';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	import { getNotificationsContext } from 'svelte-notifications';
	import { darkMode } from '$lib/stores/dark';
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	import { isMetaMaskInstalled, metaMaskCon } from '$lib/utils/metamaskCalls';
	import AssetPair from './AssetPair.svelte';
	import VaultHeading from './VaultHeading.svelte';
	import {
		spawnErrorNotification,
		spawnSuccessNotification
	} from '$lib/utils/spawnNotifications';
	import { useQuery } from '@sveltestack/svelte-query';
	import { fetchVault, fetchVaultPairTokensPrice } from '$lib/utils/fetchVault';

	const { open } = getContext('simple-modal');
	const { addNotification } = getNotificationsContext();

	export let vaultConfig;
	let userAcc;
	let isHidden = true;
	let stakedTokens;
	let userTokens: BigNumber = ethers.constants.Zero;
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

	$: vaultApproved = $vaultQuery.data?.tokenAllowance
		? !$vaultQuery.data?.tokenAllowance.isZero()
		: false;

	const vaultQuery = useQuery(
		['vaultQuery', userAcc, vaultConfig.pid, vaultConfig.pair.pairContract],
		async () => {
			const vaultQueryResponse = await fetchVault(
				vaultConfig.pid,
				userAcc,
				vaultConfig.pair.pairContract
			);
			return vaultQueryResponse;
		},
		{
			enabled: !!userAcc && !isHidden,
			refetchInterval: 4000
		}
	);

	const tokenPricesQuery = useQuery(
		[
			'tokenPricesQuery',
			vaultConfig.pair.token0Contract,
			vaultConfig.pair.token1Contract
		],
		async () => {
			const tokenPricesResponse = await fetchVaultPairTokensPrice(
				vaultConfig.pair.token0Contract,
				vaultConfig.pair.token1Contract
			);
			return tokenPricesResponse;
		},
		{
			enabled: !isHidden
		}
	);

	$: {
		vaultQuery.updateOptions({
			enabled: !!userAcc && !isHidden
		});
	}

	$: {
		if (!isHidden) {
			tokenPricesQuery.updateOptions({
				enabled: !isHidden
			});
		}
	}

	$: allIn = ethers.utils.formatEther(userTokens) == userDepositAmount;

	const openAccordeon = (): void => {
		isHidden = !isHidden;
	};

	const handleTransaction = async (
		transaction: Promise<any>,
		transactionName: string
	) => {
		loadingState.something = true;
		loadingState[transactionName] = true;
		try {
			const tx = await transaction;
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');

			if (transactionName == 'approve') {
				setTimeout(() => {
					getTokenAllowance(
						vaultConfig.pair.pairContract,
						getContractAddress(Token.VAULTCHEF),
						userAcc
					).then((res) => {
						vaultApproved = isNotZero(res);
					});
				}, 10000);
			}

			if (transactionName == 'deposit') {
				const bnDepositedTokens = BigNumber.from(
					ethers.utils.parseEther(userDepositAmount.trim())
				);
				stakedTokens = stakedTokens.add(bnDepositedTokens);
				userTokens = userTokens.sub(bnDepositedTokens);
			}
			if (transactionName == 'withdraw') {
				const bnWithdrawedTokens = BigNumber.from(
					ethers.utils.parseEther(userWithdrawAmount.trim())
				);
				stakedTokens = stakedTokens.sub(bnWithdrawedTokens);
				userTokens = userTokens.add(bnWithdrawedTokens);
			}
		} catch (error) {
			console.log(error);
			spawnErrorNotification(addNotification, error);
		}
		loadingState.something = false;
		loadingState[transactionName] = false;
	};

	const openModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	const depositMaxAmount = () => {
		if (userTokens.isZero()) {
			console.log(userTokens);
			console.log('is zero lol');
			return;
		}
		const parsedUserTokens = ethers.utils.formatEther(userTokens);
		userDepositAmount = parsedUserTokens;
		handleTransaction(deposit(vaultConfig.pid, userDepositAmount), 'deposit');
	};
</script>

<div
	in:fly={{ y: 200, duration: 100 }}
	class="mx-auto mb-3 max-w-6xl  sm:px-4 md:px-2 lg:px-0">
	<div
		on:click={openAccordeon}
		class="{!$darkMode &&
			'sideShadow'} mx-auto rounded-lg bg-white/80 py-6  	{!isHidden &&
			'rounded-t-lg'} hover:cursor-pointer hover:bg-slate-200   dark:bg-neutral-800/80 dark:hover:bg-neutral-600/80">
		<div
			class="mx-3 block items-center justify-between md:mx-8 md:flex lg:mx-14 xl:mx-20 ">
			<AssetPair
				token0Name={vaultConfig.pair.token0Name}
				token1Name={vaultConfig.pair.token1Name}
				platformName={vaultConfig.platform.name.toLowerCase()} />
			<div
				class="flex h-20 items-center  justify-between p-2 md:flex-1 lg:mx-0">
				<div class="flex w-11/12 justify-around ">
					<VaultHeading headingText={'APY'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{vaultConfig.apy.toFixed(2)}%
						</p>
					</VaultHeading>
					<VaultHeading headingText={'Staked'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{vaultConfig.stakedAmount.toFixed(2)}
						</p>
					</VaultHeading>
					<VaultHeading headingText={'Wallet'}>
						<p class="text-lg tracking-tighter dark:text-white">
							{vaultConfig.userWalletBalance.toFixed(2)}
						</p>
					</VaultHeading>
					<VaultHeading headingText={'TVL'}>
						<p class="text-lg tracking-tighter dark:text-white">
							${vaultConfig.tvl.toFixed(2)}
						</p>
					</VaultHeading>
				</div>
				<div class="dark:text-white">
					{#if isHidden}
						<Fa icon={faChevronDown} />
					{:else}
						<Fa icon={faChevronUp} />
					{/if}
				</div>
			</div>
		</div>
	</div>
	{#if !isHidden}
		<div
			in:slide={{ duration: 400 }}
			out:slide={{ duration: 400 }}
			class="max-w-8xl mx-auto rounded-b-lg bg-neutral-200 px-5 py-5  dark:bg-neutral-800">
			{#if !$accounts}
				<button
					on:click={isMetaMaskInstalled() ? metaMaskCon : openModal}
					class=" mx-auto block w-10/12 {vaultConfig.platform.name.toLowerCase() ==
					'quickswap'
						? 'gradientQuickswap'
						: 'gradientSushiswap'} transform rounded-xl py-2 text-xl font-semibold tracking-wide  text-white transition duration-300 hover:bg-blue-400 "
					>{$_('actions.unlock')}
				</button>
			{:else if $accounts && !vaultApproved}
				<button
					on:click={async () =>
						handleTransaction(
							approveToken(
								vaultConfig.pair.pairContract,
								getContractAddress(Token.VAULTCHEF)
							),
							'approve'
						)}
					class=" mx-auto block w-10/12 {vaultConfig.platform.name.toLowerCase() ==
					'quickswap'
						? 'gradientQuickswap'
						: 'gradientSushiswap'} transform rounded-xl py-2 text-xl font-semibold tracking-wide  text-white transition duration-300 hover:bg-blue-400 "
					>{$_('actions.approve')}
					{vaultConfig.pair.token0Name}-{vaultConfig.pair.token1Name}
				</button>
			{:else if $accounts && vaultApproved}
				<div class="flex-wrapper flex  flex-col justify-around lg:flex-row">
					<div class="lg:w-4/12">
						<div class="flex items-center">
							<p
								class="text-sm font-medium tracking-tight text-gray-600 dark:text-white">
								{$_('actions.wallet')}:
							</p>
							{#if $vaultQuery.data.userBalance}
								<p class="pl-1 text-sm font-medium dark:text-white">
									{ethers.utils.formatEther($vaultQuery.data.userBalance)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{:else if $vaultQuery.isLoading}
								<p class="pl-1 text-sm font-semibold dark:text-white">
									{$_('vaultAccordeon.loading')}...
								</p>
							{:else if $vaultQuery.isError}
								<p class="pl-1 text-sm font-medium dark:text-white">
									N/A
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
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
									class:cursor-not-allowed={loadingState.something}
									disabled={loadingState.something}
									on:click={async () =>
										handleTransaction(
											deposit(vaultConfig.pid, userDepositAmount),
											'deposit'
										)}
									class="flex  items-center  bg-triadicGreen-700 hover:bg-triadicGreen-600 disabled:cursor-not-allowed dark:bg-triadicGreen-800 dark:hover:bg-triadicGreen-900  {allIn &&
										'glowingButton bg-triadicGreen-600'} rounded-lg px-4 py-3 font-bold text-white transition duration-300 hover:bg-{vaultConfig
										.platform.brandColor}-500 {loadingState.deposit &&
										`bg-${vaultConfig.platform.brandColor}-500`}">
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
									on:click={depositMaxAmount}
									class="flex flex-col items-center  rounded-lg bg-gradient-to-r from-complementary-600 to-triadicGreen-600 px-4 py-1 font-bold text-white transition duration-300 disabled:cursor-not-allowed hover:bg-{vaultConfig
										.platform.brandColor}-500 {loadingState.deposit &&
										`bg-${vaultConfig.platform.brandColor}-500`}">
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
							{#if $vaultQuery.data?.userStakedTokens}
								<p
									class="pl-1 text-sm font-medium tracking-tight dark:text-white ">
									{ethers.utils.formatEther($vaultQuery.data?.userStakedTokens)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{:else if $vaultQuery.isLoading}
								<p class="pl-1 font-medium dark:text-white">
									{$_('vaultAccordeon.loading')}...
								</p>
							{:else if $vaultQuery.isError}
								<p class="pl-1 text-sm font-medium dark:text-white">
									N/A
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
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
								disabled={loadingState.something}
								on:click={async () =>
									handleTransaction(
										withdraw(vaultConfig.pid, userWithdrawAmount.toString()),
										'withdraw'
									)}
								class="flex items-center rounded-lg  bg-triadicYellow-700 px-4 py-3 font-semibold tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-{vaultConfig
									.platform.brandColor}-500 {loadingState.withdraw &&
									`bg-${vaultConfig.platform.brandColor}-500`}">
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
							{#if $tokenPricesQuery.data}
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token0quote}: ${$tokenPricesQuery.data
										.token0Price}
								</p>
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token1quote}: ${$tokenPricesQuery.data
										.token1Price}
								</p>
							{:else if $tokenPricesQuery.isLoading || $tokenPricesQuery.isIdle}
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token0quote}: {$_(
										'vaultAccordeon.loading'
									)}...
								</p>
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token1quote}: {$_(
										'vaultAccordeon.loading'
									)}...
								</p>
							{:else}
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token0quote}: N/A
								</p>
								<p class="font-light dark:text-white">
									{vaultConfig.pair.token1quote}: N/A
								</p>
							{/if}

							<div class="py-2">
								<a
									target="_blank"
									class="block font-medium text-gray-600 hover:text-green-500 dark:text-gray-400"
									href={`https://app.sushi.com/add?tokens=${vaultConfig.pair.token0Contract}&tokens=${vaultConfig.pair.token1Contract}&chainId=137`}
									>{$_('actions.get')}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP</a>
								<a
									target="_blank"
									class="block font-medium text-gray-600  dark:text-gray-400"
									href={vaultConfig.pair.pairURL}>
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
