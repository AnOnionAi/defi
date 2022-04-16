<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import { BLOCK_TIMER } from '$lib/config';
	import { pools } from '$lib/config/constants/pools';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { fetchPools } from '$lib/utils/fetchPools';
	import fetchPoolUser from '$lib/utils/fetchPoolUser';
	import { useQuery } from '@sveltestack/svelte-query';

	const poolQueryResult = useQuery('poolInfo', async () => await fetchPools(), {
		refetchOnMount: false,
		refetchInterval: 2500,
		refetchIntervalInBackground: true
	});

	fetchPoolUser('0x42D73a757E63a18a70C8a86564e405dEca81967c');
	/* const poolUserQueryResult = useQuery(
		'poolUserInfo',
		async () => await fetchPoolUser($accounts?.[0])
	); */
</script>

<section>
	<div
		class="mx-auto flex max-w-7xl flex-row flex-wrap justify-center gap-y-9 gap-x-6 p-2 text-center ">
		{#if $poolQueryResult.data}
			{#each $poolQueryResult.data as pool, i}
				<PoolCard stats={pool} info={pools[i]} userAcc={$accounts?.[0]} />
			{/each}
		{/if}
		{#if $poolQueryResult.isLoading}
			<h1 class="text-center">Loading...</h1>
		{/if}
	</div>
</section>
