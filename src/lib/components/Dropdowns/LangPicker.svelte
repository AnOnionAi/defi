<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
	export let home = false;

	export let showDropDownMenu = false;

	const validLang = (lang: string) => {
		const langs = ['es', 'en', 'de', 'fr'];
		if (langs.includes(lang)) {
			return lang;
		} else {
			return 'en';
		}
	};

	const LANGUAGES = [
		{
			code: 'es',
			lang: 'Español'
		},
		{
			code: 'de',
			lang: 'Deutsche'
		},
		{
			code: 'en',
			lang: 'English'
		},
		{
			code: 'fr',
			lang: 'Français'
		}
	];
</script>

<div>
	<button
		on:click={() => {
			showDropDownMenu = !showDropDownMenu;
		}}
		class="dark:border dark:rounded-md dark:hover:bg-dark-300 focus:outline-none font-medium flex p-2 items-center "
	>
		<p class="m-0 font-semibold {$darkMode && 'text-white'} {$isHomescreen && 'text-white'}">
			{$page.params.lang ? validLang($page.params.lang) : '...'}
		</p>
	</button>
	{#if showDropDownMenu}
		<div
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 75, start: 0.95 }}
			class="dark:bg-dark-900 title z-10 sm:origin-top-right sm:left-0 absolute w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
		>
			{#each LANGUAGES as l}
				<button
					on:click={() => {
						goto(`/${l.code}`);
						setInit(l.code);
						window.location.replace(window.location.origin + `/${l.code.toLowerCase()}/`);
					}}
					style="background-color: {home ? ($darkMode ? 'black' : '#F3F4F6') : ''}; {$darkMode
						? 'color:white'
						: ''};"
					class:navbar_item_home={home}
					class="dark:hover:bg-dark-600 dark:text-white border-none block w-full px-4 py-2 text-dark-200 hover:bg-gray-100"
				>
					{l.lang}
				</button>
			{/each}
		</div>
	{/if}
</div>
