<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { setInit } from '../i18n/init';
	import { page } from '$app/stores';
	import ConnectButton from '$lib/components/Buttons/ConnectButton.svelte';
	import LangPicker from '$lib/components/Dropdowns/LangPicker.svelte';
	import DarkModeButton from '$lib/components/Buttons/DarkModeButton.svelte';
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import MushPrice from '$lib/components/Buttons/MushPrice.svelte';
	import NavbarRoute from '$lib/components/Buttons/NavbarRoute.svelte';

	let navbarMenuIsOpen = false;
	let showDropDownMenu = false;

	let home = false;
	let menu;

	if (!$page.params.lang) {
		setInit('en');
	}

	if ($page.params.lang) {
		setInit($page.params.lang);
	}

	const PAGES = [
		{
			route: `/dashboard`,
			title: $_('headers.dashboard.text')
		},
		{
			route: `/dividends`,
			title: $_('headers.dividends.text')
		},
		{
			route: `/farms`,
			title: $_('headers.farms.text')
		},
		{
			route: `/pools`,
			title: $_('headers.pools.text')
		},
		{
			route: `/vaults`,
			title: $_('headers.vaults.text')
		}
	];
</script>

<svelte:window
	on:click={(e) => {
		if (showDropDownMenu && !menu.contains(e.target)) {
			showDropDownMenu = false;
		}
	}}
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			showDropDownMenu = false;
		}
	}} />

<nav
	class="{isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'bg-dark-500 border-dark-200'} top-0 w-full backdrop-blur  {!$isHomescreen &&
		'border-b-2'} border-gray-200 py-2 "
	class:dark={$darkMode}>
	<div class=" flex h-16 items-center justify-between px-3 ">
		<div
			bind:this={menu}
			class="sm:left-35 flex items-center  rounded-md border  dark:border-none sm:static sm:absolute sm:inset-auto sm:mr-4">
			<LangPicker bind:showDropDownMenu />
		</div>
		<div
			class="flex flex-1 items-center justify-center sm:mr-3 sm:justify-start">
			<!-- LOGO -->
			<div class="flex flex-shrink-0 items-center">
				<a href={`/${$page.params.lang}/`} class="flex cursor-pointer">
					<img class="w-10 " src="/cute/fiji.svg" alt="Fung Finance Logo" />
					{#if $isHomescreen}
						<img
							class="mt-1 "
							src="/cute/fungfiDarkMode.svg"
							alt="Fung Finance" />
					{:else if $darkMode}
						<img
							class="mt-1 "
							src="/cute/fungfiDarkMode.svg"
							alt="Fung Finance" />
					{:else}
						<img
							class="mt-1 "
							src="/cute/fungfiLiteMode.svg"
							alt="Fung Finance" />
					{/if}
				</a>
			</div>
			<div class="ml-4 hidden lg:block ">
				<div
					class="ml-9 flex items-center space-x-2 dark:text-white {$isHomescreen &&
						'text-white'}">
					{#each PAGES as page}
						<NavbarRoute pageRoute={page} />
					{/each}
				</div>
			</div>
			<!-- day/nite toggle -->

			<div
				class="ml-auto hidden items-center space-x-5  dark:text-white lg:flex {$isHomescreen &&
					'text-white'}   ">
				<DarkModeButton />
				<MushPrice />
				<ConnectButton />
			</div>
		</div>

		<!-- start hamburger button -->
		<HamburgerButton bind:navbarMenuIsOpen />
	</div>

	<!-- start mobile navbar -->
	<div
		class:menu_mobile_dark={home}
		class="{navbarMenuIsOpen
			? 'block'
			: 'hidden'} dark:text-white lg:hidden  {$darkMode &&
			!$isHomescreen &&
			'bg-dark-600'}">
		<div
			id="navbar-menu-mobile"
			class="space-y-4 px-2 pt-2 pb-3 text-center {$isHomescreen &&
				'text-white'}">
			{#each PAGES as page}
				<div class="">
					<NavbarRoute pageRoute={page} />
				</div>
			{/each}
			<div class="flex justify-center">
				<DarkModeButton />
			</div>
			<ConnectButton />
		</div>
	</div>
</nav>

<style>
	.menu_mobile__background {
		background-color: #f9f9f9;
	}
	.dark-active {
		background: #2c363e;
	}
	.navbar_item_home:hover {
		color: black;
	}
</style>
