<script context="module" lang="ts">
	export const prerender = false;

	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
import { onMount } from 'svelte';
import { getErc20TokenUsdPrice, getLpTokenUsdWorth, getMaticUsdPrice } from '$lib/utils/tokensPrice';
import { Token } from '$lib/ts/types';
import { getDragonQuickTokenPrice, getQuickswapSingleStakingAPY, getQuickwapApyFromPairAddress, getSushiSwapApyFromVaultChefPoolId } from '$lib/utils/apyVaultsUtils';
import { getCirculatingSupply, getReservesFromPair } from '$lib/utils/lpTokenUtils';
import { ethers } from 'ethers';
import { getQuickSwapStakingContractAddress } from '$lib/utils/contractHelpers';
import { getQuickswapLPTokenPrice, getTokenPriceUSDQuickSwap} from '$lib/utils/quickSwapDexHelpers';
</script>

<script lang="ts">
	onMount(async()=>{
		 const genesis = await getQuickswapSingleStakingAPY("0x853ee4b2a13f8a742d64c8f088be7ba2131f670d","")
		console.log(genesis) 
		/* console.log(await getQuickSwapStakingContractAddress("0x853ee4b2a13f8a742d64c8f088be7ba2131f670d")) */
		/* await getDragonQuickTokenPrice() *//* 
		console.log(await getQuickswapLPTokenPrice("0xadbf1854e5883eb8aa7baf50705338739e558e5b"))
		 */
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