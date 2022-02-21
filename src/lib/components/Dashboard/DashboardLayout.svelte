<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
</script>

<div class="background {$darkMode && 'background__dark'}">
	<div class=" max-w-screen-xl   mx-auto  px-2 pt-10">
		<slot />
	</div>
</div>

<style>
	.background {
		background-image: url('/theme/dashboard/dashboardMushrooms.png');
		background-size: cover;
	}

	.background__dark {
		background-image: url('/theme/dashboard/purpleMush.png');
		background-size: cover;
	}
</style>
