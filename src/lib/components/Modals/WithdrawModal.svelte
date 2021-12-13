<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { BigNumber } from 'ethers';
	import { getContext } from 'svelte';
	import {
		parseBigNumberToDecimal,
		parseBigNumberToInt,
		parseBigNumberToString
	} from '$lib/utils/balanceParsers';
	import type { PoolInfo } from '$lib/ts/types';
import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	export let info: PoolInfo;
	export let userStakedTokens: BigNumber;
	export let onWithdraw = (wantAmount?: any) => {};

	const { close } = getContext('simple-modal');

	let wantAmount;
	let onChange = (wantAmount?: any) => {};

	function _onWithdraw() {
		onWithdraw(wantAmount);
		close();
	}
</script>

<div>
	<div class="flex flex-col px-6 py-6">
		<div class=" w-full shadow-2xl  shadow-gray-1000 border-2 rounded-3xl border-gray-200 py-3">
			<div />
			<div class="flex flex-wrap justify-between py-1 px-10">
				<p class="text-gray-400 font-semibold tracking-wide">{$_('modals.input')}</p>
				<div class="flex items-center">
					<div
						on:click={() => (wantAmount = parseBigNumberToString(userStakedTokens))}
						class="text-green-400 rounded-3xl cursor-pointer border border-green-400 text-xs font-semibold tracking-wide mr-1 p-1 hover:bg-green-400 hover:text-light-100"
					>
						MAX
					</div>
					<p class="text-gray-400  font-semibold tracking-wide text-xs md:text-md">
						{$_('pastActions.staked')}: {parseBigNumberToString(userStakedTokens)}
					</p>
				</div>
			</div>
			<div class="flex flex-wrap justify-between py-3 px-10">
				<div>
					<input
					on:keypress={onyAllowFloatNumbers}
					 bind:value={wantAmount} placeholder="0.0" />
				</div>
				<div>
					<div />
					<p class="text-gray-400  font-semibold tracking-wide ">{info.tokenName}</p>
				</div>
			</div>
		</div>
		<p class="text-gray-400  font-semibold tracking-wide mt-5 px-1 mb-2">
			{$_('modals.otherOptions')}:
		</p>
		<div class="flex justify-around px-2 pt-2">
			<button
				on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(10)))}
				class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 md:px-4 py-1 hover:bg-green-500 text-xs md:text-sm lg:text-md"
			>
				10%
			</button>
			<button
				on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(4)))}
				class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 md:px-4 py-1 hover:bg-green-500 text-xs md:text-sm lg:text-md"
			>
				25%
			</button>
			<button
				on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(2)))}
				class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 md:px-4 py-1 hover:bg-green-500 text-xs md:text-sm lg:text-md"
			>
				50%
			</button>
			<button
				on:click={() => (wantAmount = parseBigNumberToDecimal(userStakedTokens.div(4).mul(3)))}
				class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-3 md:px-4 py-1 hover:bg-green-500 text-xs md:text-sm lg:text-md"
			>
				75%
			</button>
		</div>

		<div class="flex justify-center mt-9">
			<button
				on:click={_onWithdraw}
				class="w-full p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-300 hover:to-green-500 text-light-100 font-bold tracking-wide uppercase text-sm lg:text-lg"
			>
				{$_('actions.withdraw')}
				{info.tokenName}
			</button>
		</div>
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
