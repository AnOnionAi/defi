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
	import PageHeader from '$lib/components/Text/PageHeader.svelte';
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
			addNotification(transactionSend);

			const tx = await approveToken(
				getContractAddress(Token.MUSHTOKEN),
				getContractAddress(Token.VAULTCHEF)
			);
			await tx.wait();
			approved = true;
			addNotification(transactionCompleted);
		} catch (e) {
			addNotification(transactionDeniedByTheUser);
		}
	};
</script>

<section class="flex h-full flex-col">
	<PageHeader text={$_('headers.dividends.text')} />
	<div class="flex-1">
		<div
			style="background-image:url({backgroundImage});"
			class="dividends-wrapper">
			<div
				class="dividends my-7 mx-2 h-[680px]  w-[380px] rounded-2xl p-5 md:w-[432px]  lg:w-[460px] {!$darkMode &&
					'shadow-xl'} bg-white transition  duration-500 dark:bg-neutral-800">
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
		background-size: 240px;
		background-position: 90% 85%;
		background-repeat: no-repeat;
	}

	@media only screen and (max-width: 1160px) {
		.dividends-wrapper {
			background-position: 95% 90%;
			background-size: 220px;
		}
	}

	@media only screen and (max-width: 1010px) {
		.dividends-wrapper {
			background-position: 100% 90%;
			background-size: 220px;
		}
	}

	@media only screen and (max-width: 1010px) {
		.dividends-wrapper {
			background-size: 0px;
		}
	}

	.dividends {
		max-height: 600px;
	}
</style>
