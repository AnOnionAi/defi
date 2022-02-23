<script lang="ts">
	export let disableInput = false;
	export let handleButton: () => void;
	export let buttonDisabled = false;
	export let isLoading = false;
	export let buttonText: string;
	export let placeholderText: string;
	export let displayNumber: number;
	export let afterText = '';
	import { Chasing } from 'svelte-loading-spinners';
	import onyAllowFloatNumbers from '$lib/utils/inputsHelper';
	import { _ } from 'svelte-i18n';

	export let inputValue;
</script>

<div>
	<p class="ml-1 mb-1 text-sm text-gray-500 dark:text-gray-200">
		{placeholderText}:
		<span class="text-black dark:text-white">
			{#if displayNumber != null}
				{displayNumber}{afterText}
			{:else}
				{$_('actions.notAvaliable')}
			{/if}
		</span>
	</p>
	<div
		class="flex h-16 justify-between rounded-xl bg-gray-300 px-2 py-2 dark:bg-gray-800">
		<input
			disabled={disableInput}
			bind:value={inputValue}
			on:keypress={onyAllowFloatNumbers}
			type="text"
			class="h-full flex-1 bg-transparent px-1 text-lg font-medium dark:text-white" />
		<button
			on:click={handleButton}
			disabled={buttonDisabled}
			class="h-auto  bg-black {!buttonDisabled &&
				'hover:bg-green-500 dark:hover:bg-emerald-400'} {isLoading &&
				'bg-green-500 dark:bg-emerald-400'} flex items-center justify-center gap-x-2  rounded-lg px-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
			>{buttonText}
			{#if isLoading}
				<Chasing size={16} color={'#fff'} />
			{/if}
		</button>
	</div>
</div>

<style>
	button {
		min-width: 96px;
	}
</style>
