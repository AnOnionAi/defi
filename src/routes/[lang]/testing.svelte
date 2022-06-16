<script lang="ts">
	import fetchMasterChefPool from '$lib/utils/fetchPool';
	import fetchPoolUserBalance from '$lib/utils/fetchPoolUserBalance';
	import { onMount } from 'svelte';

	onMount(async () => {
		/* 	const response = await fetchMasterChefPool(
			1,
			'0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
		);
		console.log(response); */

		const bar = await fetchPoolUserBalance(
			1,
			'0x42D73a757E63a18a70C8a86564e405dEca81967c',
			'0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
		);
		console.log(bar);
	});
</script>

<div class="text-xl">Hello world</div>
