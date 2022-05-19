<script lang="ts">
	import PixelsMock from '$lib/config/constants/board.mock';
	import { getBoardSize } from '$lib/utils/metapixel';
	import queryBoard from '$lib/utils/queryBoard';
	import { onMount } from 'svelte';

	import BigSpinner from '../LoadingUI/BigSpinner.svelte';
	import CustomSpinner from '../LoadingUI/CustomSpinner.svelte';
	import Grid from './Grid.svelte';

	let loading = true;
	let error = false;

	let gridSizeX = 0;
	let gridSizeY = 0;

	onMount(async () => {
		const { x, y } = await getBoardSize();
		gridSizeX = x;
		gridSizeY = y;
		console.log(gridSizeX, gridSizeY);
		const boardPixels = await queryBoard();
		loading = false;
	});
</script>

<div class="h-full w-full select-none">
	{#if loading}
		<div class="flex h-full w-full  flex-col items-center justify-center gap-4">
			<BigSpinner tailwindWidthClass="w-20" tailwindnHeightClass="h-20" />
			<h1 class="text-xl font-bold text-gray-600 dark:text-gray-200">
				Loading Metapixel...
			</h1>
		</div>
	{:else}
		<Grid grid={[gridSizeX, gridSizeY]} pixels={PixelsMock} />
	{/if}
</div>
