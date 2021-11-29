<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	export async function load({ page }) {
		const { lang } = page.params;
		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">
	import { farms } from '$lib/config/constants/farms';
	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import Modal from 'svelte-simple-modal';
	import 'virtual:windi.css';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.update( v => v = false );
</script>

<Modal>
	<section class="">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">
			{$_('headers.farms.text')}
		</h1>
		<section class="">
			<section class="mt-5 background_lite {$darkMode && 'background__dark'} py-10">
				<div class="w-23/24  mx-auto rounded-xl max-w-7xl ">
					<div class="flex flex-row justify-center gap-6 p-12 text-center flex-wrap   rounded-xl">
						<!--Start Farms-->
						{#each farms as farm}
							<PoolCard info={farm} />
						{/each}
					</div>
				</div>
			</section>
		</section>
	</section>
	<div class="red w-8 h-8" />
</Modal>

<style>
	.background_lite {
		background-image: url('/backgrounds/niceMush.svg');
		background-position: 50% 50%;

		background-repeat: no-repeat;
	}

	.background__dark {
		background-image: url('/backgrounds/niceDarkMush.svg');
		background-position: 45% 100%;
		background-repeat: no-repeat;
	}
</style>
