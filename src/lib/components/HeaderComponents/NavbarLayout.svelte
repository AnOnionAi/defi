<script lang="ts">
	import { page } from '$app/stores';

	export const prerender = false;
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';

	let navbarStyles = '';

	$: {
		console.log('hs', $isHomescreen);
		console.log($page.params.lang);
	}
</script>

<nav
	class:dark={$darkMode}
	class="{$isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'bg-zinc-800 '} top-0 w-full backdrop-blur  {!$isHomescreen &&
		'shadow-sm'} {$isHomescreen && 'text-white'} {$darkMode && 'text-white'}">
	<slot />
</nav>
