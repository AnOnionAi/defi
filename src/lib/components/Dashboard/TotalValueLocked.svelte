<script lang="ts">
	import { page } from '$app/stores';
	import { totalValueLocked } from '$lib/stores/MushMarketStats';
	import { formatComma } from '$lib/utils/formatNumbersByLang';
	import { _ } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
</script>

<div
	class="flex h-56 select-none flex-col justify-between rounded-2xl bg-white p-5 shadow-xl transition duration-300 dark:bg-neutral-900">
	<p class="text-sm text-gray-600 dark:text-white md:text-base  lg:text-xl">
		{$_('dashboard.tvl')} (TVL)
	</p>

	<div class="text-center">
		{#if $totalValueLocked}
			<p
				in:fade={{ duration: 500 }}
				class="text-dark-800 text-lg font-medium dark:text-gray-200 md:text-xl xl:text-2xl">
				${formatComma($totalValueLocked, $page.params.lang)}
			</p>
		{/if}
		<p class="text-gray-500 dark:text-gray-300 ">{$_('dashboard.across')}</p>
	</div>
	<div />
</div>
