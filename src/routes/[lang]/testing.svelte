<script lang="ts">
	import { fetchVault, fetchVaultPairTokensPrice } from '$lib/utils/fetchVault';
	import { onMount } from 'svelte';

	onMount(async () => {
		const xd = await fetchVaultPairTokensPrice(
			'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
			'0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
		);
		console.log(xd);
	});
</script>

<div class="text-xl">Hello world</div>
