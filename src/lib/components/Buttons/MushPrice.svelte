<script lang="ts">
	import {
		fetchNativeTokenPrice,
		tokenPrice
	} from '$lib/stores/NativeTokenPrice';
	import { Token } from '$lib/types/types';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	fetchNativeTokenPrice();
	const swapperURL = `https://app.sushi.com/swap?inputCurrency=${getContractAddress(
		Token.USDC
	)}&outputCurrency=${getContractAddress(Token.MUSHTOKEN)}`;
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
			class="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
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
