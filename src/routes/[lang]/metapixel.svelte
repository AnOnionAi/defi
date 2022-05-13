<script lang="ts" module="context">
	import { onMount } from 'svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';
	import metapixelABI from '$lib/config/abi/Metapixel.json';
	import famABI from '$lib/config/abi/FAM.json';
	import { BigNumber, ethers } from 'ethers';
	import { getSigner } from '$lib/utils/web3Utils';

	const development = false;

	const metapixelAddress = '0x3ED9ffeb07522196F34D92E3aD849106eD3316c4';
	const famAddress = '0x0b072E25e06FacF1127580ec7f0C19FCC07Faaf8';
	const pixelsArray = [];

	const providerMetapixel = new ethers.providers.JsonRpcProvider(
		'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
	); // read

	const metapixelReadContract = new ethers.Contract(
		metapixelAddress,
		metapixelABI,
		providerMetapixel
	); // write

	const providerFAM = new ethers.providers.JsonRpcProvider(
		'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
	);

	const FAMreadContract = new ethers.Contract(famAddress, famABI, providerFAM);

	let gridContainer;

	let pixelSelectedX;
	let pixelSelectedY;
	let pixelSelectedColor;

	let pixelPrice;
	let token;
	let tokenSymbol;

	let inputColor;

	const changeColor = (e) => {
		e.target.style.backgroundColor = inputColor.value;
		pixelSelectedColor = inputColor.value;
	};

	const changePixelSelected = (x, y) => {
		pixelSelectedX = x;
		pixelSelectedY = y;
	};

	const paint = async () => {
		console.log(pixelSelectedX, pixelSelectedY, pixelSelectedColor);

		if (pixelSelectedX && pixelSelectedY && pixelSelectedColor) {
			pixelSelectedColor = pixelSelectedColor.substring(
				1,
				pixelSelectedColor.length
			);

			const metapixelWriteContract = new ethers.Contract(
				metapixelAddress,
				metapixelABI,
				getSigner()
			);

			const decimals = 18;
			const pixelColor = ethers.utils.parseUnits(pixelSelectedColor, decimals);

			await metapixelWriteContract.addPixel(
				pixelColor,
				pixelSelectedX,
				pixelSelectedY
			);

			location.reload();
		}
		console.log('No entro');
	};

	const arrayToMatrix = (array, rows, cols) => {
		const matrix = Array(rows);

		for (var i = 0; i < rows; i++) {
			matrix[i] = new Array(cols);
		}

		let index = 0;

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				matrix[i][j] = array[index];
				index++;
			}
		}

		return matrix;
	};

	onMount(async () => {
		let sizeX: BigNumber = await metapixelReadContract.gridSizeX();
		let sizeY: BigNumber = await metapixelReadContract.gridSizeY();

		pixelPrice = await metapixelReadContract.pixelFee();
		token = await FAMreadContract.name();
		tokenSymbol = await FAMreadContract.symbol();

		for (let i = 0; i < sizeX.toNumber(); i++) {
			for (let j = 0; j < sizeY.toNumber(); j++) {
				pixelsArray.push(metapixelReadContract.pixels(i, j));
			}
		}

		const pixels = await Promise.all(pixelsArray);

		const pixelMatrix = arrayToMatrix(pixels, sizeY, sizeX);

		const grid = document.querySelector('#grid');

		for (let i = 0; i < sizeX.toNumber(); i++) {
			for (let j = 0; j < sizeY.toNumber(); j++) {
				let color = pixelMatrix[i][j].color.toString(16);

				const div = document.createElement('div');
				div.classList.add('pixel');
				if (color != 0) {
					while (color.length < 6) color = '0' + color;
					div.style.backgroundColor = '#' + color;
				} else {
					div.style.backgroundColor = '#f3f4f6';
				}

				grid.appendChild(div);

				div.addEventListener('click', changeColor);
				div.addEventListener('click', () => changePixelSelected(i, j));
				div.addEventListener('mouseover', () => {
					div.style.transform = 'scale(1.3)';
					div.style.zIndex = '2';
					div.style.border = '1px solid';
				});
				div.addEventListener('mouseleave', () => {
					div.style.transform = 'scale(1)';
					div.style.zIndex = '0';
					div.style.border = '0px';
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
					on:click={paint}
					class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
					data-dashlane-rid="96e3e72566535f11"
					data-dashlane-label="true"
					data-form-type="action"
					><p>Paint</p>
				</button>
			</div>
			<div class="description mt-8">
				<h1 class="dark:text-white">Jackpot:</h1>
				<h1 class="dark:text-white">Token: {token}({tokenSymbol})</h1>
				<h1 class="dark:text-white">Price to Paint: ${pixelPrice}</h1>
			</div>
		</div>

		<div bind:this={gridContainer} id="grid" class="m-auto mb-8 mt-5 w-11/12" />
	</div>
{/if}

<style>
	.Metapixel {
		grid-template-columns: 20% 80%;
	}

	#grid {
		background-color: #f9fafb;
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
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(10, 1fr);
		gap: 1px;
		padding: 1px;
	}

	.sideShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
