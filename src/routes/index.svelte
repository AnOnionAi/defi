<script context="module" lang="ts">
	export const prerendered = true;
</script>
<script lang="ts">
	import { goto } from "$app/navigation";

	import { onMount } from "svelte";
	import {getLocaleFromNavigator} from "svelte-i18n"
	onMount(() => {
		const langs : string[] = ["es", "en", "de", "fr"]
		const lang : string = getLocaleFromNavigator().split("-")[0]
		if(langs.includes(lang)){
			goto(`/${lang}`, {replaceState:true})	
		}
		goto("/es", {replaceState:true})
	})
</script>
<div>
	index
</div>