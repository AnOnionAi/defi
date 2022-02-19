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

	let langPickerText = "en";

	$:langPickerText = validLang($page.params.lang)


	const toggleDropDownMenu = () => {
		isShowing = !isShowing;
	}
</script>

<div class="ml-1  lg:inline-block relative">
	<button 
	on:click={toggleDropDownMenu}
	class="border rounded-md w-10 h-11 select-none cursor-pointer tracking-wider font-medium text-lg dark:text-white dark:border-white {$isHomescreen && "text-white"}">
		{langPickerText}
	</button>
	{#if isShowing}
	<div
	in:scale={{ duration: 150, start: 0.95 }}
	out:scale={{ duration: 100, start: 0.95 }}
	class=" {$isHomescreen && "z-20"} absolute  bg-white dark:bg-neutral-900 rounded-md text-black dark:text-white">
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/en">English</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/de">Deutsche</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/es">Español</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/fr">Français</a>
	</div>
	{/if}
	
</div>

