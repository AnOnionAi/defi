<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { loading, fetchNativeTokenPrice, tokenPrice } from '$lib/stores/NativeTokenPrice';

	fetchNativeTokenPrice();

	const swapperURL = `https://app.sushi.com/swap?inputCurrency=${'0x2791bca1f2de4661ed88a30c99a7a9449aa84174'}&outputCurrency=${'0x627F699300A9D693FBB84F9Be0118D17A1387D4e'}`;
</script>

<a
	href={swapperURL}
	target="_blank"
	class="dark:text-white  px-2  flex items-center bg-white dark:bg-dark-800 font-light"
>
	<img src="/mushRound.png" alt="Go buy MUSH" class="w-5   mr-1 " />
	{#if $loading}
		<p class="w-16 h-5 bg-gray-300 dark:bg-dark-200 rounded-md animate-pulse" />
	{:else}
		<p>${$tokenPrice.toPrecision(6)}</p>
	{/if}
</a>

<style>
	a {
		height: 38px;
	}
</style>
