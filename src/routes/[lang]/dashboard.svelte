<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import WalletBalance from '$lib/components/Dashboard/WalletBalance.svelte';
	import { MasterChef } from '$lib/utils/masterc';
	import { onMount } from 'svelte';
	import { BigNumber, ethers } from 'ethers';
	import { mushPerBlock, totalMushSupply, mushMarketCap } from '$lib/stores/MushMarketStats';
	import { page } from '$app/stores';
	import shortLargeAmount from '$lib/utils/shortLargeAmounts';

	import ButtonGroup from '../../lib/components/Buttons/ButtonGroup.svelte';

	let value = 0;
	let lastPrice = 0;
	let peak = 0;
	let dataLine;
	let myChart;
	let historicalData;
	let prices;
	let dates;

	let tooltipLine = {
		id: 'tooltipLine',
		beforeDraw: (chart) => {
			if (chart.tooltip._active && chart.tooltip._active.length) {
				const ctx = chart.ctx;
				ctx.save();
				const activePoint = chart.tooltip._active[0];

				ctx.beginPath();
				ctx.setLineDash([5, 7]);
				ctx.moveTo(activePoint.element.x, chart.chartArea.top);
				ctx.lineTo(activePoint.element.x, activePoint.element.y);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'red';
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(activePoint.element.x, activePoint.element.y);
				ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'rgba(222, 125, 228, 1)';
				ctx.stroke();

				ctx.beginPath();
				ctx.setLineDash([5, 7]);
				ctx.moveTo(chart.chartArea.left, activePoint.element.y);
				ctx.lineTo(chart.chartArea.right, activePoint.element.y);
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'rgba(222, 125, 228, 1)';
				ctx.stroke();
				ctx.restore();
			}
		}
	};

	let options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	function handleOption(e) {
		value = e.detail.value;
		let range = 31;

		switch (value) {
			case 0:
				range = 31;
				break;
			case 1:
				range = 7;
				break;
			case 2:
				range = 2;
				break;

			default:
				range = 31;
				break;
		}
		filterOption(range);

		myChart.config.data.datasets[0].data = prices;
		myChart.config.data.labels = dates.map((e) => e[1]);
		myChart.update();
	}

	function filterOption(range) {
		dates = historicalData
			.filter((e, i) => i < range)
			.map((e) => [e.date, e.shortDate])
			.reverse();
		prices = historicalData
			.filter((e, i) => i < range)
			.map((e) => e.price)
			.reverse();
	}

	onMount(() => {
		const APIURL =
			'https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/137/USD/0x627F699300A9D693FBB84F9Be0118D17A1387D4e/?quote-currency=USD&format=JSON&from=2021-11-29&to=2022-12-31&key=ckey_dd9ac67c651d4e54bd3483e3c17';

		fetch(APIURL)
			.then((res) => res.json())
			.then((res) => {
				let monthsName = [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				];

				historicalData = res.data[0].prices.map((e, i) => {
					let shortDate = monthsName[e.date.split('-')[1] - 1] + '-' + e.date.split('-')[2];
					return { ...e, shortDate };
				});

				lastPrice = [...historicalData].reverse()[historicalData.length - 1].price.toFixed(5);
				let tempPrices = [...historicalData].map((e) => e.price).reverse();
				peak = Math.max(...tempPrices).toFixed(5);

				dataLine = {
					labels: historicalData.map((e) => e.shortDate).reverse(),
					datasets: [
						{
							label: 'Mush Price',
							scaleOverride: true,
							scaleStartValue: 0.00001,
							fill: true,
							lineTension: 0,
							backgroundColor: 'rgba(225, 204,230, .3)',
							borderColor: 'rgb(75, 192, 192)',
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: 'rgba(222, 125, 228, 1)',
							pointBackgroundColor: 'rgb(75, 192, 192)',
							pointBorderWidth: 10,
							pointHoverRadius: 0.5,
							pointHoverBackgroundColor: 'rgba(222, 125, 228, 1)',
							pointHoverBorderColor: 'rgba(222, 125, 228, 1)',
							pointHoverBorderWidth: 2,
							pointRadius: 0.5,
							pointHitRadius: 10,
							data: historicalData.map((e) => e.price).reverse()
						}
					]
				};

				let config = {
					type: 'line',
					data: dataLine,
					options: options,
					plugins: [tooltipLine]
				};

				myChart = new Chart(document.getElementById('mush-chart'), config);
			});
	});
</script>

