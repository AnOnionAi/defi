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
	import { isHomescreen } from '$lib/stores/homescreen';
import { onMount } from 'svelte';

	onMount(()=> {
		console.log($isHomescreen);
		
	})
</script>

<Modal>
	<section class="{$darkMode && 'active '}">
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">{$_("headers.farms.text")}</h1>
		<section class="mt-3">
			<section class="mt-5 space-y-4">
				<div class="w-23/24 {$darkMode && 'dark-background'} lite_background mx-auto rounded-xl">
					<div class="flex flex-row justify-center gap-6 p-12 text-center flex-wrap backdrop-filter backdrop-blur rounded-xl">
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
	section {
		height: 100%;
	}
	.active {
		--tw-bg-opacity: 1;
		--tw-text-opacity: 1;
		color: rgba(255, 255, 255, var(--tw-text-opacity));
	}

	.lite_background{
		background-image: url("/backgrounds/liteMush.jpeg");
		background-size: cover;
	}

	.dark-background{
		background-image: url("/backgrounds/darkMush.jpeg");
		background-size: cover;
	}
</style>