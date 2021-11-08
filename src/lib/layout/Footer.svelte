<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import Fa from 'svelte-fa/src/fa.svelte';
	
	if ($page.params.lang) {
		setInit($page.params.lang);
	}
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
		},
		{
			route: `https://fung.wiki/`,
			title: 'Wiki'
		},
	];
</script>

<footer class="z-20" class:dark={$darkMode}>
	<div class="dark:text-gray-300 {$darkMode && 'dark-active'} w-full p-3 text-center text-xl ">
		<div class="w-4/5 max-w-2xl  mx-auto flex justify-between">
			<a href="">
				<img src="/static/info.png" alt="Go to get more information">
			</a>
			<a href="">
				<img src="/static/telegram.png" alt="Go to official Fung Fi Telegram">
			</a>
			<a href="">
				<img src="/static/twitter.png" alt="Go to the official Fung Fi twitter page">
			</a>
			<a href="">
				<img src="/static/handshake.png" alt="Go to the trade section">
			</a>
			<a href="">
				<img src="/static/book.png" alt="Go to Fung Finance Wiki">
			</a>
		</div>
	</div>
</footer>

<style>
	.footer_home {
		color: white !important;
	}
	.dark-active {
		background: #0b1216;
	}
</style>
