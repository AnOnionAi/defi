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

<section
	class="farms flex h-full flex-col"
	style="background:url({backgroundImage});">
	<h1
		class="test mt-[2rem] text-center text-5xl font-[700] tracking-wide dark:text-white">
		{$_('headers.farms.text')}
	</h1>
	<div class="w-23/24 mx-auto flex max-w-7xl flex-1 items-center">
		<div
			class="flex flex-row  flex-wrap justify-center gap-6 rounded-xl  text-center">
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
	}
</style>
