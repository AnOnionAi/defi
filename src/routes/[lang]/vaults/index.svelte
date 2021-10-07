<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	export async function load({ page }) {
		const { lang } = page.params;
		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">

	import Fa from 'svelte-fa/src/fa.svelte';
	import wbtc from '/static/vaultTokensIcons/wbtc.svg'
	import usdc from '/static/vaultTokensIcons/usdc.svg'
	import wmatic from '/static/vaultTokensIcons/wmatic.svg'
	import aave from '/static/vaultTokensIcons/aave.svg'
	import  axs from '/static/vaultTokensIcons/axs.svg'
	import  dai from '/static/vaultTokensIcons/dai.svg'
	import  grt from '/static/vaultTokensIcons/grt.svg'
	import  ibbtc from '/static/vaultTokensIcons/ibbtc.svg'
	import  link from '/static/vaultTokensIcons/link.svg'
	import  mana from '/static/vaultTokensIcons/mana.svg'
	import  mvi from '/static/vaultTokensIcons/mvi.svg'
	import  weth from '/static/vaultTokensIcons/weth.svg'
	import  usdt from '/static/vaultTokensIcons/usdt.svg'
	import sol from '/static/vaultTokensIcons/sol.svg'
	import quick from '/static/vaultTokensIcons/quick.svg'
	import cntr from '/static/vaultTokensIcons/cntr.svg'

	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
	import BottomList from '$lib/components/Cards/BottomList.svelte';
	import env from '$lib/env';
	import addresses from '$lib/config/constants/addresses.json';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import Notifications from 'svelte-notifications';

</script>
<section class="background-vaults">
		
		<h1 class="text-dark-200 dark:text-white text-4xl">V A U L T S</h1>
		
			<Notifications>
				<div class="mt-10">
				<VaultAccordeon tkn0Img={wmatic} tkn1Img={usdc} vaultConfig={quickVaults[2]} hasRoundedBorder=true>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={weth} tkn1Img={wmatic} vaultConfig={quickVaults[3]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={weth} tkn1Img={usdt} vaultConfig={quickVaults[4]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={wmatic} tkn1Img={sol} vaultConfig={quickVaults[5]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={dai} tkn1Img={usdc} vaultConfig={quickVaults[6]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={wmatic} tkn1Img={usdt} vaultConfig={quickVaults[7]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={wmatic} tkn1Img={quick} vaultConfig={quickVaults[8]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={link} tkn1Img={weth} vaultConfig={quickVaults[9]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={quick} tkn1Img={cntr} vaultConfig={quickVaults[10]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={dai} tkn1Img={usdt} vaultConfig={quickVaults[11]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<VaultAccordeon tkn0Img={usdc} tkn1Img={quick} vaultConfig={quickVaults[12]}>
					<div class="flex justify-center  items-center border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6">QuickSwap</div>	
				</VaultAccordeon>

				<BottomList/>


			</div>

			</Notifications>
		</section>	

<style>

	.background-vaults{
		background-color: #f9f8f9;
	}
</style>
