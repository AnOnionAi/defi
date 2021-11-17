<script context="module" lang="ts">
	export const prerendered = true;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import 'virtual:windi.css';
	import { onMount } from 'svelte';
	import { getLocaleFromNavigator } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	setInit('es');
	onMount(() => {
		const langs: string[] = ['es', 'en', 'de', 'fr'];
		const lang: string = getLocaleFromNavigator().split('-')[0];
		console.log('LANG IS', lang);

		if (langs.includes(lang)) {
			goto(`/${lang}`, { replaceState: true });
		} else goto('/es', { replaceState: true });
	});
</script>

<div>
	<h1 class="text-center mt-auto mt-5">Getting your lang...</h1>
	<h2>xd</h2>
</div>
