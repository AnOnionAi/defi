<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import type { PoolInfo } from '$lib/types/types';
	import { getContext } from 'svelte';
	import { ethers } from 'ethers';
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';

	const { close } = getContext('simple-modal');

	export let action;
	export let info: PoolInfo;
	export let onDeposit;
	export let onWithdraw;
	export let userStakedTokens;
	export let userBalance;
	export let stakingTokenDecimals;

	let wantAmount;

	let secondaryColor;
	let primaryTextColor;

	if (action === 'DEPOSIT') secondaryColor = '#86efac';
	if (action === 'WITHDRAW') secondaryColor = '#ef4444';

	const startDeposit = () => {
		onDeposit(wantAmount);
		close();
	};

	const startWithdraw = () => {
		onWithdraw(wantAmount);
		close();
	};
</script>

<div
	class:dark={$darkMode}
	class="flex rounded-lg bg-white {$darkMode &&
		'bg-neutral-900'} -m-5 border-2 ">
	<div class="flex w-full flex-col py-8">
		<div>
			<h1
				class="mb-3 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
				{#if action === 'DEPOSIT'}
					{$_('actions.deposit')}
				{:else if action === 'WITHDRAW'}
					{$_('actions.withdraw')}
				{/if}
			</h1>
		</div>
		<div class="px-10">
			<div
				class="md:text-md rounded-3xl  border-2 border-gray-300 py-3 text-sm text-gray-500 dark:border-neutral-700  dark:text-gray-100 ">
				<div
					class="flex flex-col items-center px-4 py-3 md:flex-row md:justify-between">
					<p class="font-semibold">{$_('modals.input')}:</p>
					<div class="flex">
						<p style="color: {primaryTextColor};" class="mr-1">
							{#if action == 'DEPOSIT'}
								{$_('modals.balance')}:
							{:else if action == 'WITHDRAW'}
								{$_('pastActions.staked')}:
							{/if}
						</p>
						{#if action == 'DEPOSIT'}
							<p style="color: {primaryTextColor};">
								{ethers.utils.formatUnits(userBalance, stakingTokenDecimals)}
							</p>
						{:else if action == 'WITHDRAW'}
							<p style="color: {primaryTextColor};">
								{ethers.utils.formatUnits(
									userStakedTokens,
									stakingTokenDecimals
								)}
							</p>
						{/if}
					</div>
				</div>
				<div
					class="flex flex-col items-center py-3 px-4 md:flex-row md:justify-between">
					<div class="w-8/12">
						<input
							on:keypress={onyAllowFloatNumbers}
							bind:value={wantAmount}
							type="text"
							class="w-full bg-transparent text-center text-lg font-semibold text-gray-700 dark:text-white md:text-left"
							placeholder="0.00" />
					</div>
					<div class="flex">
						<p style="color: {primaryTextColor};" class="text-medium ">
							{info.tokenName}
						</p>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<p class="font-semibold text-gray-500 dark:text-gray-100">
					{$_('modals.otherOptions')}
				</p>
			</div>
			<div class="mt-3 mb-3 flex w-full flex-row-reverse justify-between">
				{#if action === 'DEPOSIT'}
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userBalance.div(10),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-triadicGreen-700 py-1 px-3 text-white hover:bg-green-400"
						>10%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userBalance.div(4),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-triadicGreen-700 py-1 px-3 text-white hover:bg-green-400"
						>25%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userBalance.div(2),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-triadicGreen-700 py-1 px-3 text-white hover:bg-triadicGreen-600"
						>50%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userBalance.div(4).mul(3),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-triadicGreen-700 py-1 px-3 text-white hover:bg-triadicGreen-600"
						>75%</button>
				{:else if action === 'WITHDRAW'}
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(10),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-red-500 py-1 px-3 text-white hover:bg-red-400"
						>10%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(4),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-red-500 py-1 px-3 text-white hover:bg-red-400"
						>25%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(2),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-red-500 py-1 px-3 text-white hover:bg-red-400"
						>50%</button>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(4),
								stakingTokenDecimals
							))}
						class="text-light rounded-lg bg-red-500 py-1 px-3 text-white hover:bg-red-400"
						>75%</button>
				{/if}
			</div>

			<button
				on:click={() => {
					if (action === 'DEPOSIT') {
						wantAmount = ethers.utils.formatUnits(
							userBalance,
							stakingTokenDecimals
						);
						return;
					}
					if (action === 'WITHDRAW') {
						wantAmount = ethers.utils.formatUnits(
							userStakedTokens,
							stakingTokenDecimals
						);
						return;
					}
				}}
				class="w-full rounded-xl bg-gradient-to-r from-complementary-600 to-triadicGreen-600 py-1 px-2 text-lg font-bold text-white  transition duration-500 hover:from-triadicGreen-600 hover:to-complementary-600"
				>MAX</button>

			<div class="mt-6">
				{#if action === 'DEPOSIT'}
					<button
						on:click={startDeposit}
						class="text-md block w-full rounded-xl bg-triadicGreen-700 py-3 font-medium 	uppercase tracking-widest text-white hover:bg-triadicGreen-600 "
						>{$_('actions.deposit')} {info.tokenName}</button>
				{:else if action === 'WITHDRAW'}
					<button
						on:click={startWithdraw}
						class="text-md block w-full rounded-xl bg-red-500 py-3 font-medium 	uppercase tracking-widest text-white hover:bg-red-400 "
						>{$_('actions.withdraw')} {info.tokenName}</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
</style>
