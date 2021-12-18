<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
</script>

<script lang="ts">
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import { pools } from '$lib/config/constants/pools';
	import Modal from 'svelte-simple-modal';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.update((v) => (v = false));
</script>

<Modal>
	<section class="">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">
			{$_('headers.pools.text')}
		</h1>
		<div class="mt-5 space-y-4 pools background  {$darkMode && 'background__dark'}">
			<div
				class="flex flex-row justify-center gap-y-9 gap-x-4 p-8 text-center flex-wrap max-w-7xl mx-auto "
			>
				{#each pools as pool}
					<PoolCard info={pool} />
				{/each}
			</div>
		</div>
	</section>
</Modal>

<style>
	.background {
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url('/backgrounds/redBrilliantMushPattern.svg');
	}
	.background__dark {
		background-image: url('/backgrounds/redMushPattern.svg');
	}
	.pools {
		min-height: 86vh;
	}
</style>
