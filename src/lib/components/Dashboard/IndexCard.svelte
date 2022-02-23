<script lang="ts">
	import { fade } from 'svelte/transition';
	export let title: string;
	export let description: string;
</script>

<div
	class="bg-white dark:bg-neutral-900 rounded-2xl p-6 h-40 col-span-3 dark:text-white flex flex-col shadow-lg dark:shadow-none select-none transition duration-300"
>
	<div>
		<p class="text-dark-500 text-xl dark:text-gray-100 md:text-2xl  lg:text-xl">
			{title}
		</p>
	</div>
	<div class="flex h-32 w-full items-center justify-center">
		{#if true}
			<p
				in:fade={{ duration: 500 }}
				class="text-dark-900 text-4xl font-medium dark:text-white md:text-2xl  lg:text-2xl">
				{description}
			</p>
		{/if}
	</div>
</div>

<style>
</style>
