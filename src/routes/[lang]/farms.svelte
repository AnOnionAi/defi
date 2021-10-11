<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	import sushi from '/static/sushi.png';
	import dyfn from '/static/dfyn.svg';
	import quick from '/static/quiswa.png';

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
</script>

<Modal>
	<section>
		<br />
		<h1 class="text-dark-200 dark:text-white text-4xl">F A R M S</h1>
		<section class:dark={$darkMode} class="mt-3">
			<section class="mt-5 space-y-4">
				<div class="w-full flex">
					<div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 text-center">
						<!--Start Farms-->
						<PoolCard cardImage={quick} info={farms[0]} />
						<PoolCard cardImage={sushi} info={farms[1]} />
						<PoolCard cardImage={dyfn} info={farms[2]} />
						<!--End Farms-->
					</div>
				</div>
			</section>
		</section>
	</section>
</Modal>

<style>
	.dark .active {
		--tw-bg-opacity: 1;
		background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
		--tw-text-opacity: 1;
		color: rgba(0, 0, 0, var(--tw-text-opacity));
	}
	.active {
		--tw-bg-opacity: 1;
		background-color: rgba(217, 119, 6, var(--tw-bg-opacity));
		--tw-text-opacity: 1;
		color: rgba(255, 255, 255, var(--tw-text-opacity));
	}
</style>
