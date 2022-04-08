<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { time, _ } from 'svelte-i18n';
	import { isHomescreen } from '$lib/stores/homescreen';

	const launchDate = new Date('14 April 2022 19:00:00');

	let timeleft: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	};

	const updateTimeLeft = () => {
		let dateNow = new Date();

		let seconds = Math.floor((launchDate.getTime() - dateNow.getTime()) / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		hours = hours - days * 24;
		minutes = minutes - days * 24 * 60 - hours * 60;
		seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

		timeleft = {
			days,
			minutes,
			hours,
			seconds
		};
	};

	const intervalID = setInterval(() => {
		updateTimeLeft();
	}, 1000);

	onDestroy(() => {
		clearInterval(intervalID);
	});
</script>

<section
	class="relative flex  h-full select-none flex-col bg-paper dark:bg-darkGrey-900    ">
	<div
		class=" top-0 w-full bg-primary-400 py-4 px-4 dark:bg-analogPurple-300 md:absolute">
		<h2
			class=" hidden text-center text-xl font-semibold text-white md:block md:text-2xl">
			TIME LEFT FOR OFFICIAL LAUNCH:
			{#if timeleft?.days}
				{timeleft.days} DAYS {timeleft.hours} HOURS
				{timeleft.minutes} MINUTES {timeleft.seconds} SECONDS
			{/if}
		</h2>

		<h2
			class="block text-center text-xl font-semibold text-white md:hidden md:text-2xl">
			TIME LEFT FOR OFFICIAL LAUNCH:
			{#if timeleft?.days}
				{timeleft.days}D {timeleft.hours}H
				{timeleft.minutes}M {timeleft.seconds}S
			{/if}
		</h2>
	</div>
	<div
		class=" flex h-full flex-col items-center justify-center py-8 text-neutral-900 dark:text-white">
		<div class="mb-12 flex flex-col items-center">
			<img
				src="/theme/fiji.svg"
				alt="Fiji the Fung"
				class="w-16 md:w-20 lg:w-24 xl:w-28 " />
			<h1
				class="bg-analogMelon-200 bg-gradient-to-t from-primary-400 bg-clip-text p-3 text-5xl font-bold text-transparent dark:bg-gradient-to-b dark:from-triadicYellow-400 dark:to-analogPurple-300 md:text-6xl lg:text-7xl  xl:text-8xl">
				Fung Finance
			</h1>
			<h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
				Make it Mushcoin
			</h2>
		</div>
		<div class="">
			<h3 class="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
				Presenting
			</h3>
			<div class="mt-8 flex flex-col gap-3 py-2 md:flex-row md:gap-6">
				<div class="group">
					<div
						class="flex min-h-[232px] max-w-[260px] cursor-pointer flex-col items-center gap-4 rounded-xl border-2 bg-white px-4 py-5  group-hover:border-primary-300 dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-analogPurple-300">
						<img
							src="/assets/mushCoin.webp"
							alt="The Mushcoin"
							class="h-[36px] w-[36px]" />

						<div>
							<h4
								class="mb-1 text-center text-sm font-medium group-hover:text-primary-400 dark:group-hover:text-analogPurple-300">
								Mush Coin
							</h4>
							<p
								class="text-xs  group-hover:text-primary-300 dark:group-hover:text-analogPurple-300 ">
								MushCoin is how people express their stake in FungFi’s future.
								FungFi is owned by MUSH holders and all fees collected by our
								yield automation products will be distributed through our
								dividend pool from day one.
							</p>
						</div>
					</div>
				</div>

				<div class="group">
					<div
						class="flex min-h-[232px] max-w-[260px] cursor-pointer flex-col items-center gap-4 rounded-xl border-2 bg-white px-4 py-5  group-hover:border-primary-300 dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-analogPurple-300">
						<img
							src="/assets/mushroomFarms.svg"
							alt="The Mushcoin"
							class="h-[36px] w-[36px]" />

						<div>
							<h4
								class="mb-1 text-center text-sm font-medium group-hover:text-primary-400 dark:group-hover:text-analogPurple-300">
								Mushroom Farms
							</h4>
							<p
								class="text-xs group-hover:text-primary-300 dark:group-hover:text-analogPurple-300 ">
								Customers who stake MUSH/USDC LP tokens in FungFi farms will be
								rewarded with MushCoin during the token distribution period.
								there are no deposit or withdrawal fees for staking MUSH/USDC LP
								tokens. We incentivize liquidity on Sushiswap.
							</p>
						</div>
					</div>
				</div>

				<div class="group">
					<div
						class="flex min-h-[232px]  max-w-[260px] cursor-pointer flex-col items-center gap-4 rounded-xl border-2 bg-white px-4 py-5  group-hover:border-primary-300 dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-analogPurple-300">
						<img
							src="/assets/cryptoVault.svg"
							alt="The Mushcoin"
							class="h-[36px] w-[36px]" />

						<div>
							<h4
								class="mb-1 text-center text-sm font-medium group-hover:text-primary-400 dark:group-hover:text-analogPurple-300">
								FungFi Vaults
							</h4>
							<p
								class="text-xs  group-hover:text-primary-300 dark:group-hover:text-analogPurple-300 ">
								Allow users to automatically compound farming tokens back into
								the assets they originally staked. We’ll be launching vaults for
								a a number of different platforms, including Sushiswap. &
								Quickswap.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
