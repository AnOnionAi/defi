<script context="module" lang="ts">
	export const prerender = false;

	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
import { onMount } from 'svelte';
import { getTokenPriceUSD } from '$lib/utils/coinGecko';
	onMount(async()=>{
		console.log(await getTokenPriceUSD("0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64"))
	})
</script>

<script lang="ts">
	export let lang;
</script>

<section>
	<br />
	<h1 class="text-dark-200 dark:text-white text-4xl">T R A D E</h1>
	<div class="h-full" />
</section>
