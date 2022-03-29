<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import Icon from 'svelte-fa';
	import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
	import { darkMode } from '$lib/stores/dark';

	const changeDark = () => {
		darkMode.set(!$darkMode);
	};
</script>

<span
	on:click={changeDark}
	class=" {$darkMode &&
		''} block rounded-md px-2 py-3 font-medium {!$darkMode &&
		'spinner'} cursor-pointer hover:text-primary-400 dark:hover:text-analogPurple-300  ">
	{#if $darkMode}
		<Icon icon={faMoon} />
	{:else}
		<Icon icon={faSun} />
	{/if}
</span>

<style>
	.spinner {
		animation: spin 4s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
