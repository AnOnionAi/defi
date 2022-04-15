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
	import { metaMaskCon } from '$lib/utils/metamaskCalls';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { Token } from '$lib/types/types';
	import { getTokenPriceUSD } from '$lib/utils/coinGecko';
	import { BigNumber } from 'ethers';
	import { deposit, withdraw, stakedWantTokens } from '$lib/utils/vaultChef';
	import { Chasing } from 'svelte-loading-spinners';
	import { ethers } from 'ethers';
	import { getContext } from 'svelte';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	const { open } = getContext('simple-modal');
	import {
		transactionCompleted,
		transactionDeniedByTheUser,
		transactionSend
	} from '$lib/config/constants/notifications';
	import { getNotificationsContext } from 'svelte-notifications';
	import { darkMode } from '$lib/stores/dark';
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	import { isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import AssetPair from './AssetPair.svelte';
	import VaultHeading from './VaultHeading.svelte';

	const { addNotification } = getNotificationsContext();

	export let vaultConfig;
	let userAcc: string;
	let isHidden = true;
	let isApproved: boolean;
	let stakedTokens;
	let userTokens: BigNumber;
	let tkn0Price: number;
	let tkn1Price: number;
	let userDepositAmount: string;
	let userWithdrawAmount: string;
	const loadingState = {
		something: false,
		approve: false,
		deposit: false,
		withdraw: false,
		harvest: false
	};

	accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
		}
	});
	const openAccordeon = (): void => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};
	const handleTransaction = async (
		transaction: Promise<any>,
		transactionName: string
	) => {
		loadingState.something = true;
		loadingState[transactionName] = true;
		addNotification(transactionSend);
		try {
			const tx = await transaction;
			await tx.wait();
			addNotification(transactionCompleted);

			if (transactionName == 'approve') {
				setTimeout(() => {
					getTokenAllowance(
						vaultConfig.pair.pairContract,
						getContractAddress(Token.VAULTCHEF),
						userAcc
					).then((res) => {
						isApproved = isNotZero(res);
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

			setTimeout(() => {
				getTokenBalance(vaultConfig.pair.pairContract, userAcc).then(
					(balance) => {
						userTokens = balance;
					}
				);
				stakedWantTokens(vaultConfig.pid, userAcc).then((stakedAmount) => {
					stakedTokens = stakedAmount;
				});
			}, 8000);
		} catch (error) {
			console.log(error);
			addNotification(transactionDeniedByTheUser);
		}
		loadingState.something = false;
		loadingState[transactionName] = false;
	};
	$: if (!isHidden) {
		if (userAcc) {
			getTokenAllowance(
				vaultConfig.pair.pairContract,
				getContractAddress(Token.VAULTCHEF),
				userAcc
			).then((res) => {
				isApproved = isNotZero(res);
			});
			getTokenBalance(vaultConfig.pair.pairContract, userAcc).then(
				(balance) => {
					userTokens = balance;
				}
			);
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

	const openModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};
</script>

<div
	in:fly={{ y: 200, duration: 100 }}
	class="mx-auto mb-3 max-w-6xl opacity-95 sm:px-4 md:px-2 lg:px-0">
	<div
		on:click={openAccordeon}
		class="{!$darkMode &&
			'sideShadow'} mx-auto rounded-lg bg-white py-6  	{!isHidden &&
			'rounded-t-lg'} hover:cursor-pointer hover:bg-slate-200   dark:bg-neutral-800 dark:hover:bg-neutral-600">
		<div
			class="mx-3 block items-center justify-between md:mx-8 md:flex lg:mx-14 xl:mx-20 ">
			<AssetPair
				token0Name={vaultConfig.pair.token0Name}
				token1Name={vaultConfig.pair.token1Name}
				platformName={vaultConfig.platform.name.toLowerCase()} />
			<div
				class="flex h-20 items-center  justify-between p-2 md:flex-1 lg:mx-0">
				<div class="flex w-11/12 justify-around ">
					<VaultHeading
						headingText={'APY'}
						subHeading={vaultConfig.apy.toFixed(2)}>%</VaultHeading>
					<VaultHeading
						headingText={'Staked'}
						subHeading={vaultConfig.stakedAmount.toFixed(2)} />
					<VaultHeading
						headingText={'Wallet'}
						subHeading={vaultConfig.userWalletBalance.toFixed(2)} />
					<VaultHeading
						headingText={'TVL'}
						subHeading={vaultConfig.tvl.toFixed(2)} />
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
			class="max-w-8xl mx-auto rounded-b-lg bg-neutral-200 px-5 py-5 opacity-100 dark:bg-neutral-800">
			{#if !$accounts}
				<button
					on:click={isMetaMaskInstalled() ? metaMaskCon : openModal}
					class=" mx-auto block w-10/12 {vaultConfig.platform.name.toLowerCase() ==
					'quickswap'
						? 'gradientQuickswap'
						: 'gradientSushiswap'} transform rounded-xl py-2 text-xl font-semibold tracking-wide  text-white transition duration-300 hover:bg-blue-400 "
					>{$_('actions.unlock')}
				</button>
			{:else}
				<div class="flex flex-col  lg:flex-row flex-wrapper justify-around">
					<div class="lg:w-4/12">
						<div class="flex items-center">
							<p
								class="text-gray-600 font-medium dark:text-white tracking-tight">
								{$_('actions.wallet')}:
							</p>
							{#if userTokens}
								<p class="pl-1 dark:text-white font-medium tracking-tighter">
									{Number(ethers.utils.formatEther(userTokens)).toFixed(4)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{:else}
								<p class="pl-1 dark:text-white font-semibold text-sm">
									0.000000000000000000 WMATIC-USDC
									<!-- N/A {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name} -->
								</p>
							{/if}
						</div>
						<div
							class="flex my-2 py-2 px-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg  lg:w-11/12 justify-between">
							<input
								on:keypress={onyAllowFloatNumbers}
								bind:value={userDepositAmount}
								placeholder="Enter Value"
								class="bg-transparent  text-gray-900 font-bold w-8/12 	dark:text-white"
								type="text" />
							{#if isApproved}
								<button
									class:cursor-not-allowed={loadingState.something}
									disabled={loadingState.something}
									on:click={async () =>
										handleTransaction(
											deposit(vaultConfig.pid, userDepositAmount),
											'deposit'
										)}
									class="flex items-center  disabled:cursor-not-allowed bg-black disabled:opacity-50 text-white font-bold rounded-lg px-5 py-3 tracking-wide hover:bg-{vaultConfig
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
									class="flex items-center bg-black  disabled:opacity-50 {loadingState.something &&
										'cursor-not-allowed'} text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-{vaultConfig
										.platform.brandColor}-500 {loadingState.approve &&
										`bg-${vaultConfig.platform.brandColor}-500`}">
									<p>{$_('actions.approve')}</p>
									{#if loadingState.approve}
										<div class="pl-2">
											<Chasing size="20" unit="px" color="#ffff" />
										</div>
									{/if}
								</button>
							{/if}
						</div>
						<div class="flex">
							<p class="pl-1 text-gray-500  dark:text-white font-medium">
								{$_('actions.depositfee')}:
							</p>
							<p class="px-1   dark:text-white font-medium">
								{vaultConfig.depositFee}%
							</p>
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-4/12">
						<div class="flex">
							<p class="text-gray-600 font-medium dark:text-white ">
								{$_('pastActions.deposited')}:
							</p>
							{#if stakedTokens}
								<p class="font-medium pl-1 dark:text-white  tracking-tight">
									{Number(ethers.utils.formatEther(stakedTokens)).toFixed(4)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{:else}
								<p class="font-medium pl-1 dark:text-white">
									0 {vaultConfig.pair.token0quote}-{vaultConfig.pair
										.token1quote}
								</p>
							{/if}
						</div>
						<div
							class="flex justify-between my-2 py-2 px-3 bg-neutral-300 rounded-lg  dark:bg-neutral-700 lg:w-11/12 ">
							<input
								on:keypress={onyAllowFloatNumbers}
								bind:value={userWithdrawAmount}
								placeholder="Enter Value"
								class="text-gray-900 font-bold w-8/12 bg-transparent dark:text-white"
								type="text" />
							<button
								disabled={loadingState.something}
								on:click={async () =>
									handleTransaction(
										withdraw(vaultConfig.pid, userWithdrawAmount.toString()),
										'withdraw'
									)}
								class="flex items-center disabled:cursor-not-allowed  bg-black disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-3 tracking-wide hover:bg-{vaultConfig
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
						<div class="flex dark:text-white font-medium">
							<p class="mr-1 text-gray-500 dark:text-white	 ">
								{$_('actions.withdrawalfee')}:
							</p>
							{#if vaultConfig.withdrawalFee}
								<p class="">{vaultConfig.withdrawalFee}%</p>
							{:else}
								<p class="">{$_('actions.notAvaliable')}</p>
							{/if}
						</div>
					</div>

					<div class="pt-4 lg:pt-0 lg:w-3/12">
						<div class="pl-1">
							<p class="text-gray-500  pb-1 dark:text-gray-400 font-medium">
								{$_('vaultAccordeon.currentPrices')}:
							</p>
							<p class="font-light	 dark:text-white ">
								{#if tkn0Price}
									{vaultConfig.pair.token0quote}: ${tkn0Price}
								{:else}
									{vaultConfig.pair.token0quote}: {$_(
										'vaultAccordeon.loading'
									)}...
								{/if}
							</p>
							<p class="font-light dark:text-white">
								{#if tkn1Price}
									{vaultConfig.pair.token1quote}: ${tkn1Price}
								{:else}
									{vaultConfig.pair.token1quote}: {$_(
										'vaultAccordeon.loading'
									)}...
								{/if}
							</p>
							<div class="py-2">
								<a
									target="_blank"
									class="block text-gray-600 font-medium hover:text-green-500 dark:text-gray-400"
									href={vaultConfig.platform.swapperURL}
									>{$_('actions.get')}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP</a>
								<a
									target="_blank"
									class="block text-gray-600 font-medium  dark:text-gray-400"
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
