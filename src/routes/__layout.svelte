<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import '../app.css';
	import 'virtual:windi.css';
	import { darkMode } from '$lib/stores/dark';
</script>

<Header />
<main class:dark={$darkMode} class="main">
	<div class="dark:bg-blue-gray-900 main">
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

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
