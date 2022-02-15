<script lang="ts">
	import { page } from "$app/stores";
	import { fade } from "svelte/transition";
	import Fa from "svelte-fa"
	import {faCaretDown,faCaretUp} from "@fortawesome/free-solid-svg-icons" 
import { formatComma } from "$lib/utils/formatNumbersByLang";
import { _ } from "svelte-i18n";
	export let title: string;
	export let display: number = 0;
	export let isPercentage = false;

</script>
	
<div
	class="bg-white p-3 dark:bg-dark-900  rounded-xl w-full  flex flex-col justify-between  dark:text-white shadow-md dark:shadow-none overflow-hidden"
>
	<h3 class="font-semibold text-center ">{title}</h3>
	{#if display && $page.params.lang}
		
	{#if isPercentage && isPercentage != null}
		<div in:fade={{duration:500}}  class="flex items-center justify-center ">
			{#if display < 0 }
				<Fa icon={faCaretDown} size={"2x"} color="#ef4444"/>
			{:else if display > 0}
				<Fa icon={faCaretUp} size={"2x"} color="#22c55e"/>
			{/if}
			<p class="ml-1 text-2xl">{formatComma(Math.abs(display),$page.params.lang)}%</p>
		</div>

		
		
	{:else}
	<p class="text-center text-2xl">${formatComma(display,$page.params.lang)}</p>
	{/if}
	
	{/if}
	{#if display === null}
		<p class="text-lg text-center">{$_("actions.notAvaliable")}</p>
	{/if}
	<p></p>
</div>


