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
			<img src="/theme/darkFungFi.png" alt="Fung Fi" />
		{:else if !$isHomescreen || !$darkMode}
			<img src="/theme/liteFungFi.png" alt="Fung Fi" />
		{/if}
	</a>
</div>

<style>
</style>
