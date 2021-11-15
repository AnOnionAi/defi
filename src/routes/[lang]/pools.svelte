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
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import MushCard from '$lib/components/Cards/MushPool.svelte';
	import { pools } from '$lib/config/constants/pools';
	import Modal from 'svelte-simple-modal';
import { darkMode } from '$lib/stores/dark';
	export let lang;
</script>

<Modal>
	<section class="background {$darkMode && 'background__dark'}">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">{$_("headers.pools.text")}</h1>
		<div class="mt-5 space-y-4">
			<div class="flex flex-row justify-center gap-y-9 gap-x-4 p-8 text-center flex-wrap max-w-6xl mx-auto">
				
				{#each pools as pool  }
				<PoolCard  info={pool} />
				{/each}
			</div>
		</div>
	</section>
</Modal>


<style>

	.background{
		background-image: url("/backgrounds/poolsBackgroundLite.png");
	}
	.background__dark{
		background-image: url("/backgrounds/poolsDarkBackground.png");
	}
</style>