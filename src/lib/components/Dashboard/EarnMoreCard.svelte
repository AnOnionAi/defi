<script lang="ts">
	import { fade } from 'svelte/transition';
	export let title: string;
	export let primaryText: string | number;
	export let secondaryText: string;
	export let buttonText: string;
	export let route: string;
</script>

<div
	class="h-55 col-span-6 flex select-none flex-col  justify-between rounded-2xl bg-white p-5 shadow-md transition duration-300 dark:bg-neutral-900 md:col-span-3">
	<div class="flex items-center">
		<p
			class="ml-2 text-xl font-light tracking-wider text-gray-600 dark:text-white">
			{title}
		</p>
	</div>
	<div class="flex flex-col items-center gap-2 pb-3">
		{#if primaryText}
			<p
				in:fade={{ duration: 500 }}
				class="text-3xl font-semibold tracking-wide dark:text-white">
				${primaryText}
			</p>
		{/if}
		<p class="-mt-1 text-sm font-medium text-gray-700 dark:text-white">
			{secondaryText}
		</p>
	</div>

	<a
		sveltekit:prefetch
		href={route}
		class="flex items-center self-center rounded-lg border  border-green-500 py-2 px-3 hover:bg-green-400 hover:text-white">
		<p class="font-medium dark:text-white">{buttonText}</p>
	</a>
</div>
