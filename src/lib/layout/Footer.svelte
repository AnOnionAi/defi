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

<footer class={$isHomescreen && 'z-20 backdrop-filter backdrop-blur'} class:dark={$darkMode}>
	<div class="{$darkMode && !$isHomescreen && 'bg-dark-500'} ">
		<div
			class="flex flex-col lg:flex-row  w-full items-center gap-y-6 lg:justify-between px-2 py-4 dark:text-white"
		>
			<div class="w-1/12" />

			<div class="flex space-x-5">
				<p
				class="cursor-pointer"
				on:click={()=> gotoPage("/about")}
				>
					<Fa icon={faInfoCircle} size="20"  />
			</p>

				<a href="https://github.com">
					<Fa icon={faGithub} size="20"  />
				</a>

				<a href="https://app.sushi.com/swap">
					<Fa icon={faHandHoldingUsd} size="20"  />
				</a>

				<a href="https://fung.wiki/">
					<Fa icon={faBookOpen} size="20"  />
				</a>

				<a href="https://discord.gg/EbvCkxhP">
					<Fa icon={faDiscord} size="20"  />
				</a>
			</div>

			<div class="social-media flex space-x-4 mr-4">

				<a href="https://github.com">
					<Fa icon={faYoutube} size="20"  />
				</a>


				<a href="https://github.com">
					<Fa icon={faTwitter} size="20"  />
				</a>

				<a href="https://twitter.com/fung_fi">
					<Fa icon={faTelegram} size="20"  />
				</a>
				<a href="https://fung.wiki/">
					<Fa icon={faInstagram} size="20"  />
				</a>
				<a href="https://t.me/joinchat/w3SVXsuNWDE3ZjFh">
					<Fa icon={faTiktok} size="20"  />
				</a>
				<a href="https://discord.gg/EbvCkxhP">
					<Fa icon={faSnapchat} size="20"  />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.dark-active {
		background: #0b1216;
	}
</style>
