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
	class=" {$isHomescreen && ""}absolute  bg-white dark:bg-neutral-900 rounded-md text-black dark:text-white">
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/en">English</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/de">Deutsche</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/es">Español</a>
		<a  class=" px-5 py-2 font-light flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700" href="/fr">Français</a>
	</div>
	{/if}
	
</div>

<!-- <div>
	<button
		on:click={() => {
			isShowing = !isShowing;
		}}
		class="dark:border dark:rounded-md dark:hover:bg-neutral-300 focus:outline-none font-medium flex p-2 items-center "
	>
		<p class="m-0 font-semibold {$darkMode && 'text-white'} {$isHomescreen && 'text-white'}">
			{$page.params.lang ? validLang($page.params.lang) : '...'}
		</p>
	</button>
	{#if isShowing}
		<div
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 75, start: 0.95 }}
			class="dark:bg-neutral-900 title z-10 sm:origin-top-right sm:left-0 absolute w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
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
					class="dark:hover:bg-neutral-600 dark:text-white border-none block w-full px-4 py-2 text-dark-200 hover:bg-neutral-100"
				>
					{l.lang}
				</button>
			{/each}
		</div>
	{/if}
</div>
 -->