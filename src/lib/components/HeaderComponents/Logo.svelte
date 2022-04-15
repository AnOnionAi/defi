<script lang="ts">
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
</script>

<div class="flex flex-shrink-0">
	<a
		href={`/${$page.params.lang}/`}
		class="flex cursor-pointer items-center gap-1">
		<img class="mr-1 w-10" src="/theme/fiji.png" alt="Fung Finance Logo" />
		{#if $darkMode}
			<img
				src="/theme/fungfiDarkMode.svg"
				alt="Fung Fi"
				class="h-[80px] w-[104px] " />
		{:else}
			<img
				src="/theme/liteFungfi.svg"
				alt="Fung Fi"
				class="w-[104px] h-[80px] " />
		{/if}
	</a>
</div>

<style>
</style>
