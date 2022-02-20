<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
</script>

<div class="background {$darkMode && 'background__dark'}">
	<div class=" mx-auto   max-w-screen-xl  px-2 pt-10">
		<slot />
	</div>
</div>

<style>
	.background {
		background-image: url('/backgrounds/dashboardMushrooms.png');
		background-size: cover;
	}

	.background__dark {
		background-image: url('/backgrounds/purpleMush.png');
		background-size: cover;
	}
</style>
