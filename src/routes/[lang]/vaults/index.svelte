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
	import wbtc from '/static/wbtc.png';
	import eth from '/static/eth.png';
	import usdc from '/static/usdc.png';
	import matic from '/static/matic.png';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
</script>

<section>
	<h1 class="text-dark-200 dark:text-white text-4xl">V A U L T S</h1>
	<div class="w-11/12 mx-auto">
		<VaultAccordeon
			tkn0Img={eth}
			tkn1Img={usdc}
			vaultConfig={{
				pid: 0,
				depositFee: 0,
				platform: { name: 'QuickSwap', brandColor: 'blue' },
				pair: {
					token0Name: 'Ether',
					token1Name: 'USDC',
					token0quote: 'ETH',
					token1quote: 'USDC',
					pairContract: '0x76b98C24E0b0D544D6F035Bb441470b06fB7c9c9',
					token0Contract: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
					token1Contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
					pairURL: 'lol'
				}
			}}
		/>

		<VaultAccordeon
			tkn0Img={eth}
			tkn1Img={usdc}
			vaultConfig={{
				pid: 0,
				depositFee: 0,
				platform: { name: 'SushiSwap', brandColor: 'pink' },
				pair: {
					token0Name: 'Ether',
					token1Name: 'USDC',
					token0quote: 'ETH',
					token1quote: 'USDC',
					pairContract: '0x76b98C24E0b0D544D6F035Bb441470b06fB7c9c9',
					token0Contract: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
					token1Contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
					pairURL: 'lol'
				}
			}}
		/>

		<VaultAccordeon
			tkn0Img={usdc}
			tkn1Img={matic}
			vaultConfig={{
				pid: 0,
				depositFee: 0,
				platform: { name: 'ApeSwap', brandColor: 'yellow' },
				pair: {
					token0Name: 'Ether',
					token1Name: 'USDC',
					token0quote: 'ETH',
					token1quote: 'USDC',
					pairContract: '0x76b98C24E0b0D544D6F035Bb441470b06fB7c9c9',
					token0Contract: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
					token1Contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
					pairURL: 'lol'
				}
			}}
		/>
	</div>
</section>

<style>
</style>
