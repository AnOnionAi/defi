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
	import doge from '/static/doge.png';
	import mxnc from '/static/mxnc.png';
	import sushi from '/static/sushi.png';
	import fish from '/static/fish.svg';
	import dyfn from '/static/dfyn.svg';
	import quick from '/static/quiswa.png';
	import matic from '/static/matic.png';
	import weth from '/static/weth.png';
	import wbtc from '/static/wbtc.png';
	import usdt from '/static/usdt.png';
	import usdc from '/static/usdc.png';
	import mushRound from '/static/mushRound.png';
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import MushCard from '$lib/components/Cards/MushPool.svelte';
	import { pools } from '$lib/config/constants/pools';
	import Modal from 'svelte-simple-modal';
	export let lang;
</script>

<Modal>
	<section>
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl">P O O L S</h1>
		<div class="mt-5 space-y-4">
			<div class="flex flex-row justify-center gap-y-9 gap-x-4 p-8 text-center flex-wrap">
				{#each pools as pool  }
				<PoolCard  info={pool} />
				{/each}
			</div>
		</div>
	</section>
</Modal>
