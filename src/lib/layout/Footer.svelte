<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { faGithub } from '@fortawesome/free-brands-svg-icons'
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

<footer class="{$isHomescreen && 'z-20 backdrop-filter backdrop-blur'}" class:dark={$darkMode}>
	<div class="dark:text-gray-300 {($darkMode && !$isHomescreen) && 'dark-active'} w-full p-3 text-center text-xl ">
		<div class="w-11/12 max-w-2xl  mx-auto flex justify-between lg:justify-around">
			<a href="">
				<img src="/info.png" alt="Go to get more information" class="w-6 ">
			</a>
			<a href="">
				<img src="/telegram.png" alt="Go to official Fung Fi Telegram" class="w-6 ">
			</a>
			<a href="">
				<img src="/discord.png" alt="Go to official Fung Fi Telegram" class="w-6 ">
			</a>
			<a href="">
				<img src="/twitter.png" alt="Go to the official Fung Fi twitter page" class="w-6 ">
			</a>
			<a href="">
				<Fa icon={faGithub} size="24"/>
			</a>
			<a href="">
				<img src="/handshake.png" alt="Go to the trade section" class="w-6 ">
			</a>
			<a href="">
				<img src="/book.png" alt="Go to Fung Finance Wiki" class="w-6 ">
			</a>
		</div>
	</div>
</footer>

<style>
	.dark-active {
		background: #0b1216;
	}
</style>
