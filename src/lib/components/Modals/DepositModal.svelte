<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BigNumber } from 'ethers';
	import { getContext } from 'svelte';
	import type { PoolInfo } from '$lib/ts/types';
	import {
		parseBigNumberToDecimal,
		parseBigNumberToInt,
		parseBigNumberToString
	} from '$lib/utils/balanceParsers';
import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	export let info: PoolInfo;
	export let userBalance: BigNumber;
	export let onOkay = (wantAmount?: any) => {};

	const { close } = getContext('simple-modal');

	let wantAmount: string;

	function _onOkay() {
		onOkay(wantAmount);
		close();
	}
</script>

<div class="flex flex-col px-2 py-6">
	<div class=" w-full shadow-2xl  shadow-gray-1000 border-2 rounded-3xl border-gray-200 py-3">
		<div />
		<div class="flex flex-wrap justify-between py-1 px-10">
			<p class="text-gray-400 font-semibold tracking-wide">{$_('modals.input')}</p>
			<div class="flex items-center">
				<div
					on:click={() => (wantAmount = parseBigNumberToString(userBalance))}
					class="text-green-400 rounded-3xl cursor-pointer border border-green-400 text-xs font-semibold tracking-wide mr-1 p-1 hover:bg-green-400 hover:text-light-100 "
				>
					MAX
				</div>
				<p class="text-gray-400  font-medium text-xs md:text-base ">
					{$_('modals.balance')}: {parseBigNumberToString(userBalance)}
				</p>
			</div>
		</div>
		<div class="flex justify-between py-3 px-10 flex-wrap">
			<div class="flex w-15/24">
				<input
					on:keypress={onyAllowFloatNumbers}
					bind:value={wantAmount}
					id="inputDeposit"
					min="0"
					placeholder="0.0"
					class="w-full font-medium"
				/>
			</div>
			<div class="flex">
				<div />
				<div
					class="text-gray-400  font-semibold tracking-wide text-xs md:text-base flex items-center"
				>
					{info.tokenName}
				</div>
			</div>
		</div>
	</div>
	<p class="text-gray-400  font-semibold tracking-wide mt-5 px-1">{$_('modals.otherOptions')}</p>
	<div class="flex justify-between px-4 pt-2">
		<button
			on:click={() => (wantAmount = parseBigNumberToString(userBalance.div(10)))}
			class="bg-green-400 text-light-100 rounded-full text-xs md:text-base cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 py-1 hover:bg-green-500"
		>
			10%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToString(userBalance.div(4)))}
			class="bg-green-400 text-light-100 rounded-full text-xs md:text-base cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 py-1 hover:bg-green-500"
		>
			25%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToString(userBalance.div(2)))}
			class="bg-green-400 text-light-100 rounded-full text-xs md:text-base cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 py-1 hover:bg-green-500"
		>
			50%
		</button>
		<button
			on:click={() => (wantAmount = parseBigNumberToString(userBalance.div(4).mul(3)))}
			class="bg-green-400 text-light-100 rounded-full text-xs md:text-base cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 py-1 hover:bg-green-500"
		>
			75%
		</button>
	</div>

	<div class="flex justify-center mt-9">
		<button
			on:click={_onOkay}
			class="w-full p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-300 hover:to-green-500 text-light-100 font-bold tracking-wide "
		>
			DEPOSIT YOUR {info.tokenName}
		</button>
	</div>
</div>

<style>
	input {
		outline: none;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
