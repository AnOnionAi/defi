<script lang="ts">
	import { launchDate, timeLeftForLaunch } from '$lib/stores/launchDate';
</script>

<div
	class="bg-primary-300 py-2 px-4 text-center font-semibold text-gray-200 dark:bg-analogPurple-300">
	⚠️ Deposits and Withdrawals are available but you will not earn MUSH until {$timeLeftForLaunch.daysLeft}
	Days
	{$timeLeftForLaunch.hoursLeft} Hours {$timeLeftForLaunch.minutesLeft} Minutes {$timeLeftForLaunch.secondsLeft}
	Seconds ⚠️
</div>
