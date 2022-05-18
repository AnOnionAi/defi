<script lang="ts">
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import DisabledFeature from '$lib/components/Cards/DisabledFeature.svelte';
	import metapixelABI from '$lib/config/abi/Metapixel.json';
	import famABI from '$lib/config/abi/FAM.json';
	import { BigNumber, ethers } from 'ethers';
	import { getSigner } from '$lib/utils/web3Utils';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { _ } from 'svelte-i18n';
	import { isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import { metaMaskCon } from '$lib/utils/metamaskCalls';
	import MetamaskNotInstalled from '../../lib/components/Modals/MetamaskNotInstalled.svelte';
	const { open } = getContext('simple-modal');

	const development = false;

	const metapixelAddress = '0x3ED9ffeb07522196F34D92E3aD849106eD3316c4';
	const famAddress = '0x0b072E25e06FacF1127580ec7f0C19FCC07Faaf8';
	const pixelsArray = [];

	const providerRinkeby = new ethers.providers.JsonRpcProvider(
		'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
	); // read

	const metapixelReadContract = new ethers.Contract(
		metapixelAddress,
		metapixelABI,
		providerRinkeby
	);

	const FAMreadContract = new ethers.Contract(
		famAddress,
		famABI,
		providerRinkeby
	);

	$: userAddress = $accounts?.[0];

	$: {
		if (userAddress) {
			checkApproved(userAddress);
		}
	}

	let tokenApproved = false;
	let gridContainer;
	let pixelSelectedX;
	let pixelSelectedY;
	let pixelSelectedColor;
	let pixelPrice;
	let token;
	let tokenSymbol;
	let inputColor;

	const checkApproved = async (userAddress) => {
		const tokenContract = new ethers.Contract(
			famAddress,
			famABI,
			providerRinkeby
		);
		const allowance: BigNumber = await tokenContract.allowance(
			userAddress,
			metapixelAddress
		);
		const estaAprobado = !allowance.isZero();
		console.log('Allowance', allowance);
		console.log(estaAprobado);
		tokenApproved = estaAprobado;
	};

	const changeColor = (e) => {
		e.target.style.backgroundColor = inputColor.value;
		pixelSelectedColor = inputColor.value;
	};

	const changePixelSelected = (x, y) => {
		pixelSelectedX = x;
		pixelSelectedY = y;
	};

	const paint = async () => {
		if (
			(pixelSelectedX || pixelSelectedX == 0) &&
			(pixelSelectedY || pixelSelectedY == 0) &&
			pixelSelectedColor
		) {
			pixelSelectedColor = pixelSelectedColor.substring(
				1,
				pixelSelectedColor.length
			);

			const metapixelWriteContract = new ethers.Contract(
				metapixelAddress,
				metapixelABI,
				getSigner()
			);

			pixelSelectedColor = parseInt(pixelSelectedColor, 16);

			await metapixelWriteContract.addPixel(
				pixelSelectedColor,
				pixelSelectedX,
				pixelSelectedY
			);

			location.reload();
		} else {
			console.log('No entro');
		}
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

	const onApprove = async () => {
		const famWriteContract = new ethers.Contract(
			famAddress,
			famABI,
			getSigner()
		);

		await famWriteContract.approve(
			metapixelAddress,
			'10000000000000000000000000'
		);
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

	const openMetamaskAlertModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};

	// 1. Usuario no esta logueado  <Login/>
	// 2. Usuario logueado PERO sin approve <Approve/>
	// 3. Usuario logueado y con approve.
</script>

{#if development}
	<DisabledFeature />
{:else}
	<div class="Metapixel grid grid-rows lg:grid-cols">
		<div class="metapixel-card information p-4">
			<div
				class="bg-white dark:bg-neutral-800 rounded-2xl sideShadow w-max m-auto grid grid-rows-2">
				<div class="options grid grid-cols-2">
					<div class="input-color m-auto">
						<input
							bind:this={inputColor}
							type="color"
							id="color"
							value="#fe7688" />
					</div>
					<div class="button-paint m-auto">
						{#if !userAddress}
							<button
								on:click={isMetaMaskInstalled()
									? metaMaskCon
									: openMetamaskAlertModal}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.unlock')}</p>
							</button>
						{:else if userAddress && !tokenApproved}
							<button
								on:click={onApprove}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.approve')}</p>
							</button>
						{:else}
							<button
								on:click={paint}
								class="flex items-center bg-black disabled:opacity-50 false text-white font-semibold rounded-lg px-5 py-3 tracking-wide hover:bg-pink-500 s-YQIdR16N_soy"
								data-dashlane-rid="96e3e72566535f11"
								data-dashlane-label="true"
								data-form-type="action"
								><p>{$_('actions.paint')}</p>
							</button>
						{/if}
					</div>
				</div>

				<div class="description mt-8 px-8 pb-4 flex flex-col">
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Jackpot:</p>
						<p class="dark:text-white">$48124</p>
					</div>
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Token:</p>
						<p class="dark:text-white">{token}({tokenSymbol})</p>
					</div>
					<div class="mb-2 flex justify-between">
						<p class="dark:text-white mr-2">Price to Paint:</p>
						<p class="dark:text-white">${pixelPrice}</p>
					</div>
				</div>
			</div>
		</div>

		<div
			bind:this={gridContainer}
			id="grid"
			class="m-auto mb-8 mt-5 w-11/12 sideShadow" />
	</div>
{/if}

<style>
	@media only screen and (max-width: 1160px) {
		.Metapixel {
			grid-template-rows: 25% 80%;
		}
		#grid {
			margin-top: 2em;
		}
	}

	@media only screen and (min-width: 1160px) {
		.Metapixel {
			grid-template-columns: 25% 80%;
		}
	}

	.metapixel-card {
		width: 336px;
		height: 496px;
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
