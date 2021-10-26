<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';

	export async function load({ page }) {
		const { lang } = page.params;

		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">
	import WalletBalance from '$lib/components/Dashboard/WalletBalance.svelte';
	import farmerIcon from '/static/farmerIcon.png';
	import hoe from '/static/hoe.png';
	import poolIcon from '/static/poolIcon.png';
	import vaultIcon from '/static/vaultIcon.png';
	import usdc from '/static/vaultTokensIcons/usdc.svg';
	import usdt from '/static/vaultTokensIcons/usdt.svg';

	import btc from '/static/vaultTokensIcons/wbtc.svg';
	import dai from '/static/vaultTokensIcons/dai.svg';
</script>

<div class="">
	<div class=" max-w-screen-xl   mx-auto  p-2 mt-10">
		<h2 class="font-bold  text-4xl md:text-5xl  px-5 text-center lg:text-left">Dashboard</h2>
		<div class="flex flex-wrap   h-auto mt-5">
			<div
				class="flex flex-wrap h-auto   w-full  p-1 mb-5 mx-auto lg:mx-1 lg:justify-between justify-center mb-10"
			>
				<div class="w-screen-sm lg:flex-shrink-0 mb-3 lg:mb-0 ">
					<WalletBalance />
				</div>
				<div
					class="bg-white rounded-lg p-6 h-60 w-screen-sm  lg:w-8/24 lg:flex-shrink-0 border border-gray-300 shadow-lg"
				>
					<div class="pl-2 flex items-center">
						<p class=" text-xl text-gray-600 font-bold tracking-wide">Total Value Locked (TVL)</p>
					</div>
					<div class="flex  h-10/12 w-full justify-center items-center pt-2">
						<div class="">
							<div class="flex w-full justify-center items-center">
								<p class="text-3xl font-bold text-center mt-2">$100305.51</p>
							</div>

							<p class="mt-1 font-medium text-gray-600 text-sm">Across all Fung Financial</p>
						</div>
					</div>
				</div>
			</div>
			<h2 class="font-bold  px-5 w-full text-center lg:text-left text-4xl md:text-5xl ">
				Earn More
			</h2>
			<div
				class="  w-full  p-1 mb-5 flex flex-wrap  justify-center lg:justify-between   lg:flex-row lg:w-full mt-5"
			>
				<!-- FarmCard -->
				<div
					class=" lg:w-30/100 max-w-screen-sm  min-w-sm md:min-w-screen-sm md:mx-auto lg:min-w-0 mb-6"
				>
					<div
						class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60 border border-gray-300 shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src={farmerIcon} class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-bold tracking-wider text-xl">Farms</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-bold">$29,574.12</p>
							<p class="text-gray-700 font-semibold text-sm">Locked In Mush Farms</p>
							<button class="border border-green-500 rounded-lg py-2 px-3  flex items-center">
								<p class="font-semibold pr-1">Start Farming</p>
								<img src={hoe} alt="farming hoe" />
							</button>
						</div>
					</div>
				</div>
				<!-- FarmCard -->
				<div
					class="lg:w-30/100 max-w-screen-sm  min-w-sm md:min-w-screen-sm md:mx-auto lg:min-w-0 mb-6"
				>
					<div
						class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60 border border-gray-300 shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src={poolIcon} class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-bold text-xl">Pools</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-bold">$40,112.99</p>
							<p class="text-gray-700 font-semibold text-sm">Locked In Poly Pools</p>
							<button class="border border-green-500 rounded-lg py-2 px-5  flex items-center">
								<p class="font-semibold pr-1">Add Liquidity</p>
								<div class="flex relative">
									<img src={btc} alt="mushToken" class="h-5 w-5" />
									<img src={dai} alt="daiToken" class="h-5 w-5 absolute left-3" />
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
						class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60 border border-gray-300 shadow-md"
					>
						<div class="pl-4 flex flex items-center">
							<img src={vaultIcon} class="h-12 w-12" alt="" />
							<p class="ml-2 text-gray-600 font-bold text-xl">Vaults</p>
						</div>
						<div class="flex flex-col items-center pb-3 gap-2">
							<p class="text-3xl tracking-wide font-bold">$20,907.17</p>
							<p class="text-gray-700 font-semibold text-sm">Locked In Zyber Vaults</p>
							<button class="border border-green-500 rounded-lg py-2 px-5  flex items-center">
								<p class="font-semibold pr-1">Go Deposit</p>
								<div class="flex relative">
									<img src={usdc} alt="mushToken" class="h-5 w-5" />
									<img src={usdt} alt="daiToken" class="h-5 w-5 absolute left-3" />
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			<h2
				class="font-bold text-4xl md:text-5xl px-5 mt-5 mb-5 text-center w-full text-center lg:text-left"
			>
				Index
			</h2>
			<div class="  w-full h-auto p-1 mb-5 flex flex-wrap justify-between">
				<div
					class="  w-full lg:w-6/12 mb-2 flex flex-wrap justify-around sm:px-1 md:px-8  lg:px-0 "
				>
					<div
						class="bg-white rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 shadow-md"
					>
						<div class="p-4">
							<p class="pl-1 text-gray-600 font-bold md:text-lg text-md tracking-wide">
								MUSH per block
							</p>
							<div class="flex flex-col h-21 items-center justify-center">
								<p class="text-3xl tracking-tighter font-bold">1 MUSH</p>
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>

					<div
						class="bg-white rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 shadow-md"
					>
						<div class="p-4">
							<p class="pl-1 text-gray-600 font-bold md:text-lg text-md tracking-wide">
								Market Cap
							</p>
							<div class="flex flex-col h-21 items-center justify-center">
								<p class="text-3xl tracking-tighter font-bold">$1.45 K</p>
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>
				</div>

				<div
					class="  w-full lg:w-6/12 mb-2 flex flex-wrap justify-around sm:px-1 md:px-8  lg:px-0 "
				>
					<div
						class="bg-white rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 shadow-md"
					>
						<div class="p-4">
							<p class="pl-1 text-gray-600 font-bold md:text-lg text-md tracking-wide">
								Total Volume
							</p>
							<div class="flex flex-col h-21 items-center justify-center">
								<p class="text-3xl font-bold">300.25 M</p>
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>

					<div
						class="bg-white rounded w-49/100  max-w-screen-sm md:w-49/100 mb-2 md:mb-0 h-34 border border-gray-300 shadow-md"
					>
						<div class="p-4">
							<p class="pl-1 text-gray-600 font-bold md:text-lg text-md tracking-wide">
								Max Supply
							</p>
							<div class="flex flex-col h-21 items-center justify-center">
								<p class="text-3xl font-bold">700 M</p>
								<p class="text-xs font-medium text-gray-600" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<p
				class="font-bold text-4xl md:text-5xl px-5 mt-5 mb-5 text-center w-full text-center lg:text-left"
			>
				Mush Price:
			</p>
			<div class="w-full h-auto flex flex-wrap">
				<div class="w-full lg:w-18/24 ">
					<div class="p-4 pb-2 lg:p-5 h-full">
						<div class="bg-white rounded-lg w-full h-full p-6 border border-gray-300 shadow-md">
							<img src="/graphSample.jpg" class="h-full w-full" />
						</div>
					</div>
				</div>
				<div class="w-full lg:w-6/24  ">
					<div class="w-full  h-26 md:h-36 lg:h-full flex lg:flex-col justify-around p-4 gap-2">
						<div
							class="bg-white rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 shadow-md"
						>
							<p class="pl-2 font-semibold h-3/12  text-sm md:text-lg">Today</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-bold text-lg md:text-3xl">$0.00001</p>
							</div>
						</div>

						<div
							class="bg-white rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 shadow-md"
						>
							<p class="pl-2 font-semibold h-3/12 text-sm md:text-lg">Peak</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-bold text-lg md:text-3xl">$0.00002</p>
							</div>
						</div>

						<div
							class="bg-white rounded-lg w-full h-full lg:h-3/12 p-3 border border-gray-300 shadow-md"
						>
							<p class="pl-2 font-semibold h-3/12 text-sm md:text-lg">Profit</p>
							<div class="flex w-full h-9/12 justify-center items-center">
								<p class="font-bold text-lg md:text-3xl">3.5%</p>
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
