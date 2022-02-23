<script lang="ts">
	import { fade } from 'svelte/transition';
	export let title: string;
	export let description: string;
</script>

<div
	class="col-span-3 flex h-40 select-none flex-col rounded-2xl bg-white p-6 shadow-lg transition duration-300 dark:bg-neutral-900 dark:text-white dark:shadow-none">
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
