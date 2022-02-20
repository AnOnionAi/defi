<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		addTokenToMetamaskWallet,
		isMetaMaskInstalled
	} from '$lib/utils/metamaskCalls';
	import { getTokenBalance } from '$lib/utils/erc20';
	import { onDestroy, onMount } from 'svelte';
	import { Token } from '$lib/ts/types';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { parseBigNumberToString } from '$lib/utils/balanceParsers';
	import { BigNumber, ethers } from 'ethers';
	import { tokenPrice } from '$lib/stores/NativeTokenPrice';
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';
	import { width } from '@fortawesome/free-solid-svg-icons/faChevronUp';
	import { page } from '$app/stores';
	import { formatComma } from '$lib/utils/formatNumbersByLang';

	import { getContext } from 'svelte';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	const { open } = getContext('simple-modal');

	let userAccount: string;
	let userMushBalance: number;
	let userFiatBalance: number;

	$: userAccount = $accounts?.[0];

	$: if (userAccount && $tokenPrice) {
		fetchBalances(userAccount, $tokenPrice).then((response) => {
			[userMushBalance, userFiatBalance] = response;
		});
	}

	const fetchBalances = async (
		userAccount: string,
		tokenUsdPrice: number
	): Promise<Array<number>> => {
		const balanceResponse = await getTokenBalance(
			getContractAddress(Token.MUSHTOKEN),
			userAccount
		);
		const parsedMushBalance = parseFloat(
			ethers.utils.formatEther(balanceResponse)
		);
		const fiatBalance = parsedMushBalance * tokenUsdPrice;
		return [parsedMushBalance, fiatBalance];
	};

	const openModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};
</script>

<div
	class="dark:bg-dark-900 h-55 flex select-none flex-col justify-between rounded-2xl bg-white p-5 shadow-xl transition duration-300 dark:text-white dark:shadow-none">
	<p class="text-dark-200 pl-3 text-3xl text-lg tracking-wide dark:text-white">
		{$_('walletStatus.wallet')}
	</p>
	<div class="flex flex-col items-center justify-center gap-3">
		{#if !$accounts}
			<p class="text-dark-500 text-3xl font-medium dark:text-white">
				---- MUSH
			</p>
		{:else if userMushBalance != undefined}
			<p class="text-3xl font-medium text-dark-500 dark:text-white">
				{formatComma(userMushBalance, $page.params.lang)} MUSH
			</p>
		{:else}
			<LoadingSkeleton styles={{ height: '35px', width: '120px' }} />
		{/if}

		{#if $accounts}
			{#if userMushBalance != undefined}
				<p class="-mt-2 text-lg font-medium text-gray-600 dark:text-gray-400 ">
					~ ${formatComma(userFiatBalance, $page.params.lang)}
				</p>
			{:else}
				<LoadingSkeleton styles={{ height: '20px', width: '100px' }} />
			{/if}
		{/if}
	</div>

	<button
		on:click={isMetaMaskInstalled() ? addTokenToMetamaskWallet : openModal}
		on:click={addTokenToMetamaskWallet}
		class="flex items-center justify-center  self-center rounded-xl border-2 border-green-400 px-3 py-2 hover:bg-green-400 hover:text-white">
		<p class="mr-1">{$_('actions.add')} MUSH</p>
		<img src="/metamask.svg" class="h-5" alt="Metamask Icon" />
	</button>
</div>
