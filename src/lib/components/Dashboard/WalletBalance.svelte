<script lang="ts">
	import metaMaskIcon from '/static/metamask.svg';
	import { addTokenToMetamaskWallet } from '$lib/utils/metamaskCalls';
	import { getTokenBalance } from '$lib/utils/erc20';
	import { onMount } from 'svelte';
	import { Token } from '$lib/ts/types';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { parseBigNumberToString } from '$lib/utils/balanceParsers';

	onMount(() => {
		const unsubscriber = accounts.subscribe(async (accounts) => {
			if (accounts) {
				userAccount = accounts[0];
				const amount = await getTokenBalance(getContractAddress(Token.MUSHTOKEN), userAccount);
				const fullNumber: string = parseBigNumberToString(amount);
				const pointIndex = fullNumber.indexOf('.');
				const formattedNumber = fullNumber.substring(0, pointIndex + 4);
				userMushAmount = formattedNumber;
				const factor: number = 0.0001;
				mushToFiat = parseInt(fullNumber) * factor;
				console.log(mushToFiat);
				mushToFiat = mushToFiat.toFixed(2);
			}
		});
	});

	let userMushAmount: string;
	let userAccount: string;
	let mushToFiat: number | string;
</script>

<div
	class="bg-white dark:bg-dark-800 rounded-lg px-2 py-5 h-60 border border-gray-300 dark:border-green-500 shadow-lg dark:text-white"
>
	<p class="font-bold text-3xl pl-3 text-gray-600  text-lg dark:text-white">In your Wallet</p>
	<div class="flex h-44 justify-center items-center flex-col gap-3">
		<p class="font-bold text-4xl">
			{#if userMushAmount}
				{userMushAmount}
			{:else}
				-------
			{/if}
		</p>
		<p class="font-bold text-xl text-green-600">
			{#if mushToFiat}
				~ ${mushToFiat}
			{:else}
				-------
			{/if}
		</p>
		<button
			on:click={addTokenToMetamaskWallet}
			class="flex items-center font-medium border border-green-500 rounded-lg p-2  text-lg "
		>
			<p class="pr-1">Add MUSH</p>
			<img src="/metamask.svg" class="h-7" alt="Metamask Icon" />
		</button>
	</div>
</div>