<script lang="ts">
	import type { BigNumber } from '@ethersproject/bignumber';
	import { getContext } from 'svelte';
	import { parseBigNumberToDecimal, parseBigNumberToInt } from '../../../../utils/balanceParsers';
	export let tokenName;
	export let userStakedTokens: BigNumber;
	export let onWithdraw = (wantAmount?: any) => {};

	const { close } = getContext('simple-modal');

	let wantAmount;
	let onChange = (wantAmount?: any) => {};

	function _onWithdraw() {
		console.log('ejecuta');
		onWithdraw(wantAmount.toString());
		close();
	}

	$: wantAmount: {
		console.log('withDraw', wantAmount);
	}
</script>

<div class="flex flex-col px-9 py-6">
	<div class=" w-full shadow-2xl  shadow-gray-1000 border-2 rounded-3xl border-gray-200 py-3">
		<div />
		<div class="flex justify-between py-1 px-10">
			<p class="text-gray-400 font-semibold tracking-wide">Input</p>
			<div class="flex">
				<div
					on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens))}
					class="text-green-400 rounded-3xl cursor-pointer border border-green-400 text-xs font-semibold tracking-wide mr-1 p-1 hover:bg-green-400 hover:text-light-100"
				>
					MAX
				</div>
				<p class="text-gray-400  font-semibold tracking-wide ">
					Staked: {parseBigNumberToDecimal(userStakedTokens)}
				</p>
			</div>
		</div>
		<div class="flex justify-between py-3 px-10">
			<div>
				<input bind:value={wantAmount} type="number" id="inputDeposit" min="0" placeholder="0.0" />
			</div>
			<div>
				<div />
				<p class="text-gray-400  font-semibold tracking-wide ">{tokenName}</p>
			</div>
		</div>
	</div>
	<p class="text-gray-400  font-semibold tracking-wide mt-5 px-1">Other options:</p>
	<div class="flex justify-between px-4 pt-2">
		<button
			on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(10)))}
			class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500"
		>
			10%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(4)))}
			class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500"
		>
			25%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(2)))}
			class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500"
		>
			50%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(4).mul(3)))}
			class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500"
		>
			75%
		</button>
	</div>

	<div class="flex justify-center mt-9">
		<button
			on:click={_onWithdraw}
			class="w-full p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-300 hover:to-green-500 text-light-100 font-bold tracking-wide "
		>
			WITHDRAW YOUR {tokenName}
		</button>
	</div>
</div>

<style>
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
