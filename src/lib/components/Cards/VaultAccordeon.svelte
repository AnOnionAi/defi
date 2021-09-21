<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import type { LPair, VaultInfo } from '$lib/ts/types';
	import { getTokenBalance } from '$lib/utils/erc20';
	import { metaMaskCon } from '$lib/utils/helpers';
	import { parseBigNumberToDecimal } from '$lib/utils/balanceParsers';
	import {getTokenPriceUSD} from '$lib/utils/coinGecko'
	import type { BigNumber } from '@ethersproject/bignumber';
	export let tkn0Img;
	export let tkn1Img;
	export let vaultConfig: VaultInfo;

	let userAcc: string;
	let isHidden: boolean = true;
	let depositedTokens;
	let userTokens: BigNumber;
	let apy: string;
	let tvl: string;
	let daily: string;
	
	let tkn0Price: number;
	let tkn1Price: number;

	const unsubscribe = accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
		}
	});

	const openAccordeon = () => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};

	$: if (!isHidden) {
		if (userAcc) {
			getTokenBalance(vaultConfig.pair.pairContract, userAcc).then((balance) => {
				userTokens = balance;
				
			});

			getTokenPriceUSD(vaultConfig.pair.token0Contract).then((response)=> {
				tkn0Price = response[vaultConfig.pair.token0Contract.toLowerCase()].usd
				console.log('Price by const',response[vaultConfig.pair.token0Contract.toLowerCase()].usd)
			})

			getTokenPriceUSD(vaultConfig.pair.token1Contract).then((response)=> {
				tkn1Price = response[vaultConfig.pair.token1Contract.toLowerCase()].usd
				console.log('Price by const',response[vaultConfig.pair.token1Contract.toLowerCase()].usd)
			})

		}
	}
</script>

<div class="my-10">
	<div
		on:click={openAccordeon}
		class="border border-gray-100 hover:cursor-pointer shadow-xl {isHidden == false &&
			'shadow-none'} p-5  rounded-t-lg relative hover:bg-gradient-to-t from-{vaultConfig.platform
			.brandColor}-500 to-{vaultConfig.platform.brandColor}-100"
	>
		<span class="absolute top-0">
			<img class="w-15 inline mt-2" src={tkn0Img} />
		</span>
		<span class="absolute bottom-1 right-1">
			<img class="w-15 inline pt-2" src={tkn1Img} />
		</span>
		<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
			<div class="text-center">
				<p class="font-semibold">
					Earn {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote} LP
				</p>
				<h3 class="text-lg font-bold">
					{vaultConfig.pair.token0quote} || {vaultConfig.pair.token1quote}
				</h3>
			</div>
			<div class="">
				<div class="flex flex-row justify-around ">
					<div class="text-center w-24">
						<div class="font-bold sm:px-3 text-sm">
							{#if apy}
								APY
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-bold text-gray-500 ">APY</div>
					</div>
					<div class="text-center w-24">
						<div class="font-bold sm:px-3 text-sm">
							{#if userTokens}
								{parseBigNumberToDecimal(userTokens)}
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-bold text-gray-500">WALLET</div>
					</div>
				</div>
				<div class="flex flex-row justify-around">
					<div class="text-center w-24">
						<div class="font-bold sm:px-3">
							{#if tvl}
								TVL
							{:else}
								0
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-bold text-gray-500">TVL</div>
					</div>
					<div class="text-center w-24">
						<div class="font-bold sm:px-3">
							{#if daily}
								DAILY
							{:else}
								?
							{/if}
						</div>
						<div class="text-sm sm:px-3 font-bold text-gray-500">DAILY</div>
					</div>
				</div>
			</div>
		</div>
		<p
			class="absolute font-semibold top-0 right-0 p-3 bg-{vaultConfig.platform
				.brandColor}-500  rounded-tr-xl rounded-bl-xl text-white tracking-wide"
		>
			{vaultConfig.platform.name}
		</p>
	</div>
	{#if !isHidden}
		<div class="bg-gray-100 rounded-b-lg px-8 py-5">
			{#if !$accounts}
				<button
					on:click={metaMaskCon}
					class="w-full bg-{vaultConfig.platform
						.brandColor}-500  rounded-xl p-2 text-white font-semibold text-xl tracking-wide "
					>Unlock
				</button>
			{:else}
				<div class="flex flex-col  lg:flex-row flex-wrapper justify-around">
					<div class="">
						<div class="flex">
							<p class="text-gray-600 font-medium">In Your Wallet:</p>
							{#if userTokens}
								<p class="font-bold	px-2">
									{parseBigNumberToDecimal(userTokens)}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{:else}
								<p class="font-bold	px-2">
									Not Avaliable {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1Name}
								</p>
							{/if}
						</div>
						<div class="flex my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm ">
							<input
								placeholder="Enter Value"
								class="bg-gray-300 text-gray-900 font-bold w-8/12"
								type="number"
							/>
							<button
								class="bg-black text-white hover:bg-green-600 font-bold rounded-lg px-6 py-3 tracking-wide"
								>Approve</button
							>
						</div>
						<div class="flex">
							<p class="text-gray-500 font-bold">Deposit Fee:</p>
							<p class="px-2 text-gray-500 font-bold">{vaultConfig.depositFee}%</p>
						</div>
					</div>

					<div class="pt-4 lg:pt-0">
						<div class="flex">
							<p class="text-gray-600 font-medium">Deposited:</p>
							{#if depositedTokens}
								<p class="font-bold	px-2">
									{depositedTokens}
									{vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{:else}
								<p class="font-bold	px-2">
									0 {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}
								</p>
							{/if}
						</div>
						<div class="flex my-2 py-2 px-3 bg-gray-300 rounded-lg max-w-sm">
							<input
								placeholder="Enter Value"
								class="bg-gray-300 text-gray-900 font-bold w-8/12"
								type="number"
							/>
							<button
								class="bg-black hover:bg-green-600 text-white font-bold rounded-lg px-6 py-3 tracking-wide"
								>Withdraw</button
							>
						</div>
					</div>

					<div class="pt-4 lg:pt-0">
						<div>
							<p class="text-gray-600 font-semibold pb-1">Current Prices:</p>
							<p class="text-gray-800	font-medium ">{#if tkn0Price}
								{vaultConfig.pair.token0quote}	${tkn0Price}
								{:else}
								{vaultConfig.pair.token0quote} Not Avaliable
							{/if}</p>
							<p class="text-gray-800 font-medium ">{#if tkn1Price}
								{vaultConfig.pair.token1quote}	${tkn1Price}
								{:else}
								{vaultConfig.pair.token1quote} Not Avaliable
							{/if}</p>
							<div class="py-2">
								<a class="block text-gray-600 font-semibold hover:text-green-500" href=""
									>GET {vaultConfig.pair.token0quote}-{vaultConfig.pair.token1quote}</a
								>
								<a class="block text-gray-600 font-semibold hover:text-green-500" href=""
									>View Info</a
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
