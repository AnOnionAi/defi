<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div
	class="bg-white dark:bg-neutral-900 rounded-2xl p-5 h-56 shadow-xl flex flex-col justify-between select-none transition duration-300"
>
	<p class="text-center text-sm md:text-left md:text-xl text-gray-600  dark:text-white">
		Earn Interest Up To
	</p>

	<div class="text-center">
		<p
			class="text-dark-800 text-4xl font-medium dark:text-gray-200 md:text-6xl lg:text-7xl">
			∞
		</p>
		<p
			class="text-sm text-gray-500 dark:text-gray-300 md:-mt-2 md:text-base lg:-mt-4 lg:text-lg">
			{$_('dashboard.across')}
		</p>
	</div>
	<div />
</div>
