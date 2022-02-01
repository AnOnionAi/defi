<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
</script>

<script lang="ts">
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import { pools } from '$lib/config/constants/pools';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
</script>

<section class="background">
	<br />
	<h1 class="dark:text-white text-5xl tracking-widest font-medium">
		{$_('headers.pools.text')}
	</h1>
	<div class="mt-5 space-y-4 pools ">
		<div
			class="flex flex-row justify-center gap-y-9 gap-x-6 p-8 text-center flex-wrap max-w-7xl mx-auto "
		>
			{#each pools as pool}
				<PoolCard info={pool} />
			{/each}
		</div>
	</div>
</section>

<style>
	.background {
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		background-image: url('/backgrounds/fantasyMushCity.jpg');
	}
	.background__dark {
		background-image: url('/backgrounds/redMushPattern.svg');
	}
	.pools {
		min-height: 86vh;
	}
</style>
