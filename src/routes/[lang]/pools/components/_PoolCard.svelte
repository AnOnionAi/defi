<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { metaMaskCon } from '../../../../utils/helpers';
	import {
		approveToken,
		getTokenAllowance,
		isNotZero,
		getTokenBalance
	} from '../../../../utils/erc20';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { BigNumber } from '@ethersproject/bignumber';
	import { ethers } from 'ethers';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp.js';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown.js';
	import { deposit, withdraw, getRewards, getStakedTokens } from '../../../../utils/masterc';
	import { parseBigNumberToDecimal, parseBigNumberToInt } from '../../../../utils/balanceParsers';
	import DepositModal from './_DepositModal.svelte';
	import WithdrawModal from './_WithdrawModal.svelte';

	const { open } = getContext('simple-modal');

	export let cardImage: any;
	export let tokenName: string;
	export let tokenAddr: string;
	export let depositFee: number;
	export let pid: number;

	let isHidden: boolean = true;
	let tokenApproved: boolean;
	let userAcc: string;
	let tokenAllowance: BigNumber;
	let canStake: boolean;
	let canWithdraw: boolean;
	let canHarvest: boolean;
	let userStakedTokens: BigNumber;
	let userEarnings: BigNumber;
	let poolTokenLiquidity: BigNumber;
	let userBalance: BigNumber;
	let wantWithdrawAmount: any;
	let idInterval;

	const onOkay = async (amount) => {
		console.log(userStakedTokens, 'before');
		const tx = await deposit(pid, amount);
		console.log(tx);
		await tx.wait();
		userStakedTokens = await getStakedTokens(pid, userAcc);
	};

	const onWithdraw = async (amount) => {
		console.log('onWithdraw');
		wantWithdrawAmount = amount;
		const tx = await withdraw(pid, wantWithdrawAmount);
		await tx.wait();
		userStakedTokens = await getStakedTokens(pid, userAcc);
	};

	const goDeposit = () => {
		open(
			DepositModal,
			{
				userBalance,
				tokenName,
				onOkay
			},
			{
				closeButton: false,
				closeOnEsc: true,
				closeOnOuterClick: true
			}
		);
	};

	const goWithdraw = () => {
		open(
			WithdrawModal,
			{
				userStakedTokens,
				tokenName,
				onWithdraw
			},
			{
				closeButton: false,
				closeOnEsc: true,
				closeOnOuterClick: true
			}
		);
	};

	const unsubscribe = accounts.subscribe(async (arrayAccs) => {
		if (arrayAccs) {
			userAcc = arrayAccs[0];
			tokenAllowance = await getTokenAllowance(
				tokenAddr,
				'0x96306fa6C17A5edfA80C679051E3CA980A2e9CC9',
				userAcc
			);
			tokenApproved = isNotZero(tokenAllowance);
			if (tokenApproved) {
				userBalance = await getTokenBalance(tokenAddr, userAcc);
				canStake = isNotZero(userBalance);

				userEarnings = await getRewards(pid, userAcc);
			}
			if (canStake) {
				userStakedTokens = await getStakedTokens(pid, userAcc);
				canWithdraw = userStakedTokens._hex !== ethers.constants.Zero._hex;
			}

			idInterval = setInterval(async () => {
				await fetchReards();
			}, 10000);
		}
	});

	const fetchReards = async () => {
		if (tokenApproved) {
			userEarnings = await getRewards(pid, userAcc);
		}
	};

	onMount(async () => {
		poolTokenLiquidity = await getTokenBalance(
			tokenAddr,
			'0x96306fa6C17A5edfA80C679051E3CA980A2e9CC9'
		);
	});

	const showPoolInfo = () => {
		isHidden ? (isHidden = false) : (isHidden = true);
	};

	const approveHandler = async () => {
		const tx = await approveToken(tokenAddr, '0x96306fa6C17A5edfA80C679051E3CA980A2e9CC9');
		await tx.wait();
		tokenAllowance = await getTokenAllowance(
			tokenAddr,
			'0x96306fa6C17A5edfA80C679051E3CA980A2e9CC9',
			userAcc
		);
	};

	import { slide } from 'svelte/transition';
</script>

