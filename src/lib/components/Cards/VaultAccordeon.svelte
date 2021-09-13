<script lang='ts'>
 export let tkn0Img;
 export let tkn1Img;

</script>


<div
			class="hover:bg-green-600 hover:cursor-pointer hover:shadow-md my-5 p-5 usdc_mush_g rounded-xl relative"
		>
			<span class="absolute top-0">
				<img class="w-15 inline mt-2" src={tkn0Img} />
			</span>
			<span class="absolute bottom-1 right-1">
				<img class="w-15 inline pt-2" src={tkn1Img} />
			</span>
			<div class="sm:flex sm:justify-between sm:items-center sm:mx-40">
				<div class="text-center">
					<p class="font-semibold">Earn USDC-MUSH LP</p>
					<h3 class="text-lg font-bold">USDC || ETH</h3>
				</div>
				<div class="mt-2">
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">APY</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">wallet</div>
						</div>
					</div>
					<div class="flex flex-row justify-around">
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">TVL</div>
						</div>
						<div>
							<div class="font-bold sm:px-3">457.81%</div>
							<div class="text-sm sm:px-3 font-semibold text-gray-900">DAILY</div>
						</div>
					</div>
				</div>
			</div>
			<p
				class="absolute shadow-md font-semibold top-0 right-0 p-3 mush-green rounded-tr-xl rounded-bl-xl"
			>
				QuickSwap
			</p>
		</div>