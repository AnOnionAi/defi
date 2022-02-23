<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
</script>

<script lang="ts">
	import { farms } from '$lib/config/constants/farms';
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';

	let backgroundImage;

	darkMode.subscribe((darkEnabled) => {
		darkEnabled
			? (backgroundImage = '/theme/farms/niceDarkMush.svg')
			: (backgroundImage = '/theme/farms/niceMush.svg');
	});
</script>

<section class="farms" style="background:url({backgroundImage});">
	<br />
	<h1 class=" dark:text-white text-5xl text-center tracking-wide">
		{$_('headers.farms.text')}
	</h1>
	<div class="w-23/24  mx-auto rounded-xl max-w-7xl ">
		<div class="flex flex-row justify-center gap-6 p-8 text-center flex-wrap   rounded-xl">
			<!--Start Farms-->
			{#each farms as farm}
				<PoolCard info={farm} isFarm={true} />
			{/each}
		</div>
	</div>
</section>
<div />

<style>
	.farms {
		background-repeat: no-repeat;
		min-height: 85vh;
	}
</style>
