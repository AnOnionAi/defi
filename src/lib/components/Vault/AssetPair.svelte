<script lang="ts">
	import { _ } from 'svelte-i18n';
	export let token0Name: string;
	export let token1Name: string;
	export let platformName: string;

	const platformStyles = {
		quickswap:
			'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400',
		sushiswap:
			'border-pink-500 text-pink-500 dark:border-pink-400 dark:text-pink-400'
	};
</script>

<div class="mx-auto w-52">
	<div class="flex items-center justify-center lg:justify-start ">
		<div class="relative flex h-11 w-12">
			<img
				src={`/icons/${token0Name.toLowerCase()}.svg`}
				alt={'Token 1: ' + token0Name}
				class="h-7 w-7" />
			<img
				src={`/icons/${token1Name.toLowerCase()}.svg`}
				alt={'Token 2: ' + token1Name}
				class="absolute bottom-0 right-1 h-7 w-7" />
		</div>
		<div class="ml-2">
			<p
				class="smaller-font font-medium uppercase text-gray-600 dark:text-gray-400">
				{$_('actions.earn')}
				{token0Name}-{token1Name} LP
			</p>
			<p class="text-lg font-semibold dark:text-white ">
				{token0Name}-{token1Name}
			</p>

			<div
				class="flex h-6  w-20 items-center  justify-center rounded-full border-2 
				 text-xs font-medium capitalize tracking-wide {platformStyles[platformName]}">
				{platformName}
			</div>
		</div>
	</div>
</div>

<style>
	.secondary-font {
		color: rgb(151, 157, 198);
	}
	.smaller-font {
		font-size: 0.62rem;
	}
</style>
