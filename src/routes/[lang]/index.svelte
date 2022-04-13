<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { mushMarketCap } from '$lib/stores/MushMarketStats';
	import { _ } from 'svelte-i18n';

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

	function getLocale(lang) {
		console.log('LANG: ', lang);
		switch (lang) {
			case 'en':
				return 'en-US';
			case 'es':
				return 'es-MX';
			case 'fr':
				return 'fr-FR';
			case 'de':
				return 'de-DE';
			default:
				return 'en-US';
		}
	}
</script>

<section
	class="flex h-full select-none flex-col bg-paper transition duration-500 dark:bg-darkGrey-900    ">
	{#if daysLeft >= 0}
		<div class=" w-full bg-primary-400 py-2 px-6 dark:bg-analogPurple-300 ">
			<h2
				class=" hidden text-center text-xl font-semibold text-white md:block md:text-2xl">
				COUNTDOWN TO LAUNCH T -
				{#if daysLeft >= 0}
					{daysLeft} DAYS {hoursLeft} HOURS
					{minutesLeft} MINUTES {secondsLeft} SECONDS 🚀
				{/if}
			</h2>

			<h2
				class="block text-center text-lg font-semibold text-white md:hidden md:text-2xl">
				COUNTDOWN TO LAUNCH T - <br />
				{#if daysLeft >= 0}
					{daysLeft}D {hoursLeft}H
					{minutesLeft}M {secondsLeft}S 🚀
				{/if}
			</h2>
		</div>
	{/if}
	<div
		class=" flex flex-1 flex-col items-center justify-center text-gray-900 dark:text-white">
		<div class="mb-8 flex flex-col items-center">
			{#if $darkMode}
				<img
					src="/theme/fungfiDarkMode.svg"
					alt="Fung Fi"
					width="400"
					height="300" />
			{:else}
				<img
					src="/theme/liteFungFi.svg"
					alt="Fung Fi"
					width="350"
					height="100" />
			{/if}

			<img
				src="/theme/fiji.svg"
				alt="Fiji the Fung"
				class="w-16 md:w-20 lg:w-24 xl:w-28 " />
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
					<a
						href={`/${$page.params.lang}/dividends`}
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
									MushCoin
								</h5>
								<p class="text-sm  text-gray-600 dark:text-gray-200">
									MushCoin is how people express their stake in FungFi’s future.
									MUSH will be distributed by staking in pools and farms.
								</p>
							</div>
						</div>
					</a>
					<a
						href={`/${$page.params.lang}/farms`}
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
									Mushroom Farms
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									Customers who stake MUSH/USDC LP tokens in FungFi farms will
									be rewarded with MushCoin.
								</p>
							</div>
						</div>
					</a>
					<a
						href={`/${$page.params.lang}/pools`}
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
									Mycelium Pools
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									FungFi users will be able to stake other tokens into our pools
									to start earning $MUSH every second.
								</p>
							</div>
						</div>
					</a>
					<a
						href={`/${$page.params.lang}/vaults`}
						class="group relative bg-white transition hover:z-[1] hover:shadow-2xl dark:bg-neutral-900">
						<div class="relative space-y-8 p-8">
							<img
								src="/assets/vaultExchange.svg"
								class="w-10"
								width="512"
								height="512"
								alt="burger illustration" />
							<div class="space-y-2">
								<h5
									class="text-xl font-medium text-gray-800 transition group-hover:text-primary-400 dark:text-gray-100 dark:group-hover:text-analogPurple-300">
									Fungi Vaults
								</h5>
								<p class="text-sm text-gray-600 dark:text-gray-200">
									Allow users to automatically compound farming tokens back into
									the assets they originally staked.
								</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		<h2 class="makeIt mt-4 font-semibold italic md:text-3xl lg:text-4xl">
			Make It MushCoin !
		</h2>
		<h3 class="mt-4 mb-8 text-xl font-bold md:text-xl lg:text-2xl">
			{$_('home.marketCap')}
			{#if $mushMarketCap}
				{$mushMarketCap.toLocaleString(getLocale(`${$page.params.lang}`), {
					style: 'currency',
					currency: 'USD'
				})}
			{/if}
		</h3>
	</div>
</section>

<style>
	.makeIt {
		text-shadow: 1px 1px 1px #76feec;
	}
</style>
