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
				'z-20'} absolute z-20  rounded-md bg-white text-black dark:bg-neutral-900 dark:text-white">
			<a
				on:click={() => handleNewLangSelect('en')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/en${currentRoute}`}>English</a>
			<a
				on:click={() => handleNewLangSelect('es')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/es${currentRoute}`}>Español</a>
			<a
				on:click={() => handleNewLangSelect('de')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/de${currentRoute}`}>Deutsche</a>

			<a
				on:click={() => handleNewLangSelect('fr')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/fr${currentRoute}`}>Français</a>
			<a
				on:click={() => handleNewLangSelect('ar')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/ar${currentRoute}`}>اَلْعَرَبِيَّةُ</a>
			<a
				on:click={() => handleNewLangSelect('el')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/el${currentRoute}`}>ελληνικά</a>
			<a
				on:click={() => handleNewLangSelect('hi')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/hi${currentRoute}`}>हिन्दी</a>
			<a
				on:click={() => handleNewLangSelect('it')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/it${currentRoute}`}>Italiano</a>
			<a
				on:click={() => handleNewLangSelect('ja')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/ja${currentRoute}`}>日本語</a>
			<a
				on:click={() => handleNewLangSelect('ko')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/ko${currentRoute}`}>한국어</a>
			<a
				on:click={() => handleNewLangSelect('pt')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/pt${currentRoute}`}
				>Português
			</a>
			<a
				on:click={() => handleNewLangSelect('ru')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/ru${currentRoute}`}>Pyccкий</a>
			<a
				on:click={() => handleNewLangSelect('tr')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/tr${currentRoute}`}>Türkçe</a>
			<a
				on:click={() => handleNewLangSelect('zh')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/zh${currentRoute}`}>汉语</a>
			<a
				on:click={() => handleNewLangSelect('vi')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/vi${currentRoute}`}>Việt</a>
			<a
				on:click={() => handleNewLangSelect('vi')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/vi${currentRoute}`}>اُردُو</a>
		</div>
	{/if}
</div>
