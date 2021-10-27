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
	import wbtc from '/static/vaultTokensIcons/wbtc.svg';
	import usdc from '/static/vaultTokensIcons/usdc.svg';
	import wmatic from '/static/vaultTokensIcons/wmatic.svg';
	import aave from '/static/vaultTokensIcons/aave.svg';
	import avax from '/static/vaultTokensIcons/avax.svg';
	import axs from '/static/vaultTokensIcons/axs.svg';
	import dai from '/static/vaultTokensIcons/dai.svg';
	import grt from '/static/vaultTokensIcons/grt.svg';
	import ibbtc from '/static/vaultTokensIcons/ibbtc.svg';
	import link from '/static/vaultTokensIcons/link.svg';
	import mana from '/static/vaultTokensIcons/mana.svg';
	import mvi from '/static/vaultTokensIcons/mvi.svg';
	import weth from '/static/vaultTokensIcons/weth.svg';
	import usdt from '/static/vaultTokensIcons/usdt.svg';
	import sol from '/static/vaultTokensIcons/sol.svg';
	import quick from '/static/vaultTokensIcons/quick.svg';
	import cntr from '/static/vaultTokensIcons/cntr.svg';
	import crv from '/static/vaultTokensIcons/crv.svg';
	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
	import BottomList from '$lib/components/Cards/BottomList.svelte';
	import env from '$lib/env';
	import addresses from '$lib/config/constants/addresses.json';
	import { getContractAddress } from '$lib/utils/addressHelpers';
</script>

<section class="background-vaults">
	<h1 class="text-dark-200 dark:text-white text-4xl">V A U L T S</h1>

		<div class="mt-10 sideShadow">
			<VaultAccordeon
				tkn0Img={wmatic}
				tkn1Img={usdc}
				vaultConfig={quickVaults[0]}
				hasRoundedBorder={true}
			>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={wmatic} vaultConfig={quickVaults[1]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={usdt} vaultConfig={quickVaults[2]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={wmatic} tkn1Img={sol} vaultConfig={quickVaults[3]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={dai} tkn1Img={usdc} vaultConfig={quickVaults[4]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={wmatic} tkn1Img={usdt} vaultConfig={quickVaults[5]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={wmatic} tkn1Img={quick} vaultConfig={quickVaults[6]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={link} tkn1Img={weth} vaultConfig={quickVaults[7]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={quick} tkn1Img={cntr} vaultConfig={quickVaults[8]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={dai} tkn1Img={usdt} vaultConfig={quickVaults[9]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={usdc} tkn1Img={quick} vaultConfig={quickVaults[10]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-blue-500 text-blue-500  text-xs w-20 h-6"
				>
					QuickSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={usdc} tkn1Img={weth} vaultConfig={sushiVaults[0]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={wbtc} tkn1Img={weth} vaultConfig={sushiVaults[1]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={wmatic} vaultConfig={sushiVaults[2]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={aave} vaultConfig={sushiVaults[3]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={wbtc} tkn1Img={wmatic} vaultConfig={sushiVaults[4]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={link} tkn1Img={weth} vaultConfig={sushiVaults[5]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={grt} tkn1Img={weth} vaultConfig={sushiVaults[6]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={dai} vaultConfig={sushiVaults[7]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={axs} vaultConfig={sushiVaults[8]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={crv} tkn1Img={weth} vaultConfig={sushiVaults[9]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<VaultAccordeon tkn0Img={weth} tkn1Img={avax} vaultConfig={sushiVaults[10]}>
				<div
					class="flex justify-center  items-center font-medium border border-2 tracking-wide rounded-full border-pink-500 text-pink-500  text-xs w-20 h-6"
				>
					SushiSwap
				</div>
			</VaultAccordeon>

			<BottomList />
		</div>
</section>

<style>
	.background-vaults {
		background-color: #f9f8f9;
	}
</style>
