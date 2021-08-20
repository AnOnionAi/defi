<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	import { darkMode } from '$lib/stores/dark';
	import sushi from '/static/sushi.png';
	import dyfn from '/static/dfyn.svg';
	import quick from '/static/quiswa.png';

	export async function load({ page }) {
		const { lang } = page.params;

		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">
	import { accounts } from '../../../lib/stores/MetaMaskAccount';
	import { BigNumber, ethers } from 'ethers';
	import {
		getMasterChefContract,
		getZyberTokenContract,
		getLPTokensContracts
	} from '../../../utils/contracts';
	import { addresses } from '../../../config/constants/addresses';
	import { parseBigNumberToDecimal } from '../../../utils/helpers';
	import { farms } from '../../../config/constants/farms';
	import { onMount } from 'svelte';

	let isLogged = false;
	let currentAccount;
	let userInfoInFarm;
	let approvedFarms = [false, false, false];
	let earningsFromFarms;

	onMount(() => {
		accounts.subscribe((value) => {
			currentAccount = value;
			currentAccount ? (isLogged = true) : (isLogged = false);
			if (isLogged) {
				(async () => {
					earningsFromFarms = await fetchEarnedMushFromFarms();
					userInfoInFarm = await fetchUserInfoFromFarms();
					approvedFarms = await fetchApprovedFarms();
					console.log(approvedFarms);
				})();
			}
		});
	});

	const metaMaskCon = async () => {
		try {
			const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			accounts.set(user_accounts);
		} catch {
			console.log('failed');
		}
	};

	const approve = async (pid: number) => {
		const lpTokens = getLPTokensContracts();
		await lpTokens[pid].approve(addresses.MasterChef.TEST, ethers.constants.MaxUint256);
	};

	const checkIfApproved = (allowance: BigNumber) => {
		return ethers.constants.Zero._hex != allowance._hex;
	};

	const stake = async (farmID: number, wantAmount: string) => {
		const MasterChef = getMasterChefContract();
		await MasterChef.deposit(
			farmID.toString(),
			ethers.utils.parseUnits(wantAmount, 18),
			ethers.constants.AddressZero
		);
	};

	const unStake = async (farmID: number) => {
		const stakedAmount = await getUserStakedTokens(farmID);
		if (!isLogged) {
			return;
		}
		const MasterChef = getMasterChefContract();
		await MasterChef.withdraw(farmID, stakedAmount);
	};

	const harvestMush = async (farmID) => {
		if (!isLogged) {
			return;
		}
		const MasterChef = getMasterChefContract();
		await MasterChef.deposit(
			farmID,
			ethers.utils.parseUnits('0', 18),
			ethers.constants.AddressZero
		);
	};

	const fetchEarnedMushFromFarms = async () => {
		const MasterChef = getMasterChefContract();
		const earnings = await Promise.all(
			farms.map(async (farm) => {
				return await MasterChef.pendingmush(farm.pid, currentAccount[0]);
			})
		);
		return earnings;
	};

	const fetchUserInfoFromFarms = async () => {
		const MasterChef = getMasterChefContract();
		const userInfoPerFarm = await Promise.all(
			farms.map(async (farm) => {
				return await MasterChef.userInfo(farm.pid, currentAccount[0]);
			})
		);
		return userInfoPerFarm;
	};

	const fetchApprovedFarms = async () => {
		const lpTokensContracts = getLPTokensContracts();
		const lpTokensAllowance = await Promise.all(
			lpTokensContracts.map(async (tknContract) => {
				return await tknContract.allowance(currentAccount[0], addresses.MasterChef.TEST);
			})
		);
		const farmsApproved = await lpTokensAllowance.map((allowance) => checkIfApproved(allowance));
		return farmsApproved;
	};

	const getPendingMush = async (farmID) => {
		let pendingMushBN, pendingMush;
		const MasterChef = getMasterChefContract();
		pendingMushBN = await MasterChef.pendingmush(farmID, currentAccount[0]);
		pendingMush = ethers.utils.formatUnits(pendingMushBN, 18);
		return parseInt(pendingMush);
	};

	const getUserStakedTokens = async (farmPID) => {
		const MasterChef = getMasterChefContract();
		let { amount } = await MasterChef.userInfo(farmPID, currentAccount[0]);
		return amount;
	};

	const getPoolInfo = async (farmPID) => {
		const MasterChef = getMasterChefContract();
		const poolInfo = await MasterChef.poolInfo(farmPID);
		return poolInfo;
	};

	const buttonOnClickHandler = (pid: number) => {
		if (!isLogged) {
			metaMaskCon();
		} else if (isLogged) {
			approve(pid);
		}
	};

	const onStakeHandler = async (farmPID: number) => {
		await stake(farmPID, stakeAmounts[farmPID].toString());
	};

	let stakeAmounts = [0, 0, 0];

	export let lang;

	import { slide } from 'svelte/transition';
</script>

<section>
	<br />
	<h1 class="text-dark-200 dark:text-white text-4xl">F A R M S</h1>
	<section class:dark={$darkMode} class="mt-3">
		<section class="mt-5 space-y-4">
			<div class="w-full flex">
				<div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 text-center">
					<!--Start Farms-->
					<div
						class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0"
					>
						<div class="flex justify-center items-center">
							<img class="max-h-40" src={quick} alt="tic-tac-toe" />
						</div>
						<div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
							<p class="text-lg font-bold dark:text-white">QuickSwap</p>
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

								<div>
									<div class="flex pt-3">
										<p class="text-xs">MUSH EARNED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if earningsFromFarms}
												{parseBigNumberToDecimal(earningsFromFarms[0])}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => harvestMush(0)}
											href="#"
											class=" text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}">Harvest</a
										>
									</div>
									<div class="flex justify-between">
										<p class="text-xs">MUSH-USDC LP TOKENS STAKED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if userInfoInFarm}
												{parseBigNumberToDecimal(userInfoInFarm[0].amount)}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => unStake(0)}
											href="#"
											class="text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}"
										>
											Unstake</a
										>
									</div>

									{#if isLogged && approvedFarms[0]}
										<div class="flex py-2 justify-center" in:slide={{ delay: 200, duration: 1000 }}>
											<div>
												<input
													bind:value={stakeAmounts[0]}
													class="border-2 rounded border-green-400"
												/>
												<a
													href=""
													class="text-green-400 font-semibold px-2"
													on:click={() => onStakeHandler(0)}>Stake</a
												>
											</div>
										</div>
									{/if}
								</div>
							</div>

							<a
								on:click={() => buttonOnClickHandler(0)}
								href="#"
								class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600 {approvedFarms[0] &&
									'hidden'}"
							>
								{#if approvedFarms[0]}
									Approved
								{:else if isLogged}
									Approve
								{:else}
									Unlock
								{/if}
							</a>
						</div>
					</div>

					<div
						class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0"
					>
						<div class="flex justify-center items-center">
							<img class="max-h-40" src={sushi} alt="tic-tac-toe" />
						</div>
						<div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
							<p class="text-lg font-bold dark:text-white">SushiSwap</p>
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

								<div>
									<div class="flex pt-3">
										<p class="text-xs">MUSH EARNED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if earningsFromFarms}
												{parseBigNumberToDecimal(earningsFromFarms[1])}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => harvestMush(1)}
											href="#"
											class=" text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}">Harvest</a
										>
									</div>
									<div class="flex justify-between">
										<p class="text-xs">MUSH-USDC LP TOKENS STAKED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if userInfoInFarm}
												{parseBigNumberToDecimal(userInfoInFarm[1].amount)}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => unStake(1)}
											href="#"
											class="text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}"
										>
											Unstake</a
										>
									</div>

									{#if isLogged && approvedFarms[1]}
										<div class="flex py-2 justify-center" in:slide={{ delay: 200, duration: 1000 }}>
											<div>
												<input
													bind:value={stakeAmounts[1]}
													class="border-2 rounded border-green-400"
												/>
												<a
													href=""
													class="text-green-400 font-semibold px-2"
													on:click={() => onStakeHandler(1)}>Stake</a
												>
											</div>
										</div>
									{/if}
								</div>
							</div>

							<a
								on:click={() => buttonOnClickHandler(1)}
								href="#"
								class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600 {approvedFarms[1] &&
									'hidden'}"
							>
								{#if approvedFarms[1]}
									Approved
								{:else if isLogged}
									Approve
								{:else}
									Unlock
								{/if}
							</a>
						</div>
					</div>

					<div
						class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0"
					>
						<div class="flex justify-center items-center">
							<img class="max-h-40" src={dyfn} alt="tic-tac-toe" />
						</div>
						<div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
							<p class="text-lg font-bold dark:text-white">DYFN</p>
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

								<div>
									<div class="flex pt-3">
										<p class="text-xs">MUSH EARNED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if earningsFromFarms}
												{parseBigNumberToDecimal(earningsFromFarms[2])}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => harvestMush(2)}
											href="#"
											class=" text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}">Harvest</a
										>
									</div>
									<div class="flex justify-between">
										<p class="text-xs">MUSH-USDC LP TOKENS STAKED:</p>
									</div>
									<div class="flex justify-between pb-3">
										<p class="p-1">
											{#if userInfoInFarm}
												{parseBigNumberToDecimal(userInfoInFarm[2].amount)}
											{:else}
												0
											{/if}
										</p>
										<a
											on:click={() => unStake(2)}
											href="#"
											class="text-green-400 font-semibold p-1 rounded-md {!isLogged &&
												'cursor-not-allowed '}"
										>
											Unstake</a
										>
									</div>

									{#if isLogged && approvedFarms[2]}
										<div class="flex py-2 justify-center" in:slide={{ delay: 200, duration: 1000 }}>
											<div>
												<input
													bind:value={stakeAmounts[2]}
													class="border-2 rounded border-green-400"
												/>
												<a
													href=""
													class="text-green-400 font-semibold px-2"
													on:click={() => onStakeHandler(2)}>Stake</a
												>
											</div>
										</div>
									{/if}
								</div>
							</div>

							<a
								on:click={() => buttonOnClickHandler(2)}
								href="#"
								class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600 {approvedFarms[2] &&
									'hidden'}"
							>
								{#if approvedFarms[2]}
									Approved
								{:else if isLogged}
									Approve
								{:else}
									Unlock
								{/if}
							</a>
						</div>
					</div>

					<!--End Farms-->
				</div>
			</div>
		</section>
	</section>
</section>

<style>
	.dark .active {
		--tw-bg-opacity: 1;
		background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
		--tw-text-opacity: 1;
		color: rgba(0, 0, 0, var(--tw-text-opacity));
	}
	.active {
		--tw-bg-opacity: 1;
		background-color: rgba(217, 119, 6, var(--tw-bg-opacity));
		--tw-text-opacity: 1;
		color: rgba(255, 255, 255, var(--tw-text-opacity));
	}

	input:focus {
		outline: none;
		border-color: #16a34a;
	}
</style>
