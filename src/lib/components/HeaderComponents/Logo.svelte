<script lang="ts">
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
</script>

<div class="flex flex-shrink-0">
	<a
		href={`/${$page.params.lang}/`}
		class="flex cursor-pointer items-center gap-1">
		<img class="mr-1 w-10" src="/theme/fiji.webp" alt="Fung Finance Logo" />
		{#if $darkMode}
			<img
				src="/theme/fungfiDarkMode.svg"
				alt="Fung Fi"
				class="h-10 w-[104px] " />
		{:else}
			<img src="/theme/liteFungfi.svg" alt="Fung Fi" class="w-[104px] h-10 " />
		{/if}
	</a>
</div>

<style>
</style>
