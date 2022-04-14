<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { isHomescreen } from '$lib/stores/homescreen';
	import {
		faDiscord,
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
		'z-20 border-none backdrop-blur backdrop-filter '}  {$darkMode &&
		'border-dark-200'} {$darkMode &&
		!$isHomescreen &&
		'bg-zinc-900'} footer-height {textColor} transition duration-500">
	<div
		class="footer-height grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3 lg:py-3">
		<div
			class="ml-0  flex items-center justify-center lg:ml-5 lg:justify-start">
			<a
				href={`https://app.sushi.com/${$page.params.lang}/swap`}
				target="_blank"
				class="rounded-full bg-complementary-600 px-3 py-1 font-[500] text-white transition duration-300  hover:bg-complementary-500  "
				>Buy $MUSH &rarr;</a>
		</div>

		<div class="flex items-center justify-around font-light md:justify-center ">
			<a
				href="https://rugdoc.io/project/fungfi-defi/#"
				target="_blank"
				class="mr-5">
				<img
					src={$darkMode ? '/assets/rugdocLight.svg' : '/assets/rugdocDark.svg'}
					class="w-28"
					alt="Rugdoc Revisions" />
			</a>

			<a
				href="https://fung.wiki/"
				class="mr-5 transition duration-300 hover:text-complementary-500"
				>Wiki</a>
			<a
				href={`/${$page.params.lang}/about`}
				class="mr-5 transition duration-300 hover:text-complementary-500"
				>About</a>
		</div>

		<div
			class="flex flex-row-reverse items-center justify-around  md:justify-center md:text-lg lg:justify-start">
			<a href="https://github.com/fungfi" class="mr-3 lg:mr-5" target="_blank">
				<Fa
					icon={faGithub}
					size="lg"
					class="transition duration-300 hover:text-[#999999]" />
			</a>
			<a
				href="http://www.tiktok.com/@fungfi"
				target="_blank"
				aria-label="Tiktok"
				class="mr-3 lg:mr-5">
				<Fa
					icon={faTiktok}
					size="lg"
					class="hover:text-black {$darkMode &&
						'hover:text-[#25F4EE]'} transition duration-300" />
			</a>
			<a
				href="https://facebook.com"
				aria-label="Facebook"
				class="mr-5"
				target="_blank">
				<Fa
					icon={faFacebook}
					size="lg"
					class="transition duration-300 hover:text-[#4267B2]" />
			</a>
			<a
				href="https://www.youtube.com/channel/UCJQDpiFUzJyrifYxhK8K-Jg"
				class="mr-3 lg:mr-5"
				target="_blank">
				<Fa
					icon={faYoutube}
					size="lg"
					class=" transition duration-300 hover:text-[#FF0000]" />
			</a>
			<a
				href="https://twitter.com/fung_fi"
				target="_blank"
				aria-label="Twitter"
				class="mr-3 lg:mr-5">
				<Fa
					icon={faTwitter}
					size="lg"
					class="transition duration-300 hover:text-[#1DA1F2]" />
			</a>
			<a
				href="https://telegram.com/fungfi"
				target="_blank"
				aria-label="Telegram"
				class="mr-3 lg:mr-5">
				<Fa
					icon={faTelegram}
					size="lg"
					class="transition duration-300 hover:text-[#229ED9]" />
			</a>
			<a href="https://discord.gg/b5H9BVC" class="mr-3 lg:mr-5" target="_blank">
				<Fa
					icon={faDiscord}
					size="lg"
					class="transition duration-300 hover:text-[#7289DA]" />
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
