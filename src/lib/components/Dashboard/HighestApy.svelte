<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div
	class="flex h-56 select-none flex-col justify-between rounded-2xl bg-white p-5 shadow-xl transition duration-300 dark:bg-neutral-900">
	<p
		class="text-center text-sm text-gray-600 dark:text-white md:text-left  md:text-xl">
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
