<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	import type { VaultFilterFunction, VaultInfo } from '$lib/ts/types';
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
	import VaultFilter from '$lib/components/Cards/VaultFilter.svelte';
	import BottomList from '$lib/components/Cards/BottomList.svelte';
	import env from '$lib/env';
	import addresses from '$lib/config/constants/addresses.json';
	import Notifications from 'svelte-notifications';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { getTokenBalance, isNotZero } from '$lib/utils/erc20';
	import { stakedWantTokens } from '$lib/utils/vaultChef';
	import { parseBigNumberToString } from '$lib/utils/balanceParsers';
	import { BigNumber } from 'ethers';
	import {
		generateRandomBalance,
		hideZeroBalancesFilter,
		reduceFilters
	} from '$lib/utils/filterFunctions';

	interface Filter {
		filter(): boolean;
		criteria: string;
	}

	const vaultsData = [...quickVaults, ...sushiVaults];
	let allVaults = [];
	let filteredVaults = [];
	onMount(() => {
		allVaults = vaultsData.map((vault) => {
			return {
				...vault,
				apy: Math.random() * 200,
				tvl: Math.random() * 1200,
				userWalletBalance: generateRandomBalance(), //TODO: remove this random to the actual api calls.
				stakedAmount: generateRandomBalance()
			};
		});
	});

	let platformSelected: string;
	let hideZeroBalances: boolean;
	let stakedOnly: boolean;
	let statement;
	let sortBy:string;
	let filterBy:string;

	let filtersApplied: Array<VaultFilterFunction> = [];

	$: {
		if (filtersApplied.length >= 1) {
			const newState = allVaults.filter((vault) => {
				return reduceFilters(filtersApplied, vault);
			});
			filteredVaults = [...newState];
			console.log(filteredVaults);
		} else if (filtersApplied.length == 0) {
			filteredVaults = allVaults;
		}
	}

	$:{
		if(sortBy || filterBy){
			handleFilerAndSort()
		}
	}

	const handleFilerAndSort = ()  => {
		console.log("HEY HEY")
		if(sortBy == "Descending" && filterBy == "TVL"){
			const sortedVaults = filteredVaults.sort((vaultA,vaultB) => vaultB.tvl - vaultA.tvl)
			filteredVaults = [...sortedVaults]
		}
		else if (sortBy =="Ascending" && filterBy == "TVL"){
			const sortedVaults = filteredVaults.sort((vaultA,vaultB) => vaultA.tvl - vaultB.tvl)
			filteredVaults = [...sortedVaults]
		}
		else if (sortBy =="Descending" && filterBy == "APY"){
			const sortedVaults = filteredVaults.sort((vaultA,vaultB) => vaultB.apy - vaultA.apy)
			filteredVaults = [...sortedVaults]
		}
		else if (sortBy =="Ascending" && filterBy == "APY"){
			const sortedVaults = filteredVaults.sort((vaultA,vaultB) => vaultA.apy - vaultB.apy)
			filteredVaults = [...sortedVaults]
		}
	}
</script>

<section class="pb-3 ">
	<br />
	<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">
		{$_('headers.vaults.text')}
	</h1>

	<div class="mainContainer 	pt-10 sideShadow background__lite">
		<div in:fade={{ duration: 600 }}>
			<VaultFilter
				bind:filtersApplied
				bind:platformSelected
				bind:stakedOnly
				bind:filterBy
				bind:sortBy
				bind:hideZeroBalances
				bind:statement
			/>
		</div>

	
			{#each filteredVaults as vault, index}
				<VaultAccordeon vaultConfig={vault} />
			{/each}
		

		<BottomList />
	</div>
</section>

<style>
	.mainContainer {
		min-height: 85vh;
	}

	.background__lite {
		background-image: url('/backgrounds/vaultsBackground2.png');
	}
</style>
