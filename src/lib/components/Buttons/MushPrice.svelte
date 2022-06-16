<script lang="ts">
	import { page } from '$app/stores';
	import {
		fetchNativeTokenPrice,
		tokenPrice
	} from '$lib/stores/NativeTokenPrice';
	import { onMount } from 'svelte';

	const swapperURL = `https://app.sushi.com/${
		$page.params.lang ?? 'en'
	}/trident/swap?tokens=MATIC&tokens=0x93C55AFcBB82594F7446537e4071fc6439E14f2a&chainId=137`;

	onMount(async () => {
		await fetchNativeTokenPrice();
	});
</script>

<a href={swapperURL} target="_blank" class="group flex items-center">
	{#if $tokenPrice}
		<img
			src="/assets/mushCoin.webp"
			alt=""
			class="w-7  transform tracking-tighter transition duration-300 group-hover:scale-125" />
		<p
			class="pl-1 font-bold opacity-80 hover:text-primary-300 hover:opacity-100 dark:text-gray-100 dark:hover:text-analogPurple-300">
			${$tokenPrice.toPrecision(4)}
		</p>
	{:else}
		<div
			class="h-8 w-24 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
	{/if}
</a>

<style>
	div {
		height: 36px;
	}

	img {
		margin-bottom: 2px;
	}
</style>
