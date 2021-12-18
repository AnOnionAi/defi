<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import '../app.css';
	import 'virtual:windi.css';
	import { darkMode } from '$lib/stores/dark';
	import Notifications from 'svelte-notifications';
	import { navigating } from '$app/stores';
	import LinearBar from '$lib/layout/LinearBar.svelte';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.subscribe((value) => {
		console.log(value);
	});
</script>

<Notifications>
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
</Notifications>

<style>
	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;

		height: 100%;
		margin: 0 auto;
	}
	.dark-active {
		background: linear-gradient(to bottom, rgb(45, 55, 63) 0, #0b1216 500px);
	}
</style>
