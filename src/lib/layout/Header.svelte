<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import 'virtual:windi.css';
	import { _ } from 'svelte-i18n';
	import { getLocaleFromNavigator } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ConnectButton from "$lib/components/Buttons/ConnectButton.svelte"
	import LangPicker from "$lib/components/Dropdowns/LangPicker.svelte"
	import DarkModeButton from '$lib/components/Buttons/DarkModeButton.svelte';
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import NavItemButton from '$lib/components/Buttons/NavItemButton.svelte';
	import NativeToken from '$lib/components/Buttons/NativeToken.svelte';


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

	

	onMount(() => {
		
	});


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
		'bg-dark-500'} backdrop-blur top-0 w-full text-black "
	class:dark={$darkMode}
>
	<div class=" flex items-center justify-between h-16 px-5 ">
		<div
			bind:this={menu}
			class="sm:absolute sm:left-36 border  dark:border-none rounded-md  items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<LangPicker bind:showDropDownMenu/>
		</div>
		<div class="sm:mr-3 flex-1 flex items-center justify-center sm:justify-start">
			<!-- LOGO -->
			<div class="flex-shrink-0 flex items-center">
				<span
					class="flex space-y-2 space-x-2 cursor-pointer"
					on:click={() => {
						gotoPage('', true);
					}}
				>
					<img class="w-10 rounded-full" src="/fungfi.png" alt="Fung Finance Logo" />
					<span class="w-24 text-lg dark:text-white font-semibold" style="margin: auto 0 auto 5px;">
						FUNG F I
					</span>
				</span>
			</div>
			<!-- day/nite toggle -->
			

			<div class="hidden lg:flex sm:ml-auto items-center ">
				<DarkModeButton/>
				
				<div class="flex items-center mx-10 space-x-2">
						{#each PAGES as page}
						<NavItemButton pageRoute={page}/>
					{/each}
					
						
					<!-- PUT HERE THE BUTTON -->
				</div>
				<NativeToken/>
				<ConnectButton/>
			</div>
		</div>

		<!-- start hamburger button -->
		<HamburgerButton bind:navbarMenuIsOpen/>
	</div>

	<!-- start mobile navbar -->
	<div
		class:menu_mobile_dark={home}
		class="{navbarMenuIsOpen ? 'block' : 'hidden'} dark:text-white lg:hidden  {$darkMode &&
			!$isHomescreen &&
			'bg-dark-600'}"
	>
		<div id="navbar-menu-mobile" class="text-center px-2 pt-2 pb-3 space-y-4">
			{#each PAGES as page}
			<div class="">
				<NavItemButton pageRoute={page}/>
			</div>
			{/each}
			<div class="flex justify-center">
				<DarkModeButton/>
			</div>
			<ConnectButton/>
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
