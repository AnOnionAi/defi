<script context="module" lang="ts">
	export const prerendered = true;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getLocaleFromNavigator } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	setInit('en');
	onMount(() => {
		const langs: string[] = ['es', 'en', 'de', 'fr'];
		const lang: string = getLocaleFromNavigator().split('-')[0];

		if (langs.includes(lang)) {
			goto(`/${lang}`, { replaceState: true });
		} else goto('/en', { replaceState: true });
	});
</script>

<noscript>
	<div id="noscript_warning">
		We have detected javascript is disabled on your browser, please enable it !
	</div>
</noscript>

<div id="preloader" />

<style>
	#preloader {
		background: #000 url(../../../animation/loader2.gif) no-repeat center;
		background-size: 15%;
		height: 100vh;
		width: 100%;
		position: fixed;
		z-index: 99;
	}

	#noscript_warning {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 101;
		text-align: center;
		font-weight: bold;
		color: #fff;
		background-color: orangered;
		padding: 5px 0 5px 0;
		z-index: 100;
	}
</style>
