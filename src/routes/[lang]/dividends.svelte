<script context="module" lang="ts">
	export const prerender = false;
	import {darkMode} from '$lib/stores/dark'
	import { Chasing } from 'svelte-loading-spinners';
</script>

<div class="mb-12 mt-6">
	<p class="text-center text-3xl font-bold tracking-widest mb-5">DIVIDENDS</p>
<div  class="flex w-full dividends-wrapper {$darkMode && 'darkBackground'}">
	<div class="h-140 w-95/100 max-w-lg p-5 border-1 rounded-2xl shadow-xl bg-white dark:bg-dark-900 dark:border-green-500 ">
		<div class="h-full w-full ">
			<div class="flex flex-col justify-around w-full h-4/12">
				<div class="flex w-23/24 mx-auto justify-between items-center">
					<div class="flex items-center">
						<img src="/mushRound.png" alt="" class="w-10">
						<h2 class="text-2xl font-bold pl-2 {$darkMode && 'text-white'}">MUSH</h2>
					</div>
					<div>
						<p class="rounded-full py-1 px-4  border-2 border-green-500 text-green-600 inline text-xs font-semibold">
							Earn MUSH 🍄
						</p>
					</div>
				</div>

				<div class="w-full h-26 flex flex-col justify-between ">
					<div class="flex w-full h-12 text-center">
						<div class="w-6/12">
							<p class="text-xs text-gray-600 font-semibold {$darkMode && 'text-gray-300'}">APR</p>
							<p class="font-medium">65.82%</p>
						</div>

						<div class="w-6/12">
							<p class="text-xs text-gray-600 font-semibold">TVL</p>
							<p class="font-medium">$1000</p>
						</div>

					</div>

					<div class="flex w-full h-12 text-center">
						<div class="w-6/12">
							<p class="text-xs text-gray-600 font-semibold">Wallet</p>
							<p class="font-medium">0</p>
						</div>

						<div class="w-6/12">
							<p class="text-xs text-gray-600 font-semibold">Deposit</p>
							<p class="font-medium">2300</p>
						</div>

					</div>
				</div>
				
			</div>

			<div class="w-full h-8/12 flex flex-col justify-between">

				<div class="flex flex-col text-sm">
					<p class="text-gray-600 font-semibold mb-1 ml-1">Your Wallet:
						<span class="text-black">3000.2425252525 MUSH</span>
					</p>
					
					<div class="bg-gray-200 rounded-xl h-17 py-2 flex justify-around">
						<input type="text" class="bg-transparent h-full text-xl font-bold text-gray-700  w-7/12">
						<button class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5">
							<p>Deposit</p>
							<!-- <div class="pl-3">
								<Chasing size={18} unit="px" color="#FFF"></Chasing>
							</div> -->
						</button>
					</div>
					<p class="text-gray-600 font-medium mt-1 ml-1">0% Deposit Fee</p>
				</div>

				<div class="flex flex-col text-sm">
					<p class="text-gray-600 font-semibold ml-1">Deposited:
						<span class="text-black">0 MUSH</span>
					</p>
					
					<div class="bg-gray-200 rounded-xl h-17 py-2 flex justify-around">
						<input type="text" class="bg-transparent h-full text-xl font-bold text-gray-700  w-7/12">
						<button class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5">
							<p>Withdraw</p>
							<!-- <div class="pl-3">
								<Chasing size={18} unit="px" color="#FFF"></Chasing>
							</div> -->
						</button>
					</div>
					<p class="text-gray-600 font-medium mt-1 ml-1">0% Deposit Fee</p>
				</div>


				<div class="flex flex-col text-sm">
					<p class="text-gray-600 font-semibold">MUSH Earned:
						<span class="text-black"></span>
					</p>
					
					<div class="bg-gray-200 rounded-xl h-17 py-2 flex justify-around">
						<input type="text" class="bg-transparent h-full text-xl font-bold text-gray-700  w-7/12">
						<button class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5">
							<p>Harvest</p>
							<!-- <div class="pl-3">
								<Chasing size={18} unit="px" color="#FFF"></Chasing>
							</div> -->
						</button>
					</div>
					
				</div>




			</div>

			


			
		</div>
	</div>
</div>

</div>


<style>

	.test{
		justify-self: center;
	}

	.dividends-wrapper {
		width: 100%;
		height: 75vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--light-background);
	}


	.darkBackground{
	background-color: var(--dark-gradient);
}

.darkCard{
	background-color: var(--dark-thirty);
}





</style>