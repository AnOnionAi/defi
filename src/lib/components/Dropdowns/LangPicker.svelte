<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { LANGUAGES, validLang } from '$lib/i18n/utils';

	export let home = false;
	export let isShowing = false;

	let langPickerText = 'en';

	$: langPickerText = validLang($page.params.lang);

	const toggleDropDownMenu = () => {
		isShowing = !isShowing;
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
				on:click={() => setInit('en')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href="/en">English</a>
			<a
				on:click={() => setInit('de')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href="/de">Deutsche</a>
			<a
				on:click={() => setInit('es')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href="/es">Español</a>
			<a
				on:click={() => setInit('fr')}
				class=" flex items-center justify-center px-5 py-2 font-light hover:bg-gray-200 dark:hover:bg-neutral-700"
				href="/fr">Français</a>
		</div>
	{/if}
</div>
