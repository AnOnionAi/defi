<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
</script>

<script lang="ts">
	import WalletBalance from '$lib/components/Dashboard/WalletBalance.svelte';
	import { onMount } from 'svelte';
	import { totalMushSupply, mushMarketCap, poolsTVL, vaultsTVL, farmsTVL } from '$lib/stores/MushMarketStats';
	import { page } from '$app/stores';
	
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
	import MushPriceGraph from '$lib/components/Dashboard/MushPriceGraph.svelte';
	import MushPriceCard from '$lib/components/Dashboard/MushPriceCard.svelte';
	import MushPriceSide from '$lib/components/Dashboard/MushPriceSide.svelte';
	import MushPriceSection from '$lib/components/Dashboard/MushPriceSection.svelte';
import { getPoolsTVL, getPortfolioValue } from '$lib/utils/getPortfolioValue';

	let value = 0;
	let lastPrice = 0;
	let peak = 0;
	let dataLine;
	let myChart;
	let historicalData;
	let prices;
	let dates;


	const tooltipLine = {
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

				historicalData = res.data.prices[0].prices.map((e, i) => {
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
	<SectionTitle title={$_('headers.dashboard.text')} />

	<DashboardSection>
		<WalletBalance slot="wallet" />
		<HighestApy slot="apy" />
		<TotalValueLocked slot="tvl" />
	</DashboardSection>

	<SectionTitle title={$_('dashboard.earn')} />

	<EarnMoreSection>
		<EarnMoreCard
			title={$_('headers.farms.text')}
			primaryText={$farmsTVL?.toFixed(2)}
			secondaryText={$_('dashboard.lockedInFarms')}
			buttonText={$_('dashboard.startFarming')}
			route={`/${$page.params.lang}/farms`}
		/>

		<EarnMoreCard
			title={$_('headers.pools.text')}
			primaryText={$poolsTVL?.toFixed(2)}
			secondaryText={$_('dashboard.lockedInPools')}
			buttonText={$_('dashboard.addLiquidity')}
			route={`/${$page.params.lang}/pools`}
		/>

		<EarnMoreCard
			title={$_('headers.vaults.text')}
			primaryText={$vaultsTVL?.toFixed(2)}
			secondaryText={$_('dashboard.lockedInVaults')}
			buttonText={$_('dashboard.goDeposit')}
			route={`/${$page.params.lang}/vaults`}
		/>
	</EarnMoreSection>

	<SectionTitle title={$_('dashboard.index')} />
	<IndexSection>
		<IndexCard title={$_('dashboard.mushpb')} description="{$mushPerBlock} MUSH" />
		<IndexCard title={$_('dashboard.marketcap')} description="${$mushMarketCap}" />
		<IndexCard title={$_('dashboard.totalvol')} description="{$totalMushSupply} MUSH" />
		<IndexCard title={$_('dashboard.maxsupply')} description="100 M" />
	</IndexSection>

	<SectionTitle title={$_('dashboard.price')} />

	<MushPriceSection>
		<div class="h-92 col-span-9  lg:col-span-6	">
			<ButtonGroup
				options={[
					{ id: 0, name: 'Month' },
					{ id: 1, name: 'Week' },
					{ id: 2, name: 'Day' }
				]}
				selected={value}
				on:change={handleOption}
			/>
			<MushPriceGraph />
		</div>

		<MushPriceSide>
			<MushPriceCard title="Today" display="0.001" />
			<MushPriceCard title="Peak" display="0.001" />
			<MushPriceCard title="Growth" display="3%" />
		</MushPriceSide>
	</MushPriceSection>
</DashboardLayout>
