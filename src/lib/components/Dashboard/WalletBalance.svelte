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

	let userMushAmount: number;
	let userAccount: string;
	let mushToFiat: number | string;

	onMount(async () => {
		const unsubscriber = accounts.subscribe(async (accounts) => {
			if (accounts) {
				userAccount = accounts[0];
				const amount: BigNumber = await getTokenBalance(
					getContractAddress(Token.MUSHTOKEN),
					userAccount
				);
				const floatAmount = parseFloat(ethers.utils.formatEther(amount));
				userMushAmount = floatAmount.toFixed(4);
				const fiatAmount = (floatAmount * $tokenPrice).toFixed(2);
				mushToFiat = fiatAmount;
			}
		});
	});
</script>

<div
	class="bg-white dark:bg-dark-800 rounded-lg px-2 py-5 h-60 border border-gray-300 dark:border-green-500 shadow-lg dark:text-white"
>
	<p class="font-light text-3xl pl-3 text-gray-600  text-lg dark:text-white">
		{$_('walletStatus.wallet')}
	</p>
	<div class="flex h-44 justify-center items-center flex-col gap-3">
		<p class="font-semibold text-3xl">
			{#if userMushAmount}
				{userMushAmount} MUSH
			{:else}
				-------
			{/if}
		</p>
		<p class="font-bold text-xl text-green-600">
			{#if mushToFiat}
				~ ${mushToFiat} USD
			{:else}
				-------
			{/if}
		</p>
		<button
			on:click={addTokenToMetamaskWallet}
			class="flex items-center font-medium border border-green-500 rounded-lg p-2  text-lg  hover:text-white hover:bg-green-400"
		>
			<p class="pr-1">{$_('actions.add')} MUSH</p>
			<img src="/metamask.svg" class="h-7" alt="Metamask Icon" />
		</button>
	</div>
</div>
