<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import Fa from 'svelte-fa';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { faDiscord, faGit, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faInfoCircle, faHandHoldingUsd, faBookOpen } from '@fortawesome/free-solid-svg-icons';
	import { faTelegram } from '@fortawesome/free-brands-svg-icons';
	import { faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { faSnapchat } from '@fortawesome/free-brands-svg-icons';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
	import { faTiktok } from '@fortawesome/free-brands-svg-icons';
	import { logger } from 'ethers';
	let iconColor;

	$: {
		iconColor = (!$darkMode && $isHomescreen) || $isHomescreen || (!$isHomescreen && $darkMode);
	}

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

	const gotoPage = (route: string, home: boolean = false) => {
		if (home) goto(`/${$page.params.lang}`, { replaceState: true });
		else goto(`/${$page.params.lang}${route.toLowerCase()}`, { replaceState: true });
		console.log($page.params.lang);
	};
</script>

<footer class="{$isHomescreen && 'z-20 backdrop-filter backdrop-blur border-none '} border-t-2  border-gray-200 {$darkMode && "border-dark-200"}" class:dark={$darkMode}>
	<div class="{$darkMode && !$isHomescreen && 'bg-dark-500 '} ">
		<div
			class="flex flex-col lg:flex-row  w-full items-center  lg:justify-between px-2 py-5 dark:text-white {$isHomescreen &&
				'text-white'}"
		>
			<div class="w-12" />

			<div class="flex space-x-4 mb-2 lg:mb-0">
				<p class="cursor-pointer" on:click={() => gotoPage('/about')}>
					<Fa icon={faInfoCircle} size="lg" />
				</p>

				<a href="https://github.com">
					<Fa icon={faGithub} size="lg" />
				</a>

				<a href="google.com">
					{#if $darkMode || $isHomescreen}
						<img src="/auditsWhite.svg" class="icon_size" alt="" />
					{:else}
						<img src="/audits.svg" class="icon_size" alt="" />
					{/if}
				</a>

				<a href="https://app.sushi.com/swap">
					<Fa icon={faHandHoldingUsd} size="lg" />
				</a>
				<a href="https://fung.wiki/">
					<Fa icon={faBookOpen} size="lg" />
				</a>
				<a href="https://discord.gg/EbvCkxhP">
					<Fa icon={faDiscord} size="lg" />
				</a>
			</div>

			<div class="social-media flex space-x-4 	">
				<a href="https://github.com">
					<Fa icon={faYoutube} size="lg" />
				</a>

				<a href="https://github.com">
					<Fa icon={faTwitter} size="lg" />
				</a>
				<a href="https://twitter.com/fung_fi">
					<Fa icon={faTelegram} size="lg" />
				</a>
				<a href="https://fung.wiki/">
					<Fa icon={faInstagram} size="lg" />
				</a>
				<a href="https://t.me/joinchat/w3SVXsuNWDE3ZjFh">
					<Fa icon={faTiktok} size="lg" />
				</a>
				<a href="https://discord.gg/EbvCkxhP">
					<Fa icon={faSnapchat} size="lg" />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.dark-active {
		background: #0b1216;
	}

	.icon_size {
		height: 22px;
	}

	footer {
		z-index: 1;
	}
</style>
