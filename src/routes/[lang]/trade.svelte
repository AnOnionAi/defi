<script context="module" lang="ts">
	export const prerender = false;

	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
import { onMount } from 'svelte';
import { getErc20TokenUsdPrice, getLpTokenUsdWorth, getMaticUsdPrice } from '$lib/utils/tokensPrice';
import { Token } from '$lib/ts/types';
import { getSushiSwapApyFromVaultChefPoolId } from '$lib/utils/apyVaultsUtils';
import { getCirculatingSupply, getReservesFromPair } from '$lib/utils/lpTokenUtils';
</script>

<script lang="ts">
	onMount(async()=>{
		await getSushiSwapApyFromVaultChefPoolId(3)
	})
</script>

<section>
	<br />
	<h1 class="text-dark-200 dark:text-white text-4xl">T R A D E</h1>
	<div class="h-full" />
</section>



<style>
	section{
		height: 100%;
		min-height: 88vh;
		background-image: url("/backgrounds/darkMush.jpeg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>