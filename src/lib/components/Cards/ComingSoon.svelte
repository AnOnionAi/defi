<script>
	import { timeLeftForLaunch } from '$lib/stores/launchDate';
	import { _ } from 'svelte-i18n';
</script>

<div class="mt-[100px] select-none px-4 text-center md:mt-[200px]">
	<h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
		{$_('comingSoon.soon')}
	</h2>
	<p class="mt-2 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
		{$_('comingSoon.left')}
		<span class=" font-medium text-primary-300 dark:text-analogPurple-300"
			>{$timeLeftForLaunch.daysLeft}D {$timeLeftForLaunch.hoursLeft}H {$timeLeftForLaunch.minutesLeft}M
			{$timeLeftForLaunch.secondsLeft}S
		</span>
	</p>
	<img src="/theme/fiji.svg" class="mx-auto w-24" alt="Fiji" />
</div>
