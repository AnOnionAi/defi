<script lang="ts">
	import type { BigNumber } from 'ethers';
	import { getSigner } from '$lib/utils/web3Utils';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { famContract } from '$lib/utils/contracts';
	import { METAPIXEL_ADDRESS } from '$lib/config';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import Approve from '$lib/components/MetapixelUI/Approve.svelte';
	import { ethers } from 'ethers/src.ts';
	import {
		spawnErrorNotification,
		spawnSuccessNotification
	} from '$lib/utils/spawnNotifications';
	import { getNotificationsContext } from 'svelte-notifications';
	import Metapixel from '$lib/components/MetapixelUI/Metapixel.svelte';

	const { addNotification } = getNotificationsContext();
	const development = false;

	$: userAddress = $accounts?.[0];

	$: {
		if (userAddress) {
			checkApproved(userAddress);
		}
	}

	let tokenApproved = false;

	const checkApproved = async (userAddress) => {
		const allowance: BigNumber = await famContract.allowance(
			userAddress,
			METAPIXEL_ADDRESS
		);
		tokenApproved = !allowance.isZero();
	};

	const approveToken = async () => {
		try {
			const approvalTx = await famContract
				.connect(getSigner())
				.approve(METAPIXEL_ADDRESS, ethers.constants.MaxUint256);
			spawnSuccessNotification(addNotification, 'SENT');
			await approvalTx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
			tokenApproved = true;
		} catch (e) {
			spawnErrorNotification(addNotification, e);
		}
	};
</script>

<!-- <DisabledFeature /> -->

{#if !userAddress}
	<div class="flex h-full w-full items-center justify-center">
		<div class="w-1/2 min-w-[320px] max-w-3xl ">
			<Connect />
		</div>
	</div>
{/if}
{#if userAddress && !tokenApproved}
	<Approve onApprove={approveToken} />
{/if}
{#if userAddress && tokenApproved}
	<Metapixel />
{/if}
