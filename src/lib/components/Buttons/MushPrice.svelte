<script lang="ts">
	import {
		fetchNativeTokenPrice,
		tokenPrice
	} from '$lib/stores/NativeTokenPrice';
	fetchNativeTokenPrice();
	const swapperURL = `https://app.sushi.com/swap?inputCurrency=${'0x2791bca1f2de4661ed88a30c99a7a9449aa84174'}&outputCurrency=${'0x627F699300A9D693FBB84F9Be0118D17A1387D4e'}`;
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