<div in:fade={{ duration: 300 }}>
	<div class=" max-w-screen-xl   mx-auto  p-2 mt-10">
		<h2 class="font-bold  text-4xl md:text-5xl  px-5 text-center lg:text-left dark:text-white">
			{$_('headers.dashboard.text')}
		</h2>
		<div class="flex flex-wrap   h-auto mt-5">
			<div
				class="flex flex-wrap h-auto   w-full  p-1 mb-5 mx-auto lg:mx-1 lg:justify-between justify-center mb-10"
			>
				<div class="w-screen-sm lg:flex-shrink-0 mb-3 lg:mb-0 ">
					<WalletBalance />
				</div>
				<div
					class="bg-white dark:bg-dark-800 rounded-lg p-6 h-60 w-screen-sm  lg:w-8/24 lg:flex-shrink-0 border border-gray-300   dark:border-green-500 shadow-lg "
				>
					<div class="pl-2 flex items-center">
						<p class=" text-xl text-gray-600 font-light tracking-wide dark:text-white">
							{$_('dashboard.tvl')} (TVL)
						</p>
					</div>
					<div class="flex  h-10/12 w-full justify-center items-center pt-2">
						<div class="">
							<div class="flex w-full justify-center items-center">
								<p class="text-3xl font-semibold text-center mt-2 dark:text-white">$0</p>
							</div>

							<p class="mt-1 font-medium text-gray-600 text-sm dark:text-white">
								{$_('dashboard.across')}
							</p>
						</div>
					</div>
				</div>
			</div>
			<h2
				class="font-bold  px-5 w-full text-center lg:text-left text-4xl md:text-5xl dark:text-white"
			>
				{$_('dashboard.earn')}
			</h2>
			<div
				class="  w-full  p-1 mb-5 flex flex-wrap  justify-center lg:justify-between   lg:flex-row lg:w-full mt-5"
			>
				<!-- FarmCard -->
				<div
					class=" lg:w-30/100 max-w-screen-sm  min-w-sm md:min-w-screen-sm md:mx-auto lg:min-w-0 mb-6"
				>
					<div
						class="flex flex-col justify-between bg-white dark:bg-dark-800  rounded-lg px-2 py-5 h-60 border border-gray-300 dark:border-green-500  shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src="/farmerIcon.png" class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-light tracking-wider text-xl dark:text-white">
								{$_('headers.farms.text')}
							</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-semibold dark:text-white">$29,574.12</p>
							<p class="text-gray-700 font-medium text-sm dark:text-white">
								{$_('dashboard.lockedInFarms')}
							</p>
							<button
								class="border border-green-500 rounded-lg py-2 px-3  flex items-center hover:text-white hover:bg-green-400"
							>
								<p class="font-medium pr-1 dark:text-white">{$_('dashboard.startFarming')}</p>
								<img src="/hoe.png" alt="farming hoe" />
							</button>
						</div>
					</div>
				</div>
				<!-- FarmCard -->
				<div
					class="lg:w-30/100 max-w-screen-sm  min-w-sm md:min-w-screen-sm md:mx-auto lg:min-w-0 mb-6"
				>
					<div
						class="flex flex-col justify-between bg-white dark:bg-dark-800  rounded-lg px-2 py-5 h-60 border border-gray-300 dark:border-green-500 shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src="/poolIcon.png" class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-light text-xl dark:text-white">
								{$_('headers.pools.text')}
							</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-semibold dark:text-white">$40,112.99</p>
							<p class="text-gray-700 font-medium text-sm dark:text-white">
								{$_('dashboard.lockedInPools')}
							</p>
							<button
								class="border border-green-500 rounded-lg py-2 px-5  flex items-center hover:text-white hover:bg-green-400"
							>
								<p class="font-medium pr-1 dark:text-white">{$_('dashboard.addLiquidity')}</p>
								<div class="flex relative">
									<img src="/vaultTokensIcons/wbtc.svg" alt="btc" class="h-5 w-5" />
									<img
										src="/vaultTokensIcons/dai.svg"
										alt="daiToken"
										class="h-5 w-5 absolute left-3"
									/>
								</div>
							</button>
						</div>
					</div>
				</div>
				<!--Pool Card-->
				<div
					class="lg:w-30/100 max-w-screen-sm  min-w-sm md:min-w-screen-sm md:mx-auto lg:min-w-0 mb-6"
				>
					<div
						class="flex flex-col justify-between bg-white dark:bg-dark-800 rounded-lg px-2 py-5 h-60 border border-gray-300 dark:border-green-500 shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src="/vaultIcon.png" class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-light text-xl dark:text-white ">
								{$_('headers.vaults.text')}
							</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-semibold dark:text-white">$20,907.17</p>
							<p class="text-gray-700 font-medium text-sm dark:text-white">
								{$_('dashboard.lockedInVaults')}
							</p>
							<button
								class="border border-green-500 rounded-lg py-2 px-5  flex items-center hover:text-white hover:bg-green-400"
							>
								<p class="font-medium pr-1 dark:text-white">{$_('dashboard.goDeposit')}</p>
								<div class="flex relative">
									<img src="/vaultTokensIcons/usdc.svg" alt="mushToken" class="h-5 w-5" />
									<img
										src="/vaultTokensIcons/usdt.svg"
										alt="daiToken"
										class="h-5 w-5 absolute left-3"
									/>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			<h2
				class="font-bold text-4xl md:text-5xl px-5 mt-5 mb-5 text-center w-full text-center lg:text-left dark:text-white"
			>
				{$_('dashboard.index')}
			</h2>
			<div class="  w-full h-auto p-1 mb-5 flex flex-wrap justify-between">
				<div
					class="  w-full lg:w-6/12 mb-2 flex flex-wrap justify-around sm:px-1 md:px-8  lg:px-0 "
				>
					<div
						class="bg-white dark:bg-dark-800 rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 dark:border-green-500 shadow-md"
					>
						<div class="p-4">
							<p
								class="pl-1 text-gray-600 font-light md:text-lg text-md tracking-wide dark:text-white"
							>
								{$_('dashboard.mushpb')}
							</p>
							<div class="flex flex-col h-21 items-center justify-center">
								{#if $mushPerBlock}
									<p in:fade={{duration: 1000}} class="text-2xl tracking-tighter font-semibold dark:text-white">
										{$mushPerBlock} MUSH
									</p>
								{/if}
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>

					<div
						class="bg-white dark:bg-dark-800 rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 dark:border-green-500 shadow-md"
					>
						<div class="p-4">
							<p 
								class="pl-1 text-gray-600 font-light md:text-lg text-md tracking-wide dark:text-white"
							>
								{$_('dashboard.marketcap')}
							</p>
							<div class="flex flex-col h-21 items-center justify-center dark:text-white">
								{#if $mushMarketCap}
									<p in:fade={{duration: 1000}} class="text-2xl tracking-tighter font-semibold">
										${$page.params.lang == 'es'
											? $mushMarketCap.toLocaleString('es-ES')
											: $mushMarketCap.toLocaleString('en-US')} USD
									</p>
								{/if}
							</div>
						</div>
					</div>
				</div>

				<div
					class="  w-full lg:w-6/12 mb-2 flex flex-wrap justify-around sm:px-1 md:px-8  lg:px-0 "
				>
					<div
						class="bg-white dark:bg-dark-800 rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 dark:border-green-500 shadow-md"
					>
						<div class="p-4">
							<p
								class="pl-1 text-gray-600 font-light md:text-lg text-md tracking-wide dark:text-white"
							>
								{$_('dashboard.totalvol')}
							</p>
							<div class="flex flex-col h-21 items-center justify-center dark:text-white">
								{#if $totalMushSupply}
									<p in:fade={{duration: 1000}} class="text-2xl font-semibold">{shortLargeAmount($totalMushSupply)}</p>
								{/if}
							</div>
						</div>
					</div>

					<div
						class="bg-white dark:bg-dark-800 rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300  dark:border-green-500 shadow-md"
					>
						<div class="p-4">
							<p
								class="pl-1 text-sm text-gray-600 font-light md:text-lg text-md tracking-wide dark:text-white"
							>
								{$_('dashboard.maxsupply')}
							</p>
							<div class="flex flex-col h-21 items-center justify-center dark:text-white">
								<p class="text-2xl font-semibold">700 M</p>
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<p
				class="font-bold text-4xl md:text-5xl px-5 mt-5 mb-5 text-center w-full text-center lg:text-left dark:text-white"
			>
				{$_('dashboard.price')}
			</p>

			<ButtonGroup
				options={[
					{ id: 0, name: 'Month' },
					{ id: 1, name: 'Week' },
					{ id: 2, name: 'Day' }
				]}
				selected={value}
				on:change={handleOption}
			/>

			<div class="w-full h-auto flex flex-col lg:flex-row flex-wrap">
				<div class="w-full lg:w-18/24 ">
					<div class="p-4 pb-2 lg:p-5 h-full">
						<div
							class="bg-white dark:bg-dark-800 rounded-lg w-full h-full p-2 border border-gray-300 dark:border-green-500 shadow-md"
						>
							<canvas id="mush-chart" />

							<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
						</div>
					</div>
				</div>

				<div class="w-full lg:w-6/24  ">
					<div class="w-full  h-26 md:h-36 lg:h-full flex lg:flex-col justify-around p-4 gap-2">
						<div
							class="bg-white dark:bg-dark-800 rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 dark:border-green-500 shadow-md"
						>
							<p class="pl-2 font-light h-3/12  text-sm md:text-lg dark:text-white">
								{$_('dashboard.today')}
							</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-medium  md:text-2xl dark:text-white">${lastPrice}</p>
							</div>
						</div>

						<div
							class="bg-white dark:bg-dark-800 rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 dark:border-green-500 shadow-md"
						>
							<p class="pl-2 font-light h-3/12 text-sm md:text-lg dark:text-white">
								{$_('dashboard.peak')}
							</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-medium  md:text-2xl dark:text-white">${peak}</p>
							</div>
						</div>

						<div
							class="bg-white dark:bg-dark-800 rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 dark:border-green-500 shadow-md"
						>
							<p class="pl-2 font-light h-3/12 text-sm md:text-lg dark:text-white">
								{$_('dashboard.profit')}
							</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-medium  md:text-2xl dark:text-white">3.5%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
