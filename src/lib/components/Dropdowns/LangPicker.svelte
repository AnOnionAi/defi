<script lang="ts">
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { setInit } from '$lib/i18n/init';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { validLang } from '$lib/i18n/utils';

	export let isShowing = false;

	let langPickerText = 'en';

	$: langPickerText = validLang($page.params.lang);

	$: currentRoute = $page.url.pathname.replace(`/${$page.params.lang}`, '');

	const toggleDropDownMenu = () => {
		isShowing = !isShowing;
	};

	const handleNewLangSelect = (lang: string) => {
		setInit(lang);
		isShowing = false;
	};
</script>

<div class="relative  ml-1 lg:inline-block">
	<button
		on:click={toggleDropDownMenu}
		class="h-11 w-10 cursor-pointer select-none rounded-md border text-lg font-medium tracking-wider dark:border-white dark:text-white {$isHomescreen &&
			'text-white'}">
		{langPickerText}
	</button>
	{#if isShowing}
		<div
			in:scale={{ duration: 150, start: 0.95 }}
			out:scale={{ duration: 100, start: 0.95 }}
			class=" {$isHomescreen &&
				'z-20'} absolute  rounded-md bg-white text-black dark:bg-neutral-900 dark:text-white">
			<a
				on:click={() => handleNewLangSelect('en')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/en${currentRoute}`}>English</a>
			<a
				on:click={() => handleNewLangSelect('de')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/de${currentRoute}`}>Deutsche</a>
			<a
				on:click={() => handleNewLangSelect('es')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/es${currentRoute}`}>Español</a>
			<a
				on:click={() => handleNewLangSelect('fr')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href={`/fr${currentRoute}`}>Français</a>
		</div>
	{/if}
</div>
