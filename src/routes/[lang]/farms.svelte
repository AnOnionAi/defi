<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import { farms } from '$lib/config/constants/farms';
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import PageHeader from '$lib/components/Text/PageHeader.svelte';

	/* 	let backgroundImage;

	darkMode.subscribe((darkEnabled) => {
		darkEnabled
			? (backgroundImage = '/theme/farms/gradientMushroom.png')
			: (backgroundImage = '/theme/farms/gradientMushroom.');
	}); */
</script>

<section class=" farms flex h-full flex-col pb-5">
	<PageHeader text={$_('headers.farms.text')} />
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
		background-image: url('/theme/farms/gradientMushroom.png');
		background-repeat: no-repeat;
		background-position: right bottom;
	}

	@media only screen and (max-width: 1010px) {
		.farms {
			background-size: 200px;
		}
	}

	@media only screen and (max-width: 1010px) {
		.farms {
			background-size: 200px;
		}
	}

	@media only screen and (max-width: 715px) {
		.farms {
			background-size: 0px;
		}
	}
</style>
