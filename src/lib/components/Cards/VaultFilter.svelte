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

<!-- <div
	class="overflow-right-hidden m-auto my-4 w-full max-w-7xl rounded-2xl border border-white bg-white px-4 pb-4 pt-6 shadow dark:bg-neutral-900 dark:text-white">
	<div class="relative flex w-auto flex-row flex-wrap justify-around">
		<div
			class="m-auto flex w-full max-w-6xl flex-col sm:justify-between lg:flex-row ">
			<label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
				<span class="checkbox__input">
					<input
						name="checkbox_p"
						type="radio"
						value="All"
						bind:group={platformSelected}
						on:change={handlePlatformFilter} />
					<span class="checkbox__control">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								d="M1.73 12.91l6.37 6.37L22.79 4.59" />
						</svg>
					</span>
				</span>
				<span
					id="all"
					class="radio__label text-base dark:font-normal dark:tracking-wider"
					>All</span>
			</label>

			<label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
				<span class="checkbox__input">
					<input
						name="checkbox_p"
						type="radio"
						value="SushiSwap"
						bind:group={platformSelected}
						on:change={handlePlatformFilter} />
					<span class="checkbox__control">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								d="M1.73 12.91l6.37 6.37L22.79 4.59" />
						</svg>
					</span>
				</span>
				<span class="radio__label text-base text-pink-700">
					<img src="/icons/sushi.webp" alt="SushiSwap" />
				</span>
			</label>

			<label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
				<span class="checkbox__input">
					<input
						name="checkbox_p"
						type="radio"
						value="QuickSwap"
						bind:group={platformSelected}
						on:change={handlePlatformFilter} />
					<span class="checkbox__control">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								d="M1.73 12.91l6.37 6.37L22.79 4.59" />
						</svg>
					</span>
				</span>
				<span class="radio__label text-base text-blue-700">
					<img src="/icons/quick.svg" alt="QuickSwap" />
				</span>
			</label>

			<label for="my-control" class="checkbox gap-1 pl-4 sm:pl-0">
				<span class="checkbox__input">
					<input
						name="checkbox"
						type="checkbox"
						on:change={handleHideZeroBalancesFilter} />
					<span class="checkbox__control">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							aria-hidden="true"
							focusable="false">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								d="M1.73 12.91l6.37 6.37L22.79 4.59" />
						</svg>
					</span>
				</span>
				<span id="zero" class="radio__label text-base dark:font-normal "
					>{$_('vaultFilter.hidezero')}</span>
			</label>
		</div>

		<div
			class=" m-auto mt-2 inline-block max-w-7xl pt-4 pb-4 sm:ml-0 sm:mb-0 sm:mr-0 sm:mt-2	">
			<div class="title pl-2 pb-2 text-sm uppercase">
				{$_('vaultFilter.filterby')}
			</div>
			<div class="content-select">
				<select class="dark:bg-neutral-500" bind:value={filterBy}>
					<option value="TVL">TVL</option>
					<option value="APY">APY</option>
				</select>
				<i />
			</div>
		</div>

		<div
			class=" m-auto mt-2 inline-block pt-4 pb-4 sm:ml-2 sm:mb-0 sm:mr-0 sm:mt-2	">
			<div class="title pl-2 pb-2 text-sm uppercase">
				{$_('vaultFilter.sortby')}
			</div>
			<div class="content-select">
				<select bind:value={sortBy}>
					<option class="min-w-7xl" value="Descending"
						>{$_('vaultFilter.desceding')}</option>
					<option value="Ascending">{$_('vaultFilter.ascending')}</option>
				</select>
				<i />
			</div>
		</div>

		<div
			class=" m-auto mt-2 inline-block pt-4 pb-4 sm:ml-2 sm:mb-0 sm:mr-2 sm:mt-2	">
			<div class="title pl-2 pb-2 text-sm uppercase">
				{$_('vaultFilter.search')}
			</div>
			<div class="content-input">
				<input
					type="text"
					placeholder={$_('vaultFilter.searchvaults')}
					bind:value={statement}
					on:input={handleSearchByName} />
			</div>
		</div>

		<div
			class="m-auto mt-4 inline-block pt-8 pb-4 sm:ml-2 sm:mb-0 sm:mr-0 sm:mt-2 sm:pt-10	">
			<div class="flex flex-row">
				<div class="pt-1">
					<input
						checked={stakedOnly}
						type="checkbox"
						id="switch"
						on:click={handleStakedOnlyFilter} /><label
						id="switch-label"
						for="switch">A</label>
				</div>
				<p class="pt-2 pl-2">{$_('vaultFilter.stakedonly')}</p>
			</div>
		</div>
	</div>
</div> -->

<div
	class="sideShadow mx-auto mb-8 h-[200px] max-w-6xl rounded-lg bg-white py-4 px-9 dark:bg-neutral-800">
	<div class=" grid h-full w-full grid-cols-4 ">
		<div>
			<input
				type="checkbox"
				checked={true}
				class="  h-[20px] w-[20px] accent-primary-400 dark:accent-analogPurple-400" />
		</div>
	</div>
</div>

<style>
	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