<div
	class=" flex flex-col justify-between shadow-l dark:bg-dark-600 rounded-xl space-y-2  border dark:border-0 "
>
	<div class=" flex justify-center items-center py-2">
		<img class="max-h-40" src={cardImage} alt="tic-tac-toe" />
	</div>
	<div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
		<p class="text-lg font-bold dark:text-white">{tokenName}</p>
		<div class="px-5">
			<div class="flex justify-between">
				<p class="font-semibold">APY:::</p>
				<p>999%</p>
			</div>
			<div class="flex justify-between">
				<p class="font-semibold">APR:</p>
				<p>999%</p>
			</div>
			<div class="flex justify-between">
				<p class="font-semibold">EARN:</p>
				<p>MUSH</p>
			</div>
			<div class="flex justify-between">
				<p>DEPOSIT FEE</p>
				<p>0%</p>
			</div>
			<div class="flex pt-5">
				<p class="text-xs font-medium">MUSH EARNED:</p>
			</div>
			<div class="flex pt-3 justify-between">
				<p class="tabular-nums text-xl p-1 font-medium">
					{#if userEarnings}
						{parseBigNumberToDecimal(userEarnings)}
					{:else}
						0
					{/if}
				</p>
				<p
					on:click={async () => await deposit(pid, '0')}
					class="text-green-400 font-semibold text-lg tracking-wider p-1 cursor-pointer"
				>
					Harvest
				</p>
			</div>
		</div>
		<div class="flex px-5 -mb-2">
			<p class="text-xs font-medium ">{tokenName} STAKED</p>
		</div>

		{#if tokenApproved && $accounts}
			<div class="flex justify-between px-5">
				<p class="tabular-nums text-xl p-1 font-medium">
					{#if userStakedTokens}
						{parseBigNumberToDecimal(userStakedTokens)}
					{:else}
						0
					{/if}
				</p>
				<div class="flex">
					<p
						on:click={goDeposit}
						class="text-green-400 font-semibold text-lg tracking-wider p-1 cursor-pointer  {!canStake &&
							'invisible'}"
					>
						Deposit
					</p>
					<p
						on:click={goWithdraw}
						class="text-green-400 font-semibold text-lg tracking-wider p-1 ml-6 cursor-pointer  {!userStakedTokens &&
							'invisible'}"
					>
						Withdraw
					</p>
				</div>
			</div>
		{:else if $accounts}
			<a
				on:click={async () => await approveHandler()}
				href="#"
				class="block bg-green-400 text-white font-bold p-2 rounded-md w-9/10 hover:bg-green-600 mx-auto "
			>
				Approve
			</a>
		{:else}
			<a
				on:click={metaMaskCon}
				href="#"
				class="block bg-green-400 text-white font-bold p-2 rounded-md w-9/10 hover:bg-green-600 mx-auto"
			>
				Unlock
			</a>
		{/if}

		<div class="flex justify-center p-4" on:click={showPoolInfo}>
			{#if isHidden}
				<div class="flex cursor-pointer">
					<p>Details</p>
					<Fa icon={faChevronDown} size="xs" scale={0.9} translateX={0.5} translateY={0.65} />
				</div>
			{:else}
				<div class="flex cursor-pointer">
					<p>Hide</p>
					<Fa icon={faChevronUp} size="xs" scale={0.9} translateX={0.5} translateY={0.6} />
				</div>
			{/if}
		</div>

		<div class="px-5 {isHidden && 'hidden'}">
			<div class="flex justify-between">
				<p>Stake:</p>
				<p>{tokenName}</p>
			</div>
			<div class="flex justify-between">
				<p>Total Liquidity:</p>
				<p>
					{#if poolTokenLiquidity}
						{parseBigNumberToDecimal(poolTokenLiquidity)} {tokenName}
					{:else}
						0
					{/if}
				</p>
			</div>
			<div class="flex justify-between">
				<p>My Liquidity:</p>
				<p>
					{#if userStakedTokens}
						{parseBigNumberToDecimal(userStakedTokens)} {tokenName}
					{:else}
						0 {tokenName}
					{/if}
				</p>
			</div>
			<div class="flex">
				<p>View On Matic</p>
			</div>
		</div>
	</div>
</div>
