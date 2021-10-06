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
	import eth from '/static/wethIcon.svg';
	import usdc from '/static/usdc.png';
	import matic from '/static/matic.png';
	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
	import env from '$lib/env';
	import addresses from '$lib/config/constants/addresses.json';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import Notifications from 'svelte-notifications';

</script>
<section>
		
		<h1 class="text-dark-200 dark:text-white text-4xl">V A U L T S</h1>
		<div class="w-11/12 mx-auto">
			<Notifications>
			<!-- <VaultAccordeon
				tkn0Img={eth}
				tkn1Img={usdc}
				vaultConfig={quickVaults[0]}
				/>
				<VaultAccordeon
				tkn0Img={eth}
				tkn1Img={matic}
				vaultConfig={quickVaults[1]}
				/>
				<VaultAccordeon
				tkn0Img={eth}
				tkn1Img={usdc}
				vaultConfig={sushiVaults[0]}
				/>
				<VaultAccordeon
				tkn0Img={eth}
				tkn1Img={matic}
				vaultConfig={sushiVaults[1]}
				/> -->
				
				<VaultAccordeon tkn0Img={matic} tkn1Img={usdc} vaultConfig={quickVaults[2]} />
			</Notifications>
			</div>
		</section>	

<style>
</style>
