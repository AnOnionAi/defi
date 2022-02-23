<script lang="ts">
	import { slide } from 'svelte/transition';
	import NavbarRoute from '../Buttons/NavbarRoute.svelte';
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import DarkModeButton from '../Buttons/DarkModeButton.svelte';
	import { isHomescreen } from '$lib/stores/homescreen';
	import ConnectButton from '../Buttons/ConnectButton.svelte';
</script>

<div
	in:slide={{ duration: 400 }}
	out:slide={{ duration: 400 }}
	class=" bg-paper lg:hidden {$darkMode &&
		!$isHomescreen &&
		'divide-zinc-600 bg-zinc-800'} {$isHomescreen &&
		'z-10 bg-transparent text-white backdrop-blur backdrop-filter'} py-1s flex  flex-col items-center divide-y   {$darkMode &&
		'text-white'}">
	<div class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute
			pageTitle={$_('headers.dashboard.text')}
			pageRoute="/dashboard" />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute
			pageTitle={$_('headers.dividends.text')}
			pageRoute="/dividends" />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.farms.text')} pageRoute="/farms" />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.pools.text')} pageRoute="/pools" />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<NavbarRoute pageTitle={$_('headers.vaults.text')} pageRoute="/vaults" />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<DarkModeButton />
	</div>
	<div class="flex w-full items-center justify-center py-3 text-center">
		<ConnectButton />
	</div>
</div>
