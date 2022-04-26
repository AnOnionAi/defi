<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { getTokenAllowance } from '$lib/utils/erc20';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import ApproveMush from '$lib/components/Cards/ApproveMush.svelte';
	import { Token } from '$lib/types/types';
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
	import { timeLeftForLaunch } from '$lib/stores/launchDate';
	import ComingSoon from '$lib/components/Cards/ComingSoon.svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';
	const { addNotification } = getNotificationsContext();

	let userAccount: string;
	let userMushAllowance: BigNumber = ethers.constants.Zero;
	let approved = false;
	let finishedApprovalFetch = false;

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

	const handleApproval = async () => {
		try {
			const tx = await approveToken(
				getContractAddress(Token.MUSHTOKEN),
				getContractAddress(Token.VAULTCHEF)
			);
			addNotification(transactionSend);
			await tx.wait();
			approved = true;
			addNotification(transactionCompleted);
		} catch (e) {
			addNotification(transactionDeniedByTheUser);
		}
	};
</script>

<section class="flex h-full flex-col">
	{#if $timeLeftForLaunch.daysLeft >= 0}
		<ComingSoon />
	{:else}
		<DisabledFeature />
		<!-- <PageHeader text={$_('headers.dividends.text')} />
		<div class="flex-1">
			<div
				class="dividends-wrapper {$darkMode
					? 'mushHouseBackground'
					: 'smallMushBackground'}">
				<div
					class="dividends my-7 mx-2 h-[680px]  w-[380px] rounded-2xl p-5 md:w-[432px]  lg:w-[460px] {!$darkMode &&
						'drop-shadow-2xl'} bg-white transition  duration-500 dark:bg-neutral-800">
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
		</div> -->
	{/if}
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
		background-position: 90% 70%;
		background-repeat: no-repeat;
	}

	.smallMushBackground {
		background-size: 100px;
		background-image: url('/theme/dividends/cuteMush.webp');
	}

	.mushHouseBackground {
		background-size: 400px;
		background-image: url('/theme/dividends/mushHouse.webp');
	}

	@media only screen and (max-width: 1160px) {
		.dividends-wrapper {
			background-position: 95% 90%;
			background-size: 140px;
		}
	}

	@media only screen and (max-width: 1010px) {
		.dividends-wrapper {
			background-position: 100% 90%;
			background-size: 100 px;
		}
	}

	@media only screen and (max-width: 800px) {
		.dividends-wrapper {
			background-size: 0px;
		}
	}

	.dividends {
		max-height: 600px;
	}
</style>
