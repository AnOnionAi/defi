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
	import NavRouteSection from '$lib/components/HeaderComponents/NavRouteSection.svelte';
	import NavbarRoute from '$lib/components/Buttons/NavbarRoute.svelte';
	import Logo from '$lib/components/HeaderComponents/Logo.svelte';
	import NavbarLayout from '$lib/components/HeaderComponents/NavbarLayout.svelte';
	import NavContainer from '$lib/components/HeaderComponents/NavContainer.svelte';
	import { slide } from 'svelte/transition';
	import MobileNavbar from '$lib/components/HeaderComponents/MobileNavbar.svelte';

	let navbarMenuIsOpen = false;
	let showDropDownMenu = false;

	let menu;

	if (!$page.params.lang) {
		setInit('en');
	}

	if ($page.params.lang) {
		setInit($page.params.lang);
	}
</script>

<svelte:window
	on:click={(e) => {
		if (showDropDownMenu && !menu.contains(e.target)) {
			console.log('click');
			showDropDownMenu = false;
		}
	}}
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			showDropDownMenu = false;
		}
	}} />

<NavbarLayout>
	<NavContainer>
		<div class="flex md:hidden">
			<LangPicker />
		</div>
		<div class="flex items-center" bind:this={menu}>
			<Logo />
			<div class="hidden md:flex">
				<LangPicker bind:isShowing={showDropDownMenu} />
			</div>
			<NavRouteSection>
				<NavbarRoute
					pageTitle={$_('headers.dashboard.text')}
					pageRoute="/dashboard" />
				<NavbarRoute
					pageTitle={$_('headers.dividends.text')}
					pageRoute="/dividends" />
				<NavbarRoute pageTitle={$_('headers.farms.text')} pageRoute="/farms" />
				<NavbarRoute pageTitle={$_('headers.pools.text')} pageRoute="/pools" />
				<NavbarRoute
					pageTitle={$_('headers.vaults.text')}
					pageRoute="/vaults" />
			</NavRouteSection>
		</div>

		<div class="hidden lg:flex lg:gap-x-4 xl:gap-x-6">
			<DarkModeButton />
			<MushPrice />
			<ConnectButton />
		</div>
		<div class=" sm:flex lg:hidden">
			<HamburgerButton bind:open={navbarMenuIsOpen} />
		</div>
	</NavContainer>

	{#if navbarMenuIsOpen}
		<MobileNavbar />
	{/if}
</NavbarLayout>
