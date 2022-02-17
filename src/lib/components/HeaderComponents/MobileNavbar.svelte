<script src="ts">
import { slide } from "svelte/transition";
import NavbarRoute from "../Buttons/NavbarRoute.svelte";
import { _ } from "svelte-i18n";
import { darkMode } from "$lib/stores/dark";
import DarkModeButton from "../Buttons/DarkModeButton.svelte";
import { isHomescreen } from "$lib/stores/homescreen";
import ConnectButton from "../Buttons/ConnectButton.svelte";
</script>

<div in:slide={{ duration: 400 }}
out:slide={{ duration: 400 }}
class=" lg:hidden bg-paper {$darkMode && !$isHomescreen && "bg-zinc-800 divide-zinc-600"} {$isHomescreen && "bg-transparent z-10 backdrop-filter backdrop-blur text-white"} flex flex-col  items-center py-1s divide-y   {$darkMode &&  "text-white"}">
<div class="w-full text-center flex items-center justify-center py-3">
	<NavbarRoute pageTitle={$_('headers.dashboard.text')} pageRoute="/dashboard"/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<NavbarRoute pageTitle={$_('headers.dividends.text')} pageRoute="/dividends"/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<NavbarRoute pageTitle={$_('headers.farms.text')} pageRoute="/farms"/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<NavbarRoute pageTitle={$_('headers.pools.text')} pageRoute="/pools"/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<NavbarRoute pageTitle={$_('headers.vaults.text')} pageRoute="/vaults"/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<DarkModeButton/>
</div>
<div class="w-full text-center flex items-center justify-center py-3">
	<ConnectButton/>
</div>
</div>