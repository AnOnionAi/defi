<script lang="ts">
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
</script>

<div class="flex flex-shrink-0">
	<a
		href={`/${$page.params.lang}/`}
		class="flex cursor-pointer items-center gap-1">
		<img class="mr-1 w-10" src="/theme/fiji.svg" alt="Fung Finance Logo" />
		{#if $isHomescreen}
			<p>Fung Fi</p>
		{:else if $darkMode}
			<p class="text-[24px] font-[800] text-white">Fung Fi</p>
		{:else}
			<p class="text-[24px] font-[800]">Fung Fi</p>
		{/if}
	</a>
</div>

<style>
</style>
