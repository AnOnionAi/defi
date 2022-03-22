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
		{#if $darkMode || $isHomescreen}
			<p class="text-[22px] font-[800] text-white ">Fung Fi</p>
		{:else if !$isHomescreen || !$darkMode}
			<p class="text-[22px] font-[800] text-gray-900 dark:text-white ">
				Fung Fi
			</p>
		{/if}
	</a>
</div>

<style>
</style>
