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
	import { totalMushSupply, mushMarketCap } from '$lib/stores/MushMarketStats';
	import { page } from '$app/stores';
	import shortLargeAmount from '$lib/utils/shortLargeAmounts';
	import { getTokenPriceUSD } from '$lib/utils/coinGecko';
	import { mushPerBlock } from '$lib/stores/MasterChefData';

	import ButtonGroup from '../../lib/components/Buttons/ButtonGroup.svelte';
import TotalValueLocked from '$lib/components/Dashboard/TotalValueLocked.svelte';
import HighestApy from '$lib/components/Dashboard/HighestApy.svelte';
import EarnMoreCard from '$lib/components/Dashboard/EarnMoreCard.svelte';
import IndexCard from '$lib/components/Dashboard/IndexCard.svelte';
import IndexSection from '$lib/components/Dashboard/IndexSection.svelte';
import EarnMoreSection from '$lib/components/Dashboard/EarnMoreSection.svelte';
import SectionTitle from '$lib/components/Dashboard/SectionTitle.svelte';
import DashboardSection from '$lib/components/Dashboard/DashboardSection.svelte';
import DashboardLayout from '$lib/components/Dashboard/DashboardLayout.svelte';

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

		<DashboardLayout>

		<SectionTitle title={$_('headers.dashboard.text')}/>
		
			<DashboardSection>
				<div class="col-start-1 col-end-11 md:col-start-2 md:col-end-10 lg:col-start-3 lg:col-end-9 xl:col-start-1 xl:col-end-5">
					<WalletBalance/>
				</div>
	
				<div class="col-start-1 col-end-6 xl:col-start-5 xl:col-end-8">
					<HighestApy/>
				</div>
	
				<div class="col-start-6 col-end-11 xl:col-start-8 xl:col-end-11">
					<TotalValueLocked/>
				</div>
			</DashboardSection>
			

			<SectionTitle title={$_('dashboard.earn')}/>
			
			<EarnMoreSection>
				<EarnMoreCard 
				title={$_('headers.farms.text')} 
				primaryText={"$300.41"}
				secondaryText={$_('dashboard.lockedInFarms')}
				buttonText={$_('dashboard.startFarming')}
				route=""/>
				<!-- FarmCard -->
				<EarnMoreCard 
				title={$_('headers.pools.text')} 
				primaryText={"$300.41"}
				secondaryText={$_('dashboard.lockedInFarms')}
				buttonText={$_('dashboard.startFarming')}
				route=""/>
				<!--Pool Card-->
				<EarnMoreCard 
				title={$_('headers.vaults.text')} 
				primaryText={"$300.41"}
				secondaryText={$_('dashboard.lockedInFarms')}
				buttonText={$_('dashboard.startFarming')}
				route=""/>
			</EarnMoreSection>
				<!-- FarmCard -->
				
			<SectionTitle title={$_('dashboard.index')}/>
			<IndexSection>
				<IndexCard title="Test" description="Lorem" />
				<IndexCard title="Test" description="Lorem" />
				<IndexCard title="Test" description="Lorem" />
				<IndexCard title="Test" description="Lorem" />
			</IndexSection>


			
			<SectionTitle title={$_('dashboard.price')}/>
			
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
		

	</DashboardLayout>

