<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let title: string;
	export let primaryText: string;
	export let secondaryText: string;
	export let buttonText: string;
	export let route: string;
</script>

<div
	class="flex flex-col justify-between bg-white dark:bg-dark-900  rounded-2xl p-5 h-55 shadow-md col-span-6 md:col-span-3 select-none"
>
	<div class="flex flex items-center">
		<p class="ml-2 text-gray-600 font-light tracking-wider text-xl dark:text-white">
			{title}
		</p>
	</div>
	<div class="flex flex-col items-center pb-3 gap-2">
		<p class="text-3xl tracking-wide font-semibold dark:text-white">{primaryText}</p>
		<p class="text-gray-700 font-medium text-sm dark:text-white -mt-1">
			{secondaryText}
		</p>
	</div>

	<a
		sveltekit:prefetch
		href={route}
		class="border border-green-500 rounded-lg py-2 px-3  flex items-center hover:text-white hover:bg-green-400 self-center"
	>
		<p class="font-medium dark:text-white">{buttonText}</p>
	</a>
</div>
