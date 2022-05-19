<script>
	import { METAPIXEL_ADDRESS } from '$lib/config';

	import { famContract } from '$lib/utils/contracts';
	import { getSigner } from '$lib/utils/web3Utils';
	import { ethers } from 'ethers';

	const onApprove = async () => {
		await famContract
			.connect(getSigner())
			.approve(METAPIXEL_ADDRESS, ethers.constants.MaxUint256);
	};
</script>

<div class="flex h-full items-center justify-center bg-gray-200">
	<div
		class="flex w-[320px] flex-col items-center rounded-lg bg-white p-8 shadow-lg">
		<img src="/icons/usdc.svg" alt="USDC Token" class="imgToken mb-8" />
		<h1>USDC Approval</h1>
		<p class="mb-8 text-center">You must approve your USDC first</p>
		<button
			on:click={onApprove}
			class="rounded-xl bg-blue-500 px-4 py-2 text-center text-sm font-bold text-white hover:bg-blue-400"
			>Approve USDC</button>
	</div>
</div>

<style>
	.imgToken {
		width: 50%;
		height: 50%;
	}
</style>
