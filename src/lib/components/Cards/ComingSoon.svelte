<script>
	import { timeLeftForLaunch } from '$lib/stores/launchDate';
</script>

<div class="mt-[200px] select-none px-4 text-center">
	<h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
		Coming Soon...
	</h2>
	<p class="mt-2 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
		Time Left: <span
			class=" font-medium text-primary-300 dark:text-analogPurple-300"
			>{$timeLeftForLaunch.daysLeft}D {$timeLeftForLaunch.hoursLeft}H {$timeLeftForLaunch.minutesLeft}M
			{$timeLeftForLaunch.secondsLeft}S
		</span>
	</p>
	<img src="/theme/fiji.svg" class="mx-auto w-24" />
</div>
