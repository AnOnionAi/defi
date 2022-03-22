<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;400;900&display=swap"
		rel="stylesheet" />
	<script
		src="https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"></script>
</svelte:head>

<section class=" h-full">
	<article class="flex  w-full px-4 pt-[10%] md:px-8 lg:px-10 xl:px-12">
		<div class="w-full flex-1">
			<h2
				class="select-none p-2 text-center text-4xl font-medium capitalize text-primary-400 dark:text-analogPurple-200 md:text-left md:text-4xl lg:text-4xl xl:text-5xl">
				{$_('headers.automated-crypto.text')}
			</h2>
			<p
				class="px-4 text-justify text-sm text-gray-700  dark:text-gray-300 lg:leading-relaxed xl:text-lg">
				{$_('about.automated-description')}
			</p>
		</div>
		<div class="flex w-0 md:w-5/12 lg:w-5/12  xl:p-12">
			{#if $darkMode}
				<img
					src="/assets/cryptoportfolio_dark.svg"
					alt="Cryto Investments portfolio"
					class="" />
			{:else}
				<img
					src="/assets/cryptoportfolio_primary.svg"
					alt="Cryto Investments portfolio"
					class="" />
			{/if}
		</div>
	</article>

	<div class="farms-section-background {$darkMode && 'purple-gradient'} pb-8">
		<div class="relative">
			<div class="curve-first">
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none">
					<path
						d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
						class="shape-fill {$darkMode && 'shape-fill-dark'}" />
				</svg>
			</div>
			<article
				class="flex  w-full flex-col-reverse  justify-center  px-4 pt-[25%] md:flex-row md:px-8 md:pt-[10%] lg:px-10 xl:px-12">
				<div class="flex w-full justify-center md:w-5/12 lg:w-5/12  xl:p-12">
					<img
						src="/assets/cryptoVault.svg"
						alt="Cryto Investments portfolio"
						class="animation-glide" />
				</div>
				<div
					class="flex w-full flex-col items-center justify-center md:flex-1  md:items-start">
					<h2
						class="select-none text-center text-4xl font-bold capitalize text-gray-100  md:text-left   md:text-4xl lg:text-4xl xl:text-6xl">
						{$_('headers.vaults.text')}
					</h2>
					<p
						class="mt-2 text-justify text-sm leading-relaxed text-white dark:text-gray-200 xl:text-lg">
						{$_('about.vaults-description')}
					</p>
					<a
						href={`${$page.params.lang}/vaults`}
						class="mt-3  rounded-full bg-complementary-600 py-2 px-5 font-[500] capitalize text-white transition duration-500 hover:bg-complementary-500 dark:bg-analogPurple-400 dark:hover:bg-analogPurple-300"
						>{$_('dashboard.goDeposit')}</a>
				</div>
			</article>
		</div>

		<div class="min-h-[600px] px-8">
			<div class="grid grid-cols-1 gap-x-8 gap-y-6 py-12 md:grid-cols-2">
				<div class="flex flex-col items-center">
					<h2 class="text-center text-5xl font-bold text-white">
						{$_('headers.farms.text')}
					</h2>
					<p class="min-h-[140px] p-3 text-justify font-medium text-gray-100">
						{$_('about.farms-description')}
					</p>
					<a
						href={`${$page.params.lang}/farms`}
						class=" mb-3  rounded-full bg-complementary-600 py-2 px-5 font-[500] capitalize text-white transition duration-500 hover:bg-complementary-500 dark:bg-analogPurple-400 dark:hover:bg-analogPurple-300"
						>{$_('dashboard.startFarming')}</a>
					<img
						src="/assets/pickaxes.svg"
						alt="Crypto currencies"
						class="animation-glide w-[350px]" />
				</div>

				<div class="flex flex-col items-center">
					<h2 class="text-center text-5xl font-bold text-white">
						{$_('headers.pools.text')}
					</h2>
					<p class="min-h-[140px] p-3 text-justify font-medium text-gray-100">
						{$_('about.pools-description')}
					</p>
					<a
						href={`${$page.params.lang}/farms`}
						class=" mb-3  rounded-full bg-complementary-600 py-2 px-5 font-[500] capitalize text-white transition duration-500 hover:bg-complementary-500 dark:bg-analogPurple-400 dark:hover:bg-analogPurple-300"
						>{$_('dashboard.addLiquidity')}</a>
					<img
						src="/assets/poolsAssets.svg"
						alt="Crypto currencies"
						class="animation-glide w-[192px]" />
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex min-h-[700px] w-full content-center items-center p-5 md:p-5 lg:p-12">
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div
				class="flex w-full flex-col items-center justify-center gap-3 md:items-start">
				<h2
					class="text-3xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl  xl:text-5xl">
					{$_('headers.crypto-responsibility.text')}
				</h2>
				<p
					class="text-justify leading-relaxed text-gray-600 dark:text-gray-200">
					{$_('about.responsibility-description')}
				</p>
				<a
					target="_blank"
					href={`https://academy.binance.com/${$page.params.lang}`}
					class="mt-3  rounded-full bg-complementary-600 py-2 px-5 font-[500] capitalize text-white transition duration-500 hover:bg-complementary-500 dark:bg-analogPurple-400 dark:hover:bg-analogPurple-300"
					>{'Learn More ...'}</a>
			</div>
			<img
				src="/assets/cryptoResponsability.svg"
				alt=""
				class=" animation-glide w-[220px] justify-self-center md:w-[300px] lg:w-[360px]" />
		</div>
	</div>
</section>

<style>
	article {
		min-height: 102vh;
	}

	.curve-first {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.curve-first svg {
		position: relative;
		display: block;
		width: calc(127% + 1.3px);
		height: 73px;
		transform: rotateY(180deg);
	}

	.farms-section-background {
		background-image: linear-gradient(
			to left bottom,
			#ff4f69,
			#ff5d5c,
			#ff6b51,
			#fe7a47,
			#f9883e
		);
	}

	.curve-first .shape-fill {
		fill: #ffffff;
	}

	.curve-first .shape-fill-dark {
		fill: #121212;
	}

	.purple-gradient {
		background-color: #923cb5;
		background-image: linear-gradient(147deg, #923cb5 0%, #000000 74%);
	}

	.animation-glide {
		position: relative;
		animation: glide 1.5s ease-in-out alternate infinite;
	}

	@keyframes glide {
		from {
			left: 0px;
			top: 0px;
		}

		to {
			left: 0px;
			top: 25px;
		}
	}

	.second-section {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.second-section svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 44px;
	}

	.second-section .shape-fill {
		fill: #fdb0e1;
	}

	.second-section .shape-fill-dark {
		fill: #000000;
	}
</style>
