<script lang="ts">
	import { launchDate, timeLeftForLaunch } from '$lib/stores/launchDate';
	import { _ } from 'svelte-i18n';
</script>

<div
	class="select-none bg-primary-300 py-2 px-4 text-center font-semibold text-gray-200 dark:bg-analogPurple-300">
	⚠️ {$_('depositWarning.warning')}{$timeLeftForLaunch.daysLeft}
	Days
	{$timeLeftForLaunch.hoursLeft} Hours {$timeLeftForLaunch.minutesLeft} Minutes {$timeLeftForLaunch.secondsLeft}
	Seconds ⚠️
</div>
