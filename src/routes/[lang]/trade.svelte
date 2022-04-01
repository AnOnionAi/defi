<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { sushiVaults } from '$lib/config/constants/vaults';

	import { getVaultAPYandAPR } from '$lib/utils/getVaultAPY';

	import {
		getLPTokenPrice,
		getParsedLPTokenReserves
	} from '$lib/utils/lpTokenUtils';
	import { getSushiPerBlock } from '$lib/utils/sushiSwapUtils';

	import { onMount } from 'svelte';

	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	const addErrorNotification = () => {
		addNotification({
			position: 'top-right',
			text: 'Error Notification',
			type: 'error'
		});
	};

	const addSuccessNotification = () => {
		addNotification({
			position: 'top-right',
			text: 'Error Notification',
			type: 'success'
		});
	};

	const addWarningNotification = () => {
		addNotification({
			position: 'top-right',
			text: 'Warning Notification',
			type: 'warning'
		});
	};

	onMount(async () => {
		console.log(await getVaultAPYandAPR(sushiVaults[0]));
	});
</script>

<section>
	<br />
	<h1 class="text-dark-200 text-center text-4xl dark:text-white">Test Page</h1>
	<button
		on:click={addErrorNotification}
		class="rounded-lg bg-black px-4 py-2 text-white">Error Notification</button>
	<button
		on:click={addSuccessNotification}
		class="rounded-lg bg-black px-4 py-2 text-white"
		>Success Notification</button>
	<button
		on:click={addWarningNotification}
		class="rounded-lg bg-black px-4 py-2 text-white"
		>Success Notification</button>
</section>
