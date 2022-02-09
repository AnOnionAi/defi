<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { darkMode } from '$lib/stores/dark';
	import Notifications from 'svelte-notifications';
	import { navigating, page } from '$app/stores';
	import LinearBar from '$lib/layout/LinearBar.svelte';
	import Modal from 'svelte-simple-modal';
	import 'virtual:windi.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { chainID, accounts, metamaskConnect, metamaskListeners, metaMaskDisconnect } from '$lib/stores/MetaMaskAccount';
	import WrongNetwork from '$lib/components/Modals/WrongNetwork.svelte';
	import { POLYGON_CHAIN_ID } from '$lib/config';

	let currentChain;
	let currentPath;
	let lastPath;

	$: {
		currentPath = $page.url.pathname;
		currentPath = currentPath.split('/');
		
		if ( typeof (Storage) !== 'undefined' ) {
			
			if ( (currentPath.length != 2 && currentPath[2] != 'dashboard') || sessionStorage.getItem('METAMASK_ACCOUNT') ) {		

				if ( !$accounts && JSON.stringify(currentPath) != JSON.stringify(lastPath) ) {		
					metamaskConnect();
					metamaskListeners();
				} 
			} 
		}
		
		lastPath = currentPath;
	}
</script>

<Notifications>
	<Modal>
		<Header />
		{#if $navigating}
			<div class="absolute left-0 top-0 w-screen z-10">
				<LinearBar />
			</div>
		{/if}
		<main class:dark={$darkMode} class="main  background_pattern  {$darkMode && 'bg-dark-500'} ">
			<slot />
		</main>
		<Footer />
	</Modal>
</Notifications>

<style>
	.main {
		min-height: 88vh;
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.dark-active {
		background: linear-gradient(to bottom, rgb(45, 55, 63) 0, #0b1216 500px);
	}
</style>
