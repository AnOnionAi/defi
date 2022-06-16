<script lang="ts">
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import Connect from '$lib/components/Cards/Connect.svelte';
	import Metapixel from '$lib/components/MetapixelUI/Metapixel.svelte';

	$: userAddress = $accounts?.[0];
</script>

{#if !userAddress}
	<div class="flex h-full w-full items-center justify-center">
		<div class="w-1/2 min-w-[320px] max-w-3xl ">
			<Connect />
		</div>
	</div>
{/if}
{#if userAddress}
	<Metapixel />
{/if}
