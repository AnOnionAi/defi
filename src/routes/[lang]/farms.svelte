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
	console.log(farms);

	import PoolCard from '$lib/components/Cards/PoolCard.svelte';
	import Modal from 'svelte-simple-modal';
	import 'virtual:windi.css';
</script>

<Modal>
	<section class="background_pattern {$darkMode && 'darkbg_pattern'}">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">{$_("headers.farms.text")}</h1>
		<section class="mt-3">
			<section class="mt-5 space-y-4">
				<div class="w-23/24 {$darkMode && ''}  mx-auto rounded-xl">
					<div class="flex flex-row justify-center gap-6 p-12 text-center flex-wrap   rounded-xl">
						<!--Start Farms-->
						{#each farms as farm}
							<PoolCard  info={farm} />
						{/each}
					</div>
				</div>
			</section>
		</section>
	</section>
	<div class="red w-8 h-8" />
</Modal>

<style>
	.background_pattern{
		background-image: url("/backgrounds/transparentBg.png");
	}

	.darkbg_pattern{
		background-image: url("/backgrounds/transparentDarkBg.png");
	}
</style>