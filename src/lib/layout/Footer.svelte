<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { setInit } from '../i18n/init';
	import Fa from 'svelte-fa';
	import { isHomescreen } from '$lib/stores/homescreen';
	import {
		faDiscord,
		faGit,
		faGithub,
		faTwitter
	} from '@fortawesome/free-brands-svg-icons';
	import { faTelegram } from '@fortawesome/free-brands-svg-icons';
	import { faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { faFacebook } from '@fortawesome/free-brands-svg-icons';
	import { faTiktok } from '@fortawesome/free-brands-svg-icons';

	let textColor = 'text-white';

	$: {
		if ($isHomescreen) {
			textColor = 'text-white';
		} else if (!$isHomescreen && $darkMode) {
			textColor = 'text-gray-300';
		} else if (!isHomescreen && !$darkMode) {
			textColor = 'text-gray-700';
		} else {
			textColor = 'text-gray-700';
		}
	}
</script>

<footer
	class="{$isHomescreen &&
		'z-20 backdrop-filter backdrop-blur border-none '}  {$darkMode &&
		'border-dark-200'} {$darkMode && !$isHomescreen && 'bg-zinc-900'} footer-height {textColor} "
>
	<div class="grid grid-cols-1 md:grid-cols-3 footer-height px-6 py-6 lg:py-1 gap-4">
		<div class="flex  items-center ml-0 lg:ml-5 justify-center lg:justify-start">
			<a
				href={`https://app.sushi.com/${$page.params.lang}/swap`}
				target="_blank"
				class="text-white bg-neutral-600 hover:bg-green-400 px-3 py-1 rounded-full font-light text-sm"
				>Buy MUSH</a
			>
		</div>

		<div class="flex items-center justify-center font-light">
			<a href="https://google.com" class="mr-5 hover:text-green-400">Audits</a>
			<a href="https://fung.wiki/" class="mr-5 hover:text-green-400">Wiki</a>
			<a href={`/${$page.params.lang}/about`} class="mr-5 hover:text-green-400"
				>About</a>
		</div>

		<div
			class="flex flex-row-reverse items-center justify-center lg:justify-start  ">
			<a href="https://github.com/fungfi" class="mr-3 lg:mr-5">
				<Fa icon={faGithub} size="lg" class="hover:text-green-400" />
			</a>
			<a
				href="https://t.me/joinchat/w3SVXsuNWDE3ZjFh"
				aria-label="Tiktok"
				class="mr-3 lg:mr-5">
				<Fa icon={faTiktok} size="lg" class="hover:text-green-400" />
			</a>
			<a href="https://facebook.com" aria-label="Facebook" class="mr-5">
				<Fa icon={faFacebook} size="lg" class="hover:text-green-400" />
			</a>
			<a href="https://youtube.com" class="mr-3 lg:mr-5">
				<Fa icon={faYoutube} size="lg" class=" hover:text-green-400" />
			</a>
			<a
				href="https://twitter.com/fung_fi"
				aria-label="Twitter"
				class="mr-3 lg:mr-5">
				<Fa icon={faTwitter} size="lg" class="hover:text-green-400" />
			</a>
			<a
				href="https://telegram.com/fungfi"
				aria-label="Telegram"
				class="mr-3 lg:mr-5">
				<Fa icon={faTelegram} size="lg" class="hover:text-green-400" />
			</a>
			<a href="https://discord.gg/b5H9BVCt" class="mr-3 lg:mr-5">
				<Fa icon={faDiscord} size="lg" class="hover:text-green-400" />
			</a>
		</div>
	</div>
</footer>

<style>
	.footer-height {
		min-height: 60px;
	}

	footer {
		z-index: 1;
	}
</style>
