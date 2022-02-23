<script lang="ts">
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
</script>

<div class="flex flex-shrink-0 items-center">
	<a href={`/${$page.params.lang}/`} class="flex cursor-pointer">
		<img class="w-10 " src="/theme/fiji.svg" alt="Fung Finance Logo" />
		{#if $isHomescreen}
			<img class="mt-1 " src="/theme/fungfiDarkMode.svg" alt="Fung Finance" />
		{:else if $darkMode}
			<img class="mt-1 " src="/theme/fungfiDarkMode.svg" alt="Fung Finance" />
		{:else}
			<img class="mt-1 " src="/theme/fungfiLiteMode.svg" alt="Fung Finance" />
		{/if}
	</a>
</div>
