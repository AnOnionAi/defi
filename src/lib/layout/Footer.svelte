<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const PAGES = [
		{
			route: `/${$page.params.lang}/about`,
			title: $_('pages.about.title')
		},
		{
			route: `/${$page.params.lang}/contact`,
			title: $_('pages.contact.title')
		},
		{
			route: `/${$page.params.lang}/audits`,
			title: $_('pages.audits.title')
		},
		{
			route: `/${$page.params.lang}/trade`,
			title: $_('pages.trade.title')
		}
	];
</script>

<footer class="z-20" class:dark={$darkMode}>
	<div class="dark:text-gray-300 dark:bg-blue-gray-800 w-full p-3 text-center text-xl">
		<div class="ml-auto mr-auto flex justify-center text-center">
			{#each PAGES as page}
				<a href={page.route}>
					<span class="font-normal p-1">
						{page.title}
					</span>
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.footer_home {
		color: white !important;
	}
</style>
