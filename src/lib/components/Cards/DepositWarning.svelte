<script lang="ts">
	import { launchDate, timeLeftForLaunch } from '$lib/stores/launchDate';
	import { _ } from 'svelte-i18n';
</script>

<div
	class="{$timeLeftForLaunch.daysLeft < 0 &&
		'hidden'} select-none bg-primary-300 py-2 px-4 text-center text-sm font-semibold text-gray-100 dark:bg-analogPurple-300 md:text-base">
	⚠️ {$_('depositWarning.warning')}:
	<br class="lg:hidden" />
	{$timeLeftForLaunch.daysLeft}
	Days
	{$timeLeftForLaunch.hoursLeft} Hours {$timeLeftForLaunch.minutesLeft} Minutes {$timeLeftForLaunch.secondsLeft}
	Seconds ⚠️
</div>
