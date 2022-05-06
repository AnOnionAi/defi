<script lang="ts" module="context">
	import { onMount } from 'svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';

	const development = false;

	let gridContainer;
	let size = 64;

	let inputColor;

	const changeColor = (e) => {
		e.target.style.backgroundColor = inputColor.value;
	};

	onMount(() => {
		const grid = document.querySelector('#grid');

		for (let i = 0; i < 64; i++) {
			for (let j = 0; j < 64; j++) {
				const div = document.createElement('div');
				div.classList.add('pixel');
				div.style.backgroundColor = '#f9fafb';
				grid.appendChild(div);

				div.addEventListener('click', changeColor);
				div.addEventListener('mouseover', () => {
					div.style.transform = 'scale(2)';
					div.style.zIndex = '2';
				});
				div.addEventListener('mouseleave', () => {
					div.style.transform = 'scale(1)';
					div.style.zIndex = '0';
				});
			}
		}
	});
</script>

{#if development}
	<DisabledFeature />
{:else}
	<div class="Metapixel grid grid-cols-2">
		<div class="information p-4">
			<div
				class="options bg-white dark:bg-neutral-800 grid grid-cols-2 w-max m-auto rounded-2xl sideShadow">
				<input bind:this={inputColor} type="color" id="color" value="#fe7688" />
				<button
					class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
					data-dashlane-rid="96e3e72566535f11"
					data-dashlane-label="true"
					data-form-type="action"
					><p>Paint</p>
				</button>
			</div>
			<div class="description mt-8">
				<h1 class="dark:text-white">Jackpot:</h1>
				<h1 class="dark:text-white">Token:</h1>
				<h1 class="dark:text-white">Price to Paint:</h1>
			</div>
		</div>

		<div bind:this={gridContainer} id="grid" class="m-auto mb-8 mt-2 w-11/12" />
	</div>
{/if}

<style>
	.Metapixel {
		grid-template-columns: 20% 80%;
	}

	#grid {
		background-color: #374151;
	}

	.options {
		padding: 1em;
		margin-bottom: 1em;
		justify-content: center;
		align-items: center;
	}

	#grid {
		height: 90vh;
		width: 90vh;
		display: grid;
		grid-template-columns: repeat(64, 1fr);
		grid-template-rows: repeat(64, 1fr);
		gap: 1px;
		padding: 1px;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
