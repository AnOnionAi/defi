<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { goto } from '$app/navigation';
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

	const gotoPage = (route: string, home: boolean = false) => {
		if (home) goto(`/${$page.params.lang}`, { replaceState: true });
		else goto(`/${$page.params.lang}${route.toLowerCase()}`, { replaceState: true });
		console.log($page.params.lang);
	};
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
	}}
/>

<nav
	class="{isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'bg-dark-500 border-dark-200'} backdrop-blur top-0 w-full  {!$isHomescreen &&
		'border-b-2'} border-gray-200 py-3 "
	class:dark={$darkMode}
>
	<div class=" flex items-center justify-between h-16 px-3 ">
		<div
			bind:this={menu}
			class="sm:absolute sm:left-35 border  dark:border-none rounded-md  items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<LangPicker bind:showDropDownMenu />
		</div>
		<div class="sm:mr-3 flex-1 flex items-center justify-center sm:justify-start">
			<!-- LOGO -->
			<div class="flex-shrink-0 flex items-center">
				<span
					class="flex cursor-pointer"
					on:click={() => {
						gotoPage('', true);
					}}
				>
					<img class="w-10 " src="/cute/fiji.svg" alt="Fung Finance Logo" />
					{#if $isHomescreen}
						<img class="mt-1 " src="/cute/fungfiDarkMode.svg" alt="Fung Finance" />
					{:else if $darkMode}
						<img class="mt-1 " src="/cute/fungfiDarkMode.svg" alt="Fung Finance" />
					{:else}
						<img class="mt-1 " src="/cute/fungfiLiteMode.svg" alt="Fung Finance" />
					{/if}
				</span>
			</div>
			<div class="ml-4 hidden lg:block ">
				<div
					class="flex items-center ml-9 space-x-2 dark:text-white {$isHomescreen && 'text-white'}"
				>
					{#each PAGES as page}
						<NavbarRoute pageRoute={page} />
					{/each}
				</div>
			</div>
			<!-- day/nite toggle -->

			<div
				class="hidden lg:flex space-x-5 ml-auto  dark:text-white items-center {$isHomescreen &&
					'text-white'}   "
			>
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
		class="{navbarMenuIsOpen ? 'block' : 'hidden'} dark:text-white lg:hidden  {$darkMode &&
			!$isHomescreen &&
			'bg-dark-600'}"
	>
		<div
			id="navbar-menu-mobile"
			class="text-center px-2 pt-2 pb-3 space-y-4 {$isHomescreen && 'text-white'}"
		>
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
