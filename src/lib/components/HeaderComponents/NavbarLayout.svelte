<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
</script>

<nav
	class:dark={$darkMode}
	class="{$isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'bg-darkGrey-900 '}  w-full backdrop-blur   {$isHomescreen &&
		'text-white'} {$darkMode && 'text-white'} select-none">
	<slot />
</nav>
