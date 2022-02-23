<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import { darkMode } from '$lib/stores/dark';
	import Notifications from 'svelte-notifications';
	import { navigating, page } from '$app/stores';
	import LinearBar from '$lib/layout/LinearBar.svelte';
	import Modal from 'svelte-simple-modal';	
	import '../app.css';
	import {
		chainID,
		accounts,
		metamaskConnect,
		metamaskListeners,
	} from '$lib/stores/MetaMaskAccount';

	let currentChain;
	let currentPath;
	let lastPath;

	$: {
		currentPath = $page.url.pathname;
		currentPath = currentPath.split('/');

		if (typeof Storage !== 'undefined') {
			if (
				(currentPath.length != 2 && currentPath[2] != 'dashboard') ||
				sessionStorage.getItem('METAMASK_ACCOUNT')
			) {
				if (
					!$accounts &&
					JSON.stringify(currentPath) != JSON.stringify(lastPath)
				) {
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
			<div class="absolute left-0 top-0 z-10 w-screen">
				<LinearBar />
			</div>
		{/if}
		<main class:dark={$darkMode} class="main  background_pattern  {$darkMode && 'bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-900'} ">
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
	
</style>
