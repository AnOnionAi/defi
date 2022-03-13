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
		accounts,
		metamaskConnect,
		metamaskListeners
	} from '$lib/stores/MetaMaskAccount';

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
		<main
			class:dark={$darkMode}
			class="main background_pattern flex flex-1  {$darkMode &&
				'bg-neutral-900'} ">
			<div class="flex-1">
				<slot />
			</div>
		</main>
		<Footer />
	</Modal>
</Notifications>

<style>
	.main {
		width: 100%;
	}
</style>
