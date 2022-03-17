<script lang="ts">
	import { slide } from 'svelte/transition';
	import NavbarRoute from '../Buttons/NavbarRoute.svelte';
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import DarkModeButton from '../Buttons/DarkModeButton.svelte';
	import { isHomescreen } from '$lib/stores/homescreen';
	import ConnectButton from '../Buttons/ConnectButton.svelte';

	export let navbarMenuIsOpen;

	const closeMenuOnPageSelect = () => {
		navbarMenuIsOpen = !navbarMenuIsOpen;
	};
</script>

<div
	in:slide={{ duration: 400 }}
	out:slide={{ duration: 400 }}
	class=" bg-paper lg:hidden {$darkMode &&
		!$isHomescreen &&
		'divide-zinc-600 bg-darkGrey-900'} {$isHomescreen &&
		'z-10 bg-transparent text-white backdrop-blur backdrop-filter'} py-1s flex  flex-col items-center divide-y   {$darkMode &&
		'text-white'}">
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute
			pageTitle={$_('headers.dashboard.text')}
			pageRoute="/dashboard" />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute
			pageTitle={$_('headers.dividends.text')}
			pageRoute="/dividends" />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.farms.text')} pageRoute="/farms" />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.pools.text')} pageRoute="/pools" />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.vaults.text')} pageRoute="/vaults" />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<DarkModeButton />
	</button>
	<button
		on:click={closeMenuOnPageSelect}
		class="flex w-full items-center justify-center py-3 text-center">
		<ConnectButton />
	</button>
</div>
