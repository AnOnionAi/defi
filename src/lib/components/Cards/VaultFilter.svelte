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

<div
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
					<img src="/icons/sushi.png" alt="SushiSwap" />
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
</div>

<style>
	#switch[type='checkbox'] {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	#switch-label {
		cursor: pointer;
		text-indent: -9999px;
		width: 70px;
		height: 35px;
		background: grey;
		display: block;
		border-radius: 100px;
		position: relative;
	}

	#switch-label:after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		width: 25px;
		height: 25px;
		background: #fff;
		border-radius: 45px;
		transition: 0.3s;
	}

	#switch:checked + label {
		background: rgba(16, 185, 129, var(--tw-bg-opacity));
	}

	#switch:checked + label:after {
		left: calc(100% - 5px);
		transform: translateX(-90%);
	}

	#switch-label:active:after {
		width: 20px;
	}

	img {
		width: 32px;
		height: 32px;
	}

	.content-input input {
		display: inline-block;
		width: 100%;
		padding: 7px 10px;
		height: 42px;
		outline: 0;
		border: 0;
		border-radius: 0;
		background: #f0f0f0;
		color: #7b7b7b;
		font-size: 1.1em;
		font-weight: 400;
		color: #999;

		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		position: relative;
		transition: all 0.25s ease;
		opacity: 1;
	}

	.title {
		font-size: 15px;
		font-weight: 400;
	}

	/* ----------- DROP DOWN STYLES ---------------- */

	.content-select select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	/* Eliminamos la fecha que por defecto aparece en el desplegable */
	.content-select select::-ms-expand {
		display: none;
	}

	.content-select {
		position: relative;
	}

	.content-select select {
		display: inline-block;
		width: 100%;
		max-width: 200px;
		min-width: 200px;
		cursor: pointer;
		padding: 7px 10px;
		height: 42px;
		outline: 0;
		border: 0;
		border-radius: 0;
		background: #f0f0f0;
		font-size: 1.1em;
		font-weight: 400;
		color: #999;
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 12px;
		position: relative;
		transition: all 0.25s ease;
	}

	.content-select select:hover {
		background: #b1e8cd;
	}

	select option {
		min-width: 200px;
		min-height: 200px;
		cursor: pointer;
		height: 500px;
	}

	/* 
    Creamos la fecha que aparece a la izquierda del select.
    Realmente este elemento es un cuadrado que sólo tienen
    dos bordes con color y que giramos con transform: rotate(-45deg);
    */
	.content-select i {
		position: absolute;
		right: 20px;
		top: calc(50% - 13px);
		width: 16px;
		height: 16px;
		display: block;
		border-left: 4px solid #2ac176;
		border-bottom: 4px solid #2ac176;
		transform: rotate(-45deg); /* Giramos el cuadrado */
		transition: all 0.25s ease;
	}

	.content-select:hover i {
		margin-top: 3px;
	}

	/* ------------ CHECKBOX STYLES --------------- */
	input[type='radio'] {
		cursor: pointer;
	}

	input[type='checkbox'] {
		cursor: pointer;
	}

	.checkbox {
		display: grid;
		grid-template-columns: min-content auto;
		font-size: 2rem;
		color: var(--color);
		max-width: 200px;
		min-width: 200px;
	}

	.checkbox .radio__label {
		font-size: 16px;
	}

	.radio__label#all {
		color: #059669;
	}

	.radio__label#zero {
		color: #dc2626;
	}

	input {
		opacity: 0;
		width: 1em;
		height: 1em;
		z-index: 2;
	}

	.checkbox__control {
		width: 0.8em;
		height: 0.8em;
		border-radius: 0.2em;
		border: 0.1em solid currentColor;
	}

	.checkbox__input {
		display: grid;
		grid-template-areas: 'checkbox';
	}
	.checkbox__input > * {
		grid-area: checkbox;
	}

	.checkbox__control svg {
		transition: transform 0.1s ease-in 25ms;
		transform: scale(0);
		transform-origin: bottom left;
	}

	.checkbox__input input:checked + .checkbox__control svg {
		transform: scale(1);
	}

	.checkbox__input input:focus + .checkbox__control {
		box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
	}

	.checkbox__input input:hover + .checkbox__control {
		box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
	}

	.checkbox__input input:checkbox:disabled + .checkbox__control {
		color: red;
	}
</style>
