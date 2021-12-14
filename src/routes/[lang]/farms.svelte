<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	
	
</script>

<script lang="ts">
	import { farms } from '$lib/config/constants/farms';
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import Modal from 'svelte-simple-modal';
	import 'virtual:windi.css';
	import { getProvider,getRPCSigner ,Provider} from '$lib/utils/web3Helpers';
	import {  ethers } from 'ethers';
	import type {BigNumber} from "ethers"
	import { getContractAddress } from '$lib/utils/addressHelpers';	
	import { Token } from '$lib/ts/types';
	import MasterChefABI from "$lib/config/abi/MasterChef.json"
	import { ethersToBigNumber } from '$lib/utils/bigNumber';
	import { getPoolWeight } from '$lib/utils/masterc';
	import { getPriceOfMushPair } from '$lib/utils/lpTokenUtils';
	import { onMount } from 'svelte';
	import { getPoolTokenPriceUSD } from '$lib/utils/coinGecko';
	
	let backgroundImage;

	darkMode.subscribe((darkEnabled)=>{
		darkEnabled
		 ? (backgroundImage = "/backgrounds/niceDarkMush.svg")
		 : (backgroundImage = "/backgrounds/niceMush.svg")
	})
</script>

<Modal>
	<section class="farms" style="background:url({backgroundImage});">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">
			{$_('headers.farms.text')}
		</h1>
				<div class="w-23/24  mx-auto rounded-xl max-w-7xl ">
					<div class="flex flex-row justify-center gap-6 p-8 text-center flex-wrap   rounded-xl">
						<!--Start Farms-->
						{#each farms as farm}
							<PoolCard info={farm}  isFarm={true} />
						{/each}
					</div>
				</div>
	</section>
	<div/>
</Modal>

<style>
	.farms{
		background-repeat:no-repeat;
		min-height: 85vh;
	}
</style>
