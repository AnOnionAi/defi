<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { addTokenToMetamaskWallet } from '$lib/utils/metamaskCalls';
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

	let userAccount: string;
	let userMushBalance: number;
	let userFiatBalance: number;

	$: userAccount = $accounts?.[0];

	$: if (userAccount && $tokenPrice) {
		console.log('ENTRTEEE', userAccount, $tokenPrice);
		fetchBalances(userAccount, $tokenPrice).then((response) => {
			[userMushBalance, userFiatBalance] = response;
		});
	}

	const fetchBalances = async (
		userAccount: string,
		tokenUsdPrice: number
	): Promise<Array<number>> => {
		const balanceResponse = await getTokenBalance(getContractAddress(Token.MUSHTOKEN), userAccount);
		const parsedMushBalance = parseFloat(ethers.utils.formatEther(balanceResponse));
		const fiatBalance = parsedMushBalance * tokenUsdPrice;
		return [parsedMushBalance, fiatBalance];
	};
</script>

<div
	class="bg-white dark:bg-dark-900 rounded-2xl p-5 h-55 shadow-xl dark:text-white dark:shadow-none flex flex-col justify-between select-none"
>
	<p class="text-3xl pl-3 text-lg text-dark-200 dark:text-white tracking-wide">
		{$_('walletStatus.wallet')}
	</p>
	<div class="flex justify-center items-center flex-col gap-3">
		{#if !$accounts}
			<p class="text-3xl font-medium text-dark-500 dark:text-white">---- MUSH</p>
		{:else if userMushBalance != undefined}
			<p class="text-3xl font-medium text-dark-500 dark:text-white">{userMushBalance} MUSH</p>
		{:else}
			<LoadingSkeleton styles={{ height: '35px', width: '120px' }} />
		{/if}

		{#if $accounts}
			{#if userMushBalance != undefined}
				<p class="text-lg font-medium text-gray-600 dark:text-gray-400 -mt-2 ">
					~ ${userFiatBalance}
				</p>
			{:else}
				<LoadingSkeleton styles={{ height: '20px', width: '100px' }} />
			{/if}
		{/if}
	</div>

	<button
		on:click={addTokenToMetamaskWallet}
		class="flex items-center justify-center  border-2 border-green-400 rounded-xl hover:text-white hover:bg-green-400 px-3 py-2 self-center"
	>
		<p class="mr-1">{$_('actions.add')} MUSH</p>
		<img src="/metamask.svg" class="h-5" alt="Metamask Icon" />
	</button>
</div>
