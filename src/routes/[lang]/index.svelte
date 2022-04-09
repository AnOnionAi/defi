<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { time, _ } from 'svelte-i18n';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { CurvePath } from 'three';
	import { mushMarketCap } from '$lib/stores/MushMarketStats';

	const launchDate = new Date('14 April 2022 19:00:00');

	$: daysLeft = 0;
	$: hoursLeft = 0;
	$: minutesLeft = 0;
	$: secondsLeft = 0;

	const updateTimeLeft = () => {
		let dateNow = new Date();

		let seconds = Math.floor((launchDate.getTime() - dateNow.getTime()) / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		hours = hours - days * 24;
		minutes = minutes - days * 24 * 60 - hours * 60;
		seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

		daysLeft = days;
		hoursLeft = hours;
		minutesLeft = minutes;
		secondsLeft = seconds;
	};

	const intervalID = setInterval(() => {
		updateTimeLeft();
	}, 1000);

	onDestroy(() => {
		clearInterval(intervalID);
	});
</script>

<section
	class="flex h-full select-none  flex-col bg-paper transition duration-500 dark:bg-darkGrey-900    ">
	<div class=" w-full bg-primary-400 py-4 px-6 dark:bg-analogPurple-300 ">
		<h2
			class=" hidden text-center text-xl font-semibold text-white md:block md:text-2xl">
			TIME LEFT FOR OFFICIAL LAUNCH:
			{#if daysLeft}
				{daysLeft} DAYS {hoursLeft} HOURS
				{minutesLeft} MINUTES {secondsLeft} SECONDS 🚀
			{/if}
		</h2>

		<h2
			class="block text-center text-lg font-semibold text-white md:hidden md:text-2xl">
			TIME LEFT FOR OFFICIAL LAUNCH: <br />
			{#if daysLeft}
				{daysLeft}D {hoursLeft}H
				{minutesLeft}M {secondsLeft}S 🚀
			{/if}
		</h2>
	</div>
	<div
		class=" flex flex-1 flex-col items-center justify-center py-8 text-gray-900 dark:text-white">
		<div class="mb-10 flex flex-col items-center">
			<img
				src="/theme/fiji.svg"
				alt="Fiji the Fung"
				class="w-16 md:w-20 lg:w-24 xl:w-28 " />
			<h1
				class="bg-analogMelon-200 bg-gradient-to-t from-primary-400 bg-clip-text p-3 text-4xl font-bold text-transparent dark:bg-gradient-to-b dark:from-triadicYellow-400 dark:to-analogPurple-300 md:text-6xl lg:text-7xl  xl:text-8xl">
				Fung Finance
			</h1>
			<h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">
				Make It Mushcoin!
			</h2>
			<h3 class=" mt-4 text-xl font-semibold md:text-xl lg:text-2xl">
				Market Cap :
				{#if $mushMarketCap}
					{$mushMarketCap.toLocaleString(
						`${$page.params.lang}-${$page.params.lang}`,
						{
							style: 'currency',
							currency: 'USD'
						}
					)}
				{/if}
			</h3>
		</div>
		<div class="px-6">
			<p
				class="text-center text-lg font-medium text-gray-600 dark:text-gray-200 md:text-left">
				Presents
			</p>
			<h3 class="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
				The Revolution of Decentralized Finance
			</h3>
		</div>

		<div class="overflow-hidden  py-2">
			<div class="container m-auto space-y-2 px-8 text-gray-500 md:px-12">
				<div
					class="mt-4    grid divide-x divide-y overflow-hidden rounded-xl border dark:divide-neutral-700 dark:border-neutral-700 sm:grid-cols-2 lg:grid-cols-3 lg:divide-y-0 xl:grid-cols-4">
					<div
						class="group relative bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-neutral-900">
						<div class="relative space-y-8 p-8">
							<img
								src="/assets/mushcoin.webp"
								class="w-10"
								width="512"
								height="512"
								alt="burger illustration" />

							<div class="space-y-2">
								<h5
									class="text-xl font-medium text-gray-800 transition group-hover:text-primary-400 dark:text-gray-100 dark:group-hover:text-analogPurple-300">
									Mush Coin
								</h5>
								<p class="text-sm  text-gray-600 dark:text-gray-200">
									MushCoin is how people express their stake in FungFi’s future.
									MUSH will be distributed by staking in pools and farms.
								</p>
							</div>
							<a
								href="#"
								class="flex items-center justify-between group-hover:text-primary-400 dark:text-gray-200 dark:group-hover:text-analogPurple-300">
								<span
									class="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
									>&RightArrow;</span>
							</a>
						</div>
					</div>
					<div
						class="group relative bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-neutral-900">
						<div class="relative space-y-8 p-8">
							<img
								src="/assets/mushroomFarms.svg"
								class="w-10"
								width="512"
								height="512"
								alt="burger illustration" />

							<div class="space-y-2">
								<h5
									class="text-xl font-medium text-gray-800 transition group-hover:text-primary-400 dark:text-gray-100 dark:group-hover:text-analogPurple-300">
									Farms
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									Customers who stake MUSH/USDC LP tokens in FungFi farms will
									be rewarded with MushCoin.
								</p>
							</div>
							<a
								href="#"
								class="flex items-center justify-between group-hover:text-primary-400  dark:text-gray-200 dark:group-hover:text-analogPurple-300">
								<span
									class="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
									>&RightArrow;</span>
							</a>
						</div>
					</div>
					<div
						class="group relative bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-neutral-900">
						<div class="relative space-y-8 p-8">
							<img
								src="/assets/pool.svg"
								class="w-10"
								width="512"
								height="512"
								alt="burger illustration" />

							<div class="space-y-2">
								<h5
									class="text-xl font-medium text-gray-800 transition group-hover:text-primary-400 dark:text-gray-100 dark:group-hover:text-analogPurple-300">
									Pools
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									FungFi users will be able to stake other tokens into our pools
									to start earning $MUSH every second.
								</p>
							</div>
							<a
								href="#"
								class="flex items-center justify-between group-hover:text-primary-400 dark:text-gray-200 dark:group-hover:text-analogPurple-300">
								<span
									class="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
									>&RightArrow;</span>
							</a>
						</div>
					</div>
					<div
						class="group relative bg-gray-100 transition hover:z-[1] hover:shadow-2xl dark:bg-neutral-900 lg:hidden xl:block">
						<div
							class="relative space-y-8 rounded-lg border-dashed p-8 transition duration-300 group-hover:scale-90 group-hover:border group-hover:bg-white dark:group-hover:bg-neutral-800">
							<img
								src="/assets/vaultExchange.svg"
								class="w-10"
								width="512"
								height="512"
								alt="burger illustration" />

							<div class="space-y-2">
								<h5
									class="text-xl font-medium text-gray-800 transition group-hover:text-primary-400 dark:text-gray-100 dark:group-hover:text-analogPurple-300">
									FungFi Vaults
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									Allow users to automatically compound farming tokens back into
									the assets they originally staked.
								</p>
							</div>
							<a
								href="#"
								class="flex items-center justify-between group-hover:text-primary-400 dark:text-gray-200 dark:group-hover:text-analogPurple-300">
								<span
									class="-translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
									>&RightArrow;</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
