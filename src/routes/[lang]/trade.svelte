<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { MasterChef } from '$lib/utils/masterc';
	import { ethers } from 'ethers';

	onMount(async () => {
		const bar = parseFloat(ethers.utils.formatEther('0'));
		console.log(bar);
	});
</script>

<section>
	<br />
	<h1 class="text-dark-200 text-4xl dark:text-white">T R A D E</h1>
	<div class="h-full" />
</section>
