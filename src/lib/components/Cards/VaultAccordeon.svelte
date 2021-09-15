<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { metaMaskCon } from '$lib/utils/helpers';

	export let tkn0Img;
	export let tkn1Img;

	
	let isHidden: boolean =true;

	const  openAccordeon = ()=>{
		isHidden ? isHidden=false : isHidden=true
		console.log(isHidden);
	}

</script>

<div>
	<div
		on:click={openAccordeon}
		class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md  p-5 usdc_mush_g rounded-t-lg relative"
	>
		<span class="absolute top-0">
			<img class="w-15 inline mt-2" src={tkn0Img} />
		</span>
		<span class="absolute bottom-1 right-1">
			<img class="w-15 inline pt-2" src={tkn1Img} />
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
	{#if !isHidden}
	<div class="bg-gray-100 rounded-b-lg px-8 py-5">
		{#if !$accounts}
			<button
				on:click={metaMaskCon}
				class="w-full bg-green-500  rounded-xl p-2 text-white font-bold text-xl tracking-wide hover:bg-green-600"
				>Unlock
			</button>
		{:else}
			<div class="flex flex-col  lg:flex-row flex-wrapper justify-around">
				<div class="">
					<div class="flex">
						<p class="text-gray-600 font-medium">In Your Wallet:</p>
						<p class="font-bold	px-2">0 Coin</p>
					</div>
					<div class="flex my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm ">
						<input
							placeholder="Enter Value"
							class="bg-gray-300 text-gray-900 font-bold w-8/12"
							type="number"
						/>
						<button class="bg-black text-white hover:bg-green-600 font-bold rounded-lg px-6 py-3 tracking-wide"
							>Approve</button
						>
					</div>
					<div class="flex">
						<p class="text-gray-500 font-bold">Deposit Fee:</p>
						<p class="px-2 text-gray-500 font-bold">0%</p>
					</div>
				</div>

				<div class="pt-4 lg:pt-0">
					<div class="flex">
						<p class="text-gray-600 font-medium">Deposited:</p>
						<p class="font-bold	px-2">0 Coin</p>
					</div>
					<div class="flex my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm">
						<input
							placeholder="Enter Value"
							class="bg-gray-300 text-gray-900 font-bold w-8/12"
							type="number"
						/>
						<button class="bg-black hover:bg-green-600 text-white font-bold rounded-lg px-6 py-3 tracking-wide"
							>Withdraw</button
						>
					</div>
				</div>

				<div class="pt-4 lg:pt-0">
					<div>
						<p class="text-gray-600 font-semibold pb-1">Current Prices:</p>
						<p class="text-gray-800	font-medium ">0.0 Coin</p>
						<p class="text-gray-800 font-medium ">0.0 Coin</p>
						<div class="py-2">
							<a class="block text-gray-600 font-semibold hover:text-green-500" href="">GET Coin</a>
							<a class="block text-gray-600 font-semibold hover:text-green-500" href="">View Info</a
							>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	{/if}
</div>

<style>
	.usdc_mush_g {
		background: linear-gradient(45deg, #4da085 0%, #3b75c9 100%);
	}

	.mush-green {
		background-color: #4da085;
	}

	input {
		font-size: 18px;
		font-weight: bold;
		outline: none;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
