<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import { pools } from '$lib/config/constants/pools';
	import { darkMode } from '$lib/stores/dark';
</script>

<section class="background {$darkMode && 'background__dark'}">
	<br />
	<h1 class="text-center text-5xl tracking-wide dark:text-white">
		{$_('headers.pools.text')}
	</h1>
	<div class="pools mt-5 space-y-4 ">
		<div
			class="mx-auto flex max-w-7xl flex-row flex-wrap justify-center gap-y-9 gap-x-6 p-8 text-center ">
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
		background-image: url('/theme/pools/fantasyMushCity.jpg');
	}
	.background__dark {
		background-image: url('/theme/pools/mushVillageDark.jpeg');
		background-size: cover;
		background-position: center center;
	}
	.pools {
		min-height: 86vh;
	}
</style>
