<script lang="ts">
	import { _ } from 'svelte-i18n';

	const totalValueLocked = Math.random() * 10000; //TODO: Change for the real one
</script>

<div
	class="bg-white dark:bg-dark-900 rounded-2xl p-5 h-55 shadow-xl flex flex-col justify-between select-none"
>
	<p class="text-sm md:text-base lg:text-xl text-gray-600  dark:text-white">
		{$_('dashboard.tvl')} (TVL)
	</p>

	<div class="text-center">
		<p class="font-medium text-dark-800 dark:text-gray-200 text-lg md:text-xl xl:text-2xl">
			${totalValueLocked.toFixed(2)}
		</p>
		<p class="text-gray-500 dark:text-gray-300 ">{$_('dashboard.across')}</p>
	</div>
	<div />
</div>
