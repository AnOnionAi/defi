<script lang="ts">
	import Header from '$lib/components/Layout/Header.svelte';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import { darkMode } from '$lib/stores/dark';
	import Notifications from 'svelte-notifications';
	import { navigating } from '$app/stores';
	import Modal from 'svelte-simple-modal';
	import '../app.css';
	import { logUser, metamaskListeners } from '$lib/stores/MetaMaskAccount';
	import GradientLinearBar from '$lib/components/LoadingUI/GradientLinearBar.svelte';
	import { onMount, SvelteComponent } from 'svelte';
	import CustomNotification from '$lib/components/Notifications/CustomNotification.svelte';

	onMount(async () => {
		await metamaskListeners();
		await logUser();
	});

	/* 	$: {
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
	} */
</script>

<Notifications item={CustomNotification}>
	<Modal>
		<Header />
		{#if $navigating}
			<div class="absolute left-0 top-0 z-10 w-screen">
				<GradientLinearBar />
			</div>
		{/if}
		<main
			class:dark={$darkMode}
			class="main background_pattern flex flex-1  {$darkMode &&
				'bg-darkGrey-900 '} transition duration-500 ">
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
