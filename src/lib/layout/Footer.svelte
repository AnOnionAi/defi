<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import Icon from 'svelte-fa';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { faDiscord, faGit, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faInfoCircle, faHandHoldingUsd, faBookOpen } from '@fortawesome/free-solid-svg-icons';
	import { faTelegram } from '@fortawesome/free-brands-svg-icons';
	import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
	import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { logger } from 'ethers';

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
		}
	];
</script>

<footer class={$isHomescreen && 'z-20 backdrop-filter backdrop-blur'} class:dark={$darkMode}>
	<div class="{$darkMode && !$isHomescreen && 'dark-active'} ">
		<div
			class="flex flex-col lg:flex-row  w-full items-center gap-y-6 lg:justify-between p-2 dark:text-white"
		>
			<div class="w-1/12" />

			<div class="flex">
				<a href="https://fung.wiki/">
					<Icon icon={faInfoCircle} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://github.com">
					<Icon icon={faGithub} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://app.sushi.com/swap">
					<Icon icon={faHandHoldingUsd} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://fung.wiki/">
					<Icon icon={faBookOpen} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://discord.gg/EbvCkxhP">
					<Icon icon={faDiscord} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
			</div>

			<div class="social-media flex">
				<a href="https://github.com">
					<Icon icon={faTwitter} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://twitter.com/fung_fi">
					<Icon icon={faTelegram} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://fung.wiki/">
					<Icon icon={faInstagram} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://t.me/joinchat/w3SVXsuNWDE3ZjFh">
					<Icon icon={faTiktok} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
				<a href="https://discord.gg/EbvCkxhP">
					<Icon icon={faSnapchat} color="{((!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode)) ? '#fff' : '#000'}" size="20" class="mr-5" />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.dark-active {
		background: #0b1216;
	}
	footer {
		z-index: 1;
	}
</style>
