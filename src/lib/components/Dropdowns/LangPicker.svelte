<script lang="ts">
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { setInit } from '$lib/i18n/init';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { validLang } from '$lib/i18n/utils';
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
				on:click={() => handleNewLangSelect('de')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/de${currentRoute}`}>Deutsche</a>
			<a
				on:click={() => handleNewLangSelect('es')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/es${currentRoute}`}>Español</a>
			<a
				on:click={() => handleNewLangSelect('fr')}
				class=" flex items-center justify-center px-5 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/fr${currentRoute}`}>Français</a>
		</div>
	{/if}
</div>
