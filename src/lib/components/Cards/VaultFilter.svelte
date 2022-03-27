<script lang="ts">
	import { Criteria } from '$lib/ts/types';
	import type { VaultFilterFunction } from '$lib/ts/types';
	import {
		hideZeroBalancesFilter,
		stakedOnlyFilter,
		quickswapOnlyFilter,
		sushiswapOnlyFilter
	} from '$lib/utils/filterFunctions';

	export let filtersApplied: Array<VaultFilterFunction> = [];
	export let platformSelected = 'All';
	export let hideZeroBalances = false;
	export let stakedOnly = false;
	export let statement = '';
	export let filterBy = 'TVL';
	export let sortBy = 'Descending';
	import { _ } from 'svelte-i18n';
	import StyledRadioButton from '../FormElements/StyledRadioButton.svelte';
	import StyledCheckbox from '../FormElements/StyledCheckbox.svelte';
	import StyledSelect from '../FormElements/StyledSelect.svelte';
	import StyledSearchbar from '../FormElements/StyledSearchbar.svelte';
	import StyledSwitch from '../FormElements/StyledSwitch.svelte';

	const handleHideZeroBalancesFilter = () => {
		hideZeroBalances = !hideZeroBalances; //Toggles the state
		if (hideZeroBalances) {
			//If the hide zero option is enabled, we're going to add the filter to the array.
			const zeroBalancesFilter: VaultFilterFunction = {
				filterFunction: hideZeroBalancesFilter,
				criteria: Criteria.BALANCE
			};
			const newFilterSet = [...filtersApplied, zeroBalancesFilter];
			filtersApplied = [...newFilterSet];
		} else {
			const newFilterSet = filtersApplied.filter(
				(vaultFilter) => vaultFilter.criteria != Criteria.BALANCE
			);
			filtersApplied = [...newFilterSet];
		}
	};

	const handleStakedOnlyFilter = () => {
		stakedOnly = !stakedOnly;
		if (stakedOnly) {
			//If the hide zero option is enabled, we're going to add the filter to the array.
			const stakedOnly: VaultFilterFunction = {
				filterFunction: stakedOnlyFilter,
				criteria: Criteria.STAKED
			};
			const newFilterSet = [...filtersApplied, stakedOnly];
			filtersApplied = [...newFilterSet];
		} else {
			const newFilterSet = filtersApplied.filter(
				(vaultFilter) => vaultFilter.criteria != Criteria.STAKED
			);
			filtersApplied = [...newFilterSet];
		}
	};

	const handlePlatformFilter = () => {
		//Everytime the platform chahges, we delete the previous filter.
		const newFilterSet = filtersApplied.filter(
			(vaultFilter) => vaultFilter.criteria != Criteria.PLATFORM
		);
		filtersApplied = [...newFilterSet];

		//Add the only sushiswap filter.
		if (platformSelected == 'SushiSwap') {
			const sushiSwapOnly: VaultFilterFunction = {
				filterFunction: sushiswapOnlyFilter,
				criteria: Criteria.PLATFORM
			};
			const newFilterSet = [...filtersApplied, sushiSwapOnly];
			filtersApplied = [...newFilterSet];
		} else if (platformSelected == 'QuickSwap') {
			const quickswapOnly: VaultFilterFunction = {
				filterFunction: quickswapOnlyFilter,
				criteria: Criteria.PLATFORM
			};
			const newFilterSet = [...filtersApplied, quickswapOnly];
			filtersApplied = [...newFilterSet];
		}
	};

	const handleSearchByName = () => {
		//Everytime the input changes, this will clean the previous name filter.
		const newFilterSet = filtersApplied.filter(
			(vaultFilter) => vaultFilter.criteria != Criteria.NAME
		);
		filtersApplied = [...newFilterSet];
		//If the input is not a void string, we're going to create a function that returns true as the search input  matches a vault name.
		if (statement.length >= 1) {
			const searchBarFilter = (vault) => {
				const searchStatement = statement;
				const vaultName = `${vault.pair.token0Name}-${vault.pair.token1Name}`;
				return vaultName.toLowerCase().includes(searchStatement.toLowerCase());
			};
			//We add this function as a vault Filter.
			const search: VaultFilterFunction = {
				filterFunction: searchBarFilter,
				criteria: Criteria.NAME
			};
			filtersApplied = [...filtersApplied, search];
		}
	};
</script>

<div
	class="sideShadow mx-2 mb-8 min-h-[180px] max-w-6xl rounded-2xl bg-white py-6 px-9 dark:bg-neutral-800 lg:mx-auto">
	<div
		class=" grid h-full w-full grid-cols-2 grid-rows-4 gap-x-2 gap-y-2 md:place-items-center lg:grid-cols-4  lg:grid-rows-2 lg:place-items-start ">
		<div class="flex gap-2 place-self-start md:place-self-center">
			<StyledRadioButton
				name="checkbox_p"
				onChange={handlePlatformFilter}
				value={'All'}
				bind:optionsGroup={platformSelected} />
			<p class="text-gray-700 dark:text-gray-100">All</p>
		</div>

		<div class="flex gap-2 place-self-start md:place-self-center">
			<StyledRadioButton
				name="checkbox_p"
				onChange={handlePlatformFilter}
				value={'SushiSwap'}
				bind:optionsGroup={platformSelected} />
			<img src="/icons/sushi.webp" alt="SushiSwap" class="h-6 w-6" />
		</div>

		<div class="flex gap-2 place-self-start md:place-self-center">
			<StyledRadioButton
				name="checkbox_p"
				onChange={handlePlatformFilter}
				value={'QuickSwap'}
				bind:optionsGroup={platformSelected} />
			<img src="/icons/quick.svg" alt="Quickswap" class="h-6 w-6" />
		</div>

		<div class="place-self-start md:place-self-center">
			<div class="flex items-center gap-2">
				<StyledCheckbox onChange={handleHideZeroBalancesFilter} />
				<p class="flex text-sm text-gray-700 dark:text-gray-100 md:text-base">
					Hide Zero Balances
				</p>
			</div>
		</div>
		<div class="flex  flex-col ">
			<p class="pl-1 pb-1 text-gray-700 dark:text-gray-100">Filter By</p>
			<StyledSelect value={filterBy}>
				<option value="TVL">TVL</option>
				<option value="APY">APY</option>
			</StyledSelect>
		</div>
		<div class="flex  flex-col ">
			<p class="pl-1 pb-1 text-gray-700 dark:text-gray-100">Sort By</p>
			<StyledSelect value={sortBy}>
				<option class="min-w-7xl" value="Descending"
					>{$_('vaultFilter.desceding')}</option>
				<option value="Ascending">{$_('vaultFilter.ascending')}</option>
			</StyledSelect>
		</div>
		<div class="flex  flex-col ">
			<p class="pl-1 pb-1 text-gray-700 dark:text-gray-100">Search</p>
			<StyledSearchbar
				placeholder="Vaults"
				handleInput={handleSearchByName}
				bind:inputValue={statement} />
		</div>

		<div class="flex flex-col-reverse place-self-center pt-3">
			<div class="flex items-center ">
				<StyledSwitch
					checked={stakedOnly}
					handleClick={handleStakedOnlyFilter} />
				<p class="pl-2 text-sm text-gray-700 dark:text-gray-100 md:text-base">
					Staked Only
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
