<script lang="ts">
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';

	export let headingText: string;
</script>

<div>
	<p class="text-sm text-gray-600 dark:text-gray-300">
		{headingText}
	</p>

	<slot />

	<!-- <LoadingSkeleton styles={{ width: '52px', height: '20px' }} /> -->
</div>
