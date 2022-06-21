<script lang="ts">
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';
	export let headingText: string;
</script>

<div>
	<p class="text-sm text-gray-600 dark:text-gray-300">
		{#if headingText}
			{headingText}
		{:else}
			<LoadingSkeleton styles={{ width: '52px', height: '20px' }} />
		{/if}
	</p>

	<slot />
</div>
