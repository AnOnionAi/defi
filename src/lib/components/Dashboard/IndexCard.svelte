<script lang="ts">
	import { page } from '$app/stores';
import { formatComma } from '$lib/utils/formatNumbersByLang';
	import { fade } from 'svelte/transition';
	export let title: string;
	export let description: string;

	let formattedDescription
	$:if(description){
		formattedDescription = formatComma(description,$page.params.lang)
	}
</script>

<div
	class="bg-white dark:bg-dark-900 rounded-2xl p-6 h-40 col-span-3 dark:text-white flex flex-col shadow-lg dark:shadow-none select-none transition duration-300"
>
	<div>
		<p class="text-dark-500 dark:text-gray-100 text-xl md:text-2xl  lg:text-xl">{title}</p>
	</div>
	<div class="w-full flex justify-center items-center h-32">
		{#if !description.includes('undefined')}
			<p
				in:fade={{ duration: 500 }}
				class="text-dark-900 dark:text-white font-medium text-4xl md:text-2xl  lg:text-2xl"
			>
				{formattedDescription}
			</p>
		{/if}
	</div>
</div>

<style>
</style>
