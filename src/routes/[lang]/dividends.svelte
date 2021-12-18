<script context="module" lang="ts">
	export const prerender = false;
	import { darkMode } from '$lib/stores/dark';

	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { getTokenAllowance, isNotZero } from '$lib/utils/erc20';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import ApproveMush from '$lib/components/Cards/ApproveMush.svelte';
	import { Token } from '$lib/ts/types';
	import DividendCard from '$lib/components/Cards/DividendCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import { fade } from 'svelte/transition';
	import type { Unsubscriber } from 'svelte/store';
	import type { BigNumber } from 'ethers';
	import { approveToken } from '$lib/utils/erc20';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.update((v) => (v = false));

	let userAccount: string;
	let unsubscribe: Unsubscriber;
	let userMushAllowance: BigNumber;
	let approved: boolean = false;
	let finishedApprovalFetch: boolean = false;

	let backgroundImage;

	darkMode.subscribe((darkEnabled) => {
		darkEnabled
			? (backgroundImage = '/backgrounds/mushHouse.svg')
			: (backgroundImage = '/backgrounds/cuteMush.svg');
	});

	unsubscribe = accounts.subscribe((arrayAccs) => {
		if (arrayAccs) {
			userAccount = arrayAccs[0];

			getTokenAllowance(
				getContractAddress(Token.MUSHTOKEN),
				getContractAddress(Token.VAULTCHEF),
				userAccount
			).then((allowance) => {
				userMushAllowance = allowance;
				approved = isNotZero(allowance);
				finishedApprovalFetch = true;
			});
		}
	});

	onDestroy(unsubscribe);

	async function handleApproval() {
		try {
			const tx = await approveToken(
				getContractAddress(Token.MUSHTOKEN),
				getContractAddress(Token.VAULTCHEF)
			);
			await tx.wait();
			approved = true;
		} catch (e) {
			console.log(e);
		}
	}
</script>

<br />
<h1 class="tracking-widest  text-4xl dark:text-white">{$_('headers.dividends.text')}</h1>
<div class="my-6">
	<div style="background-image:url({backgroundImage});" class="dividends-wrapper">
		<div
			class="h-6/6 dividends  w-95/100 max-w-lg p-5 	dark:border-2 rounded-2xl shadow-xl bg-white dark:bg-dark-900 dark:border-green-500 "
		>
			{#if approved}
				<div in:fade={{ duration: 1000 }} class="h-full">
					<DividendCard />
				</div>
			{:else if $accounts && finishedApprovalFetch}
				<ApproveMush onApproval={handleApproval} />
			{:else if !$accounts}
				<Connect />
			{/if}
		</div>
	</div>
</div>

<style>
	.dividends-wrapper {
		width: 100%;
		height: 82vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: 350px;
		background-position: 85% 75%;
		background-repeat: no-repeat;
	}

	.dividends {
		max-height: 600px;
	}
</style>
