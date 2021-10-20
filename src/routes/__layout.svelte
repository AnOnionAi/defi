<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import '../app.css';
	import 'virtual:windi.css';
	import { darkMode } from '$lib/stores/dark';
</script>

<Header />
<main class:dark={$darkMode} class="main {$darkMode && 'dark-active'}">
	<div class=" main">
		<slot />
	</div>
</main>

<Footer />

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
	footer a {
		font-weight: bold;
	}
	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
