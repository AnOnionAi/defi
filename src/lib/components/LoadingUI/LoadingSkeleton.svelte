<script lang="ts">
	interface StyleConfig {
		width?: string;
		height?: string;
		backgroundColor?: string;
	}

	export let styles: StyleConfig;
</script>

<div
	style="width:{styles.width}; height:{styles.height}; "
	class="pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />

<style>
	.pulse {
		animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
