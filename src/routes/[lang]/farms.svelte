<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
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
	<h1 class=" text-center text-5xl tracking-wide dark:text-white">
		{$_('headers.farms.text')}
	</h1>
	<div class="w-23/24  mx-auto max-w-7xl rounded-xl ">
		<div
			class="flex flex-row flex-wrap justify-center gap-6 rounded-xl p-8   text-center">
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
