<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { getTokenAllowance } from '$lib/utils/erc20';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import ApproveMush from '$lib/components/Cards/ApproveMush.svelte';
	import { Token } from '$lib/ts/types';
	import DividendCard from '$lib/components/Cards/DividendCard.svelte';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import { fade } from 'svelte/transition';
	import { BigNumber, ethers } from 'ethers';
	import { approveToken } from '$lib/utils/erc20';
	import { getNotificationsContext } from 'svelte-notifications';
	import {
		transactionCompleted,
		transactionDeniedByTheUser,
		transactionSend
	} from '$lib/config/constants/notifications';
	import { darkMode } from '$lib/stores/dark';
	const { addNotification } = getNotificationsContext();

	let userAccount: string;
	let userMushAllowance: BigNumber = ethers.constants.Zero;
	let approved = false;
	let finishedApprovalFetch = false;

	let backgroundImage: string;

	$: userAccount = $accounts?.[0];
	$: approved = !userMushAllowance.isZero();

	$: if (userAccount) {
		getTokenAllowance(
			getContractAddress(Token.MUSHTOKEN),
			getContractAddress(Token.VAULTCHEF),
			userAccount
		).then((response) => {
			userMushAllowance = response;
			finishedApprovalFetch = true;
		});
	}

	darkMode.subscribe((darkEnabled) => {
		darkEnabled
			? (backgroundImage = '/theme/dividends/mushHouse.svg')
			: (backgroundImage = '/theme/dividends/cuteMush.svg');
	});

	const handleApproval = async () => {
		try {
			console.log('whats happening');
			addNotification(transactionSend);

			const tx = await approveToken(
				getContractAddress(Token.MUSHTOKEN),
				getContractAddress(Token.VAULTCHEF)
			);
			await tx.wait();
			approved = true;
			addNotification(transactionCompleted);
		} catch (e) {
			console.log(e);
			addNotification(transactionDeniedByTheUser);
		}
	};
</script>

<section class="flex h-full flex-col">
	<h1
		class="mt-[2rem] select-none text-center text-5xl font-[700] tracking-wide dark:text-white ">
		{$_('headers.dividends.text')}
	</h1>
	<div class="flex-1">
		<div
			style="background-image:url({backgroundImage});"
			class="dividends-wrapper">
			<div
				class="dividends h-full  w-full max-w-lg rounded-2xl  p-5 {!$darkMode &&
					'shadow-xl'} bg-white dark:bg-neutral-800 ">
				{#if approved}
					<div in:fade={{ duration: 200 }} class="h-full">
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
</section>

<style>
	section {
		height: 100%;
		width: 100%;
	}
	.dividends-wrapper {
		width: 100%;
		height: 100%;
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

	.test {
		background: -webkit-linear-gradient(#4158d0, #c850c0, #ffcc70);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
