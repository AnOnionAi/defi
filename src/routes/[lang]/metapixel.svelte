<script lang="ts" module="context">
	import { onMount } from 'svelte';
	import '@melloware/coloris/dist/coloris.css';
	import Coloris from '@melloware/coloris';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';

	const development = true;

	let pixelsData = [];

	let gridContainer;
	let size = 64;

	onMount(() => {
		Coloris.init();

		Coloris({ el: '.pixel', defaultColor: '#000000' });
		Coloris.close();

		for (let index = 0; index < size * size; index++) {
			pixelsData[index] = '#ffffff';
		}
	});
</script>

{#if development}
	<DisabledFeature />
{:else}
	<div bind:this={gridContainer} id="grid" class="m-auto mb-8 mt-8 w-11/12">
		{#each pixelsData as pixel}
			<div class="clr-field" style="color: {pixel};">
				<button
					aria-labelledby="clr-open-label"
					style="width: 100%; height:100%;" />
				<input
					class="pixel"
					type="text"
					style="width: 100%;
				height: max-content;
				border-radius: 2px;" />
			</div>
		{/each}
	</div>
{/if}

<style>
	#grid {
		background-color: rgb(40, 40, 40);
		display: grid;
		grid-template-columns: repeat(64, 1fr);
		grid-template-rows: repeat(64, 1fr);
		gap: 3px;
		padding: 3px;
	}

	.clr-field {
		display: inline-block;
		position: relative;
	}

	.pixel {
		width: 5px;
		height: 5px;
		padding: 0 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		box-sizing: border-box;
	}

	.clr-field button:after {
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		border-radius: inherit;
		background-color: currentColor;
		box-shadow: inset 0 0 1px rgb(0 0 0 / 50%);
	}
</style>
