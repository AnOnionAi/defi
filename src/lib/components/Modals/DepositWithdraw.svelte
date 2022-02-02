<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import type { PoolInfo } from '$lib/ts/types';
	import { getERC20Contract } from '$lib/utils/contracts';
	import { getContext, onMount } from 'svelte';
	import { accounts } from '$lib/stores/MetaMaskAccount';
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

	darkMode.subscribe((darkEnabled) => {
		darkEnabled ? (primaryTextColor = '#e5e7eb') : (primaryTextColor = '#9ca3af');
	});

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
	style="border-color: {secondaryColor};"
	class="flex rounded-lg bg-white {$darkMode && 'bg-dark-900'} border-2 -m-4 "
>
	<div class="py-8 w-full flex flex-col">
		<div>
			<h1 style="color: {primaryTextColor};" class="tracking-wider font-medium mb-3">
				{#if action === 'DEPOSIT'}
					{$_('actions.deposit')}
				{:else if action === 'WITHDRAW'}
					{$_('actions.withdraw')}
				{/if}
			</h1>
		</div>
		<div class="px-10">
			<div
				style="border-color: {secondaryColor};"
				class="rounded-3xl border-2  py-3 text-sm  md:text-md "
			>
				<div class="flex flex-col md:flex-row items-center md:justify-between px-4 py-3">
					<p style="color: {primaryTextColor};">{$_('modals.input')}:</p>
					<div class="flex">
						{#if action == 'DEPOSIT'}
							<button
								on:click={() =>
									(wantAmount = ethers.utils.formatUnits(userBalance, stakingTokenDecimals))}
								class="text-xs  mr-1 text-green-400  rounded-full">MAX</button
							>
						{:else if action == 'WITHDRAW'}
							<button
								on:click={() =>
									(wantAmount = ethers.utils.formatUnits(userStakedTokens, stakingTokenDecimals))}
								class="text-xs p-1 mr-1 text-red-400  rounded-full">MAX</button
							>
						{/if}
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
								{ethers.utils.formatUnits(userStakedTokens, stakingTokenDecimals)}
							</p>
						{/if}
					</div>
				</div>
				<div class="flex flex-col md:flex-row items-center md:justify-between py-3 px-4">
					<div class="w-8/12">
						<input
							on:keypress={onyAllowFloatNumbers}
							bind:value={wantAmount}
							style="color: {primaryTextColor};"
							type="text"
							class="w-full font-semibold bg-transparent text-center md:text-left text-lg"
							placeholder="0.00"
						/>
					</div>
					<div class="flex">
						<p style="color: {primaryTextColor};" class="text-medium ">{info.tokenName}</p>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<p style="color: {primaryTextColor};" class="font-semibold">{$_('modals.otherOptions')}</p>
			</div>
			<div class="mt-3 w-full flex justify-between">
				{#if action === 'DEPOSIT'}
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(userBalance.div(10), stakingTokenDecimals))}
						class="bg-green-500 py-1 px-3 hover:bg-green-400 rounded-lg text-white text-light"
						>10%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(userBalance.div(4), stakingTokenDecimals))}
						class="bg-green-500 py-1 px-3 hover:bg-green-400 rounded-lg text-white text-light"
						>25%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(userBalance.div(2), stakingTokenDecimals))}
						class="bg-green-500 py-1 px-3 hover:bg-green-400 rounded-lg text-white text-light"
						>50%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userBalance.div(4).mul(3),
								stakingTokenDecimals
							))}
						class="bg-green-500 py-1 px-3 hover:bg-green-400 rounded-lg text-white text-light"
						>75%</button
					>
				{:else if action === 'WITHDRAW'}
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(10),
								stakingTokenDecimals
							))}
						class="bg-red-500 py-1 px-3 hover:bg-red-400 rounded-lg text-white text-light"
						>10%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(4),
								stakingTokenDecimals
							))}
						class="bg-red-500 py-1 px-3 hover:bg-red-400 rounded-lg text-white text-light"
						>25%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(2),
								stakingTokenDecimals
							))}
						class="bg-red-500 py-1 px-3 hover:bg-red-400 rounded-lg text-white text-light"
						>50%</button
					>
					<button
						on:click={() =>
							(wantAmount = ethers.utils.formatUnits(
								userStakedTokens.div(4),
								stakingTokenDecimals
							))}
						class="bg-red-500 py-1 px-3 hover:bg-red-400 rounded-lg text-white text-light"
						>75%</button
					>
				{/if}
			</div>

			<div class="mt-9">
				{#if action === 'DEPOSIT'}
					<button
						on:click={startDeposit}
						class="block w-full py-3 bg-green-500 hover:bg-green-400 text-md uppercase 	text-white font-medium tracking-widest rounded-xl "
						>{$_('actions.deposit')} {info.tokenName}</button
					>
				{:else if action === 'WITHDRAW'}
					<button
						on:click={startWithdraw}
						class="block w-full py-3 bg-red-500 hover:bg-red-400 text-md uppercase 	text-white font-medium tracking-widest rounded-xl "
						>{$_('actions.withdraw')} {info.tokenName}</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
</style>
