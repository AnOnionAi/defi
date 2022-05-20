<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	export let tailwindWidthClass = 'w-4';
	export let tailwindnHeightClass = 'h-4';
	export let tailwindBorderColorClass = 'border-white';
	export let tailwindSecondaryBorderColorClass = 'border-gray-700';
</script>

<div
	class="h-4 w-4 animate-spin rounded-full {tailwindWidthClass} {tailwindnHeightClass}
    border-[12px] border-solid {$darkMode
		? tailwindBorderColorClass
		: tailwindSecondaryBorderColorClass}  border-t-transparent" />
