<script lang="ts">
	import Grid from '$lib/components/UI/Grid.svelte';

	import type { Pixel } from '$lib/types/types';

	const grid = [6, 6];

	const pixels: Pixel[] = [
		{ coords: { x: 0, y: 0 }, color: '40D015' },
		{ coords: { x: 1, y: 0 }, color: '40D015' },
		{ coords: { x: 2, y: 0 }, color: '40D015' },
		{ coords: { x: 3, y: 0 }, color: '40D015' },
		{ coords: { x: 4, y: 0 }, color: '40D015' },
		{ coords: { x: 5, y: 0 }, color: '40D015' },
		{ coords: { x: 0, y: 1 }, color: '40D015' },
		{ coords: { x: 1, y: 1 }, color: '40D015' },
		{ coords: { x: 2, y: 1 }, color: '40D015' },
		{ coords: { x: 3, y: 1 }, color: '40D015' },
		{ coords: { x: 4, y: 1 }, color: '40D015' },
		{ coords: { x: 5, y: 1 }, color: '40D015' },
		{ coords: { x: 0, y: 2 }, color: '40D015' },
		{ coords: { x: 1, y: 2 }, color: '40D015' },
		{ coords: { x: 2, y: 2 }, color: '40D015' },
		{ coords: { x: 3, y: 2 }, color: '40D015' },
		{ coords: { x: 4, y: 2 }, color: '40D015' },
		{ coords: { x: 5, y: 2 }, color: '40D015' },
		{ coords: { x: 0, y: 3 }, color: '40D015' },
		{ coords: { x: 1, y: 3 }, color: '40D015' },
		{ coords: { x: 2, y: 3 }, color: '40D015' },
		{ coords: { x: 3, y: 3 }, color: '40D015' },
		{ coords: { x: 4, y: 3 }, color: '40D015' },
		{ coords: { x: 5, y: 3 }, color: '40D015' },
		{ coords: { x: 0, y: 4 }, color: '40D015' },
		{ coords: { x: 1, y: 4 }, color: '40D015' },
		{ coords: { x: 2, y: 4 }, color: '40D015' },
		{ coords: { x: 3, y: 4 }, color: '40D015' },
		{ coords: { x: 4, y: 4 }, color: '40D015' },
		{ coords: { x: 5, y: 4 }, color: '40D015' },
		{ coords: { x: 0, y: 5 }, color: '40D015' },
		{ coords: { x: 1, y: 5 }, color: '40D015' },
		{ coords: { x: 2, y: 5 }, color: '40D015' },
		{ coords: { x: 3, y: 5 }, color: '40D015' },
		{ coords: { x: 4, y: 5 }, color: '40D015' },
		{ coords: { x: 5, y: 5 }, color: '40D015' }
	];
</script>

<Grid {grid} {pixels} />
