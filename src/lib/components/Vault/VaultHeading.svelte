<script lang="ts">
	import LoadingSkeleton from '../LoadingUI/LoadingSkeleton.svelte';

	export let headingText: string;
	export let subHeading: number;
</script>

<div>
	<p class="text-sm font-light text-gray-600 dark:text-gray-300">
		{headingText}
	</p>
	{#if subHeading}
		<p class="tracking-tighter dark:text-white">{subHeading} <slot /></p>
	{:else}
		<LoadingSkeleton styles={{ width: '52px', height: '20px' }} />
	{/if}
</div>
