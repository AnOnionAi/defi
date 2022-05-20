<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	import type {
		VaultFilterFunction,
		VaultInfo,
		VaultState
	} from '$lib/types/types';
	import VaultAccordeon from '$lib/components/Vault/VaultAccordeon.svelte';
	import VaultFilter from '$lib/components/Cards/VaultFilter.svelte';
	import { onMount } from 'svelte';
	import { reduceFilters } from '$lib/utils/filterFunctions';
	import PageHeader from '$lib/components/Text/PageHeader.svelte';
	import { getVaultAPYandAPR } from '$lib/utils/getVaultAPY';
	import { getTokenBalance } from '$lib/utils/erc20';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { BigNumber, ethers } from 'ethers';
	import { vaultChef } from '$lib/utils/contracts';
	let allVaults: Array<VaultState> = [];
	let filteredVaults: Array<VaultState> = [];
	let platformSelected: string;
	let hideZeroBalances: boolean;
	let stakedOnly: boolean;
	let statement: string;
	let sortBy: string;
	let filterBy: string;
	let filtersApplied: Array<VaultFilterFunction> = [];

	onMount(async () => {
		const vaultsData: Array<VaultInfo> = [...quickVaults, ...sushiVaults];

		allVaults = await Promise.all(
			vaultsData.map(async (vault) => {
				const { apy, tvl } = await getVaultAPYandAPR(vault);
				const userTokenBalance = $accounts
					? await getTokenBalance(vault.pair.pairContract, $accounts[0])
					: ethers.constants.Zero;
				const userWalletBalance = parseFloat(
					ethers.utils.formatEther(userTokenBalance)
				);
				const stakedAmount: BigNumber = $accounts
					? await vaultChef.stakedWantTokens(vault.pid, $accounts[0])
					: ethers.constants.Zero;
				const parsedStakedAmount = parseFloat(
					ethers.utils.formatEther(stakedAmount)
				);
				return {
					...vault,
					apy,
					tvl,
					userWalletBalance,
					stakedAmount: parsedStakedAmount
				};
			})
		);
	});

	$: {
		if (filtersApplied.length >= 1) {
			const newState = allVaults.filter((vault) => {
				return reduceFilters(filtersApplied, vault);
			});
			filteredVaults = [...newState];
		} else if (filtersApplied.length == 0) {
			filteredVaults = allVaults;
		}
	}

	$: {
		if (sortBy || filterBy) {
			handleFilerAndSort();
		}
	}

	const handleFilerAndSort = () => {
		if (sortBy == 'Descending' && filterBy == 'TVL') {
			const sortedVaults = filteredVaults.sort(
				(vaultA, vaultB) => vaultB.tvl - vaultA.tvl
			);
			filteredVaults = [...sortedVaults];
		} else if (sortBy == 'Ascending' && filterBy == 'TVL') {
			const sortedVaults = filteredVaults.sort(
				(vaultA, vaultB) => vaultA.tvl - vaultB.tvl
			);
			filteredVaults = [...sortedVaults];
		} else if (sortBy == 'Descending' && filterBy == 'APY') {
			const sortedVaults = filteredVaults.sort(
				(vaultA, vaultB) => vaultB.apy - vaultA.apy
			);
			filteredVaults = [...sortedVaults];
		} else if (sortBy == 'Ascending' && filterBy == 'APY') {
			const sortedVaults = filteredVaults.sort(
				(vaultA, vaultB) => vaultA.apy - vaultB.apy
			);
			filteredVaults = [...sortedVaults];
		}
	};
</script>

<section class="pb-3 ">
	<PageHeader text={$_('headers.vaults.text')} />

	<div class="mainContainer 	sideShadow background__lite pt-10">
		<div in:fade={{ duration: 200 }}>
			<VaultFilter
				bind:filtersApplied
				bind:platformSelected
				bind:stakedOnly
				bind:filterBy
				bind:sortBy
				bind:hideZeroBalances
				bind:statement />
		</div>
		{#if allVaults.length >= 1}
			{#each filteredVaults as vault}
				<VaultAccordeon vaultConfig={vault} />
			{/each}
		{:else}
			<div
				class="bg-white dark:bg-neutral-800 h-[128px] mx-auto mb-4 max-w-6xl animate sm:px-4 md:px-2 lg:px-0 rounded-lg animate-pulse" />
			<div
				class="bg-white dark:bg-neutral-800 h-[128px] mx-auto mb-4 max-w-6xl animate sm:px-4 md:px-2 lg:px-0 rounded-lg animate-pulse" />
			<div
				class="bg-white dark:bg-neutral-800 h-[128px] mx-auto mb-4 max-w-6xl animate sm:px-4 md:px-2 lg:px-0 rounded-lg animate-pulse" />
			<div
				class="bg-white dark:bg-neutral-800 h-[128px] mx-auto mb-4 max-w-6xl animate sm:px-4 md:px-2 lg:px-0 rounded-lg animate-pulse" />
		{/if}
	</div>
</section>

<style>
	.mainContainer {
		min-height: 85vh;
	}

	.background__lite {
		background-image: url('/theme/vaults/vaultsBackground.webp');
	}
</style>
