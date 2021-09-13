<script context="module" lang="ts">
	export const prerender = false;

	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	export async function load({ page }) {
		const { lang } = page.params;
		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">
	import wbtc from '/static/wbtc.png';
	import eth from '/static/eth.png';
	import usdc from '/static/usdc.png';
	import matic from '/static/matic.png';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
</script>

<section>
	<h1 class="text-dark-200 dark:text-white text-4xl">V A U L T S</h1>
	<div class="w-11/12 mx-auto">

		<VaultAccordeon tkn0Img={usdc} tkn1Img={eth}/>
		<div
			class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md my-5 p-5 usdc_mush_g rounded-xl relative"
		>
			<span class="absolute top-0">
				<img class="w-15 inline mt-2" src={usdc} />
			</span>
			<span class="absolute bottom-1 right-1">
				<img class="w-15 inline pt-2" src={eth} />
			</span>
			<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
				<div class="text-center">
					<p class="font-semibold">Earn USDC-MUSH LP</p>
					<h3 class="text-lg font-bold">USDC || ETH</h3>
				</div>
				<div class="mt-2">
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">APY</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">wallet</div>
						</div>
					</div>
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">TVL</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">DAILY</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="absolute shadow-md font-semibold top-0 right-0 p-3 mush-green rounded-tr-xl rounded-bl-xl"
			>
				QuickSwap
			</p>
		</div>

		<div
			class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md matic_mush_g my-5 p-5 bg-gray-50 rounded-xl relative"
		>
			<span class="absolute top-0">
				<img class="w-15 mt-2" src={eth} />
			</span>
			<span class="absolute bottom-1 right-1">
				<img class="w-15 inline pt-2" src={usdc} />
			</span>
			<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
				<div class="text-center">
					<p class="font-semibold">Earn ETH-USDC LP</p>
					<h3 class="text-lg font-bold">ETH || USDC</h3>
				</div>
				<div class="mt-2">
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">APY</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">wallet</div>
						</div>
					</div>
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">TVL</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">DAILY</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="absolute shadow-md font-semibold top-0 right-0 p-3 mush-green rounded-tr-xl rounded-bl-xl"
			>
				QuickSwap
			</p>
		</div>
		<div
			class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md dyfn_mush_g my-5 p-5 bg-gray-50 rounded-xl relative"
		>
			<span class="absolute top-0">
				<img class="w-15 mt-2" src={eth} />
			</span>
			<span class="absolute bottom-1 right-1">
				<img class="w-15 inline pt-2" src={matic} />
			</span>
			<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
				<div class="text-center">
					<p class="font-semibold">Earn ETH-MATIC LP</p>
					<h3 class="text-lg font-bold">ETH || MATIC</h3>
				</div>
				<div class="mt-2">
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">APY</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">wallet</div>
						</div>
					</div>
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">TVL</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">DAILY</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="absolute shadow-md font-semibold top-0 right-0 p-3 mush-green rounded-tr-xl rounded-bl-xl"
			>
				QuickSwap
			</p>
		</div>
		<div
			class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md sushi_mush_g my-5 p-5 bg-gray-50 rounded-xl relative"
		>
			<span class="absolute top-0">
				<img class="w-20 mt-2" src={wbtc} />
			</span>
			<span class="absolute bottom-1 right-1">
				<img class="w-15 inline pt-2" src={eth} />
			</span>
			<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
				<div class="text-center">
					<p class="font-semibold">Earn WBTC-ETH LP</p>
					<h3 class="text-lg font-bold">WBTC || ETH</h3>
				</div>
				<div class="mt-2">
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">APY</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">wallet</div>
						</div>
					</div>
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">TVL</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm font-semibold sm:px-3 text-gray-900">DAILY</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="absolute shadow-md font-semibold top-0 right-0 p-3 mush-green rounded-tr-xl rounded-bl-xl"
			>
				QuickSwap
			</p>
		</div>
	</div>
</section>

<style>
	.mush-green {
		background-color: #4da085;
	}

	.usdc_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #3b75c9 100%);
	}
	.matic_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #4b91f9 100%);
	}
	.sushi_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #e84e9a 100%);
	}
	.dyfn_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #ae7581 100%);
	}
</style>
