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
			return 'es';
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
		class="dark:hover:bg-dark-300 flex items-center p-2 font-medium focus:outline-none dark:rounded-md dark:border ">
		<p
			class="m-0 font-semibold {$darkMode && 'text-white'} {$isHomescreen &&
				'text-white'}">
			{$page.params.lang ? validLang($page.params.lang) : '...'}
		</p>
	</button>
	{#if showDropDownMenu}
		<div
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 75, start: 0.95 }}
			class="dark:bg-dark-900 title absolute z-10 w-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 sm:left-0 sm:origin-top-right">
			{#each LANGUAGES as l}
				<button
					on:click={() => {
						goto(`/${l.code}`);
						setInit(l.code);
						window.location.replace(
							window.location.origin + `/${l.code.toLowerCase()}/`
						);
					}}
					style="background-color: {home
						? $darkMode
							? 'black'
							: '#F3F4F6'
						: ''}; {$darkMode ? 'color:white' : ''};"
					class:navbar_item_home={home}
					class="dark:hover:bg-dark-600 text-dark-200 block w-full border-none px-4 py-2 hover:bg-gray-100 dark:text-white">
					{l.lang}
				</button>
			{/each}
		</div>
	{/if}
</div>
