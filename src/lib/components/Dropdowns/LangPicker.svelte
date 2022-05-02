<script lang="ts">
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { setInit } from '$lib/i18n/init';
	import { isHomescreen } from '$lib/stores/homescreen';
	import Fa from 'svelte-fa';
	import { faLanguage } from '@fortawesome/free-solid-svg-icons';
	import { darkMode } from '$lib/stores/dark';

	export let isShowing = false;

	let menu;

	$: currentRoute = $page.url.pathname.replace(`/${$page.params.lang}`, '');

	const toggleDropDownMenu = () => {
		isShowing = !isShowing;
	};

	const handleNewLangSelect = (lang: string) => {
		setInit(lang);
		isShowing = false;
	};

	const LANGUAGES = [
		{
			code: 'en',
			lang: 'English'
		},
		{
			code: 'es',
			lang: 'Español'
		},
		{
			code: 'ar',
			lang: 'اَلْعَرَبِيَّةُ'
		},
		{
			code: 'de',
			lang: 'Deutsche'
		},
		{
			code: 'el',
			lang: 'ελληνικά'
		},
		{
			code: 'fr',
			lang: 'Français'
		},
		{
			code: 'hi',
			lang: 'हिन्दी'
		},
		{
			code: 'it',
			lang: 'Italiano'
		},
		{
			code: 'ja',
			lang: '日本語'
		},
		{
			code: 'ko',
			lang: '한국어'
		},
		{
			code: 'pt',
			lang: 'Português'
		},
		{
			code: 'ru',
			lang: 'Pyccкий'
		},
		{
			code: 'tr',
			lang: 'Türkçe'
		},
		{
			code: 'ur',
			lang: 'اُردُو'
		},
		{
			code: 'vi',
			lang: 'Việt'
		},
		{
			code: 'zh',
			lang: '汉语'
		}
	];
</script>

<svelte:window
	on:click={(e) => {
		if (isShowing && !menu.contains(e.target)) {
			isShowing = false;
		}
	}}
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			isShowing = false;
		}
	}} />

<div bind:this={menu} class="relative  ml-1 lg:inline-block">
	<button
		on:click={toggleDropDownMenu}
		class="h-11 w-10 cursor-pointer select-none rounded-md text-lg  font-medium tracking-wide hover:text-primary-300 dark:text-gray-200 dark:hover:text-analogPurple-200 {isShowing &&
			!$darkMode &&
			'text-primary-300'} {isShowing && $darkMode && 'text-analogPurple-200'}">
		<Fa icon={faLanguage} size="lg" />
	</button>
	{#if isShowing}
		<div
			in:scale={{ duration: 150, start: 0.95 }}
			out:scale={{ duration: 100, start: 0.95 }}
			class=" {$isHomescreen &&
				'z-20'} grid-rows-8 absolute z-20 grid w-max grid-cols-2 gap-x-1 rounded-md bg-white text-black dark:bg-neutral-900 dark:text-white">
			{#each LANGUAGES as l}
				<a
					on:click={() => handleNewLangSelect(l.code)}
					class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
					href={`/${l.code}${currentRoute}`}>{l.lang}</a>
			{/each}
		</div>
	{/if}
</div>
