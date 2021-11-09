<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import 'virtual:windi.css';
	import { _ } from 'svelte-i18n';
	import { getLocaleFromNavigator } from 'svelte-i18n';
	import { scale } from 'svelte/transition';
	import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet.js';
	import { faSun } from '@fortawesome/free-solid-svg-icons/faSun.js';
	import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon.js';
	import { faBars } from '@fortawesome/free-solid-svg-icons/faBars.js';
	import Icon from 'svelte-fa';
	import { darkMode } from '$lib/stores/dark';
	import {isHomescreen} from "$lib/stores/homescreen"
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { goto } from '$app/navigation';
	import { setInit } from '../i18n/init';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let navbarMenuIsOpen = false;
	let showDropDownMenu = false;
	let home = false;
	let menu;
	let isDark: boolean;

	darkMode.subscribe((val) => {
		isDark = val;
	});
	const changeDark = (e) => {
		darkMode.set(!isDark);
	};

	if (!$page.params.lang) {
		setInit("en");
	}

	if ($page.params.lang) {
		setInit($page.params.lang);
	}

	const LANGUAGES = [
		{
			code: 'es',
			lang: 'Español'
		},
		{
			code: 'de',
			lang: 'Deutsche'
		},
		{
			code: 'en',
			lang: 'English'
		},
		{
			code: 'fr',
			lang: 'Français'
		}
	];

	const PAGES = [
		{
			route: `/dashboard`,
			title: $_('headers.dashboard.text')
		},
		{
			route: `/dividends`,
			title: $_('headers.dividends.text')
		},
		{
			route: `/farms`,
			title: $_('headers.farms.text')
		},
		{
			route: `/pools`,
			title: $_('headers.pools.text')
		},
		{
			route: `/vaults`,
			title: $_('headers.vaults.text')
		}
	];

	const gotoPage = (route: string, home: boolean = false) => {
		if (home) goto(`/${$page.params.lang}`, { replaceState: true });
		else goto(`/${$page.params.lang}${route.toLowerCase()}`, { replaceState: true });
		console.log($page.params.lang);
		
	};

	const validLang= (lang:string) => {
		const langs = ["es","en","de","fr"];
		if(langs.includes(lang)){
			return lang;
		}
		else{
			return "en";
		}
	}


	let isInstalled = 'checking';
	onMount(() => {
		const isMetaMaskInstalled = () => {
			//Have to check the ethereum binding on the window object to see if it's installed
			const { ethereum } = window;
			return Boolean(ethereum && ethereum.isMetaMask);
		};
		isInstalled = isMetaMaskInstalled() ? 'isInstalled' : 'notInstalled';
		if (isMetaMaskInstalled()) {
			window.ethereum.on('accountsChanged', (adresses: Array<string>) => {
				if (adresses.length == 0) accounts.set(undefined);
			});
		}
	});
	const metaMaskCon = async (eve: any) => {
		try {
			const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			accounts.set(user_accounts);
		} catch {
			console.log('failed');
		}
	};
</script>

<svelte:window
	on:click={(e) => {
		if (showDropDownMenu && !menu.contains(e.target)) {
			showDropDownMenu = false;
		}
	}}
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			showDropDownMenu = false;
		}
	}}
/>
<nav
	class="{isHomescreen && 'z-10'} backdrop-filter {($darkMode && !$isHomescreen) && 'dark-active'} backdrop-blur top-0 w-full text-black "
	class:dark={$darkMode}
>
	<div class=" flex items-center justify-between h-16 px-5 ">
		<div
			bind:this={menu}
			class="sm:absolute sm:left-36 border hover:bg-gray-100 dark:border-none rounded-md  items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<div>
				<button
					on:click={() => {
						showDropDownMenu = !showDropDownMenu;
					}}
					class="dark:border dark:rounded-md dark:hover:bg-blue-gray-600 hover:bg-gray-100 focus:outline-none font-medium flex p-2 items-center "
				>
					<p class="m-0 font-semibold text-gray-900 dark:text-white">
						{$page.params.lang ? validLang($page.params.lang) : '...'}
					</p>
				</button>
				{#if showDropDownMenu}
					<div
						in:scale={{ duration: 100, start: 0.95 }}
						out:scale={{ duration: 75, start: 0.95 }}
						class="dark:bg-blue-gray-900 title z-10 sm:origin-top-right sm:left-0 absolute w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
					>
						{#each LANGUAGES as l}
							<button
								on:click={() => {
									goto(`/${l.code}`);
									setInit(l.code);
									window.location.replace(window.location.origin + `/${l.code.toLowerCase()}/`);
								}}
								style="background-color: {home ? (isDark ? 'black' : '#F3F4F6') : ''}; {isDark
									? 'color:white'
									: ''};"
								class:navbar_item_home={home}
								class="dark:hover:bg-blue-gray-900 dark:text-white border-none block w-full px-4 py-2 text-dark-200 hover:bg-gray-100"
							>
								{l.lang}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="sm:mr-3 flex-1 flex items-center justify-center sm:justify-start">
			<!-- LOGO -->
			<div class="flex-shrink-0 flex items-center">
				<span
					class="flex space-y-2 space-x-2 cursor-pointer"
					on:click={() => {
						gotoPage('', true);
					}}
				>
					<img class="w-10 rounded-full" src="/static/fungfi.png" alt="floppa" />
					<span class="w-24 text-lg dark:text-white font-semibold" style="margin: auto 0 auto 5px;">
						FUNG F I
					</span>
				</span>
			</div>
			<!-- day/nite toggle -->

			<div class="hidden lg:block sm:ml-auto">
				<div class="flex space-x-5 items-center">
					<a href="#">
						<span
							on:click={changeDark}
							class="dark:hover:bg-gray-800 hover:bg-gray-200 {$darkMode &&
								'dark:hover:bg-green-400'} block px-3 py-3 rounded-md font-medium"
						>
							{#if isDark}
								<Icon class="text-white" icon={faMoon} />
							{:else}
								<Icon class="text-black" icon={faSun} />
							{/if}
						</span>
					</a>
					{#each PAGES as page}
						<button
							on:click={() => {
								gotoPage(page.route);
							}}
						>
							<span
								class="dark:text-white dark:hover:bg-blue-gray-900 {$darkMode &&
									'dark:hover:bg-green-400'} block hover:bg-gray-200 px-3 text-dark-800 py-3 rounded-md font-medium hover:no-underline no-underline"
							>
								{page.title}
							</span>
						</button>
					{/each}
					<button
						disabled={isInstalled == 'checking' || $accounts}
						on:click={metaMaskCon}
						class="hover:bg-none flex rounded-lg {$accounts && 'cursor-default bg-green-400'}"
					>
						<span
							class="dark:text-white {$darkMode &&
								'dark:hover:bg-green-400'}  block hover:bg-gray-200 {isInstalled == 'checking' &&
								'cursor-default hover:bg-transparent'} {$accounts &&
								'hover:bg-transparent connected'} px-3 text-dark-800 py-3 mr-1 rounded-lg font-medium hover:no-underline no-underline"
						>
							{#if isInstalled == 'checking'}
								Checking Metamask...
							{:else if $accounts}
								Connected
							{:else if isInstalled == 'isInstalled'}
								Wallet
							{:else}
								<a
									target="blank"
									href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
								>
									Install Metamask
								</a>
							{/if}
						</span>
						<span
							class="{$accounts ? 'bg-green-400' : 'bg-gray-300'} m-auto p-2 rounded-1 inline-flex"
						>
							<Icon icon={faWallet} />
						</span>
					</button>
				</div>
			</div>
		</div>

		<!-- start hamburger button -->
		<div class="float-0 flex items-center lg:hidden">
			<button
				id="btn_hamburger_navbar"
				class="dark:text-light-600 focus:outline-none inline-flex items-center justify-center p-2 rounded-md
		  text-gray-500"
				on:click={() => {
					navbarMenuIsOpen = !navbarMenuIsOpen;
				}}
			>
				{#if !navbarMenuIsOpen}
					<Icon icon={faBars} />
				{:else}
					close
				{/if}
			</button>
			<!-- end hamburger button -->
		</div>
	</div>

	<!-- start mobile navbar -->
	<div
		class:menu_mobile_dark={home}
		class="{navbarMenuIsOpen
			? 'block'
			: 'hidden'} dark:text-white lg:hidden dark:bg-blue-gray-800 bg-white"
	>
		<div id="navbar-menu-mobile" class="text-center px-2 pt-2 pb-3 space-y-1">
			{#each PAGES as page}
				<button
					on:click={() => {
						gotoPage(page.route);
					}}
				>
					<span class="block dark:hover:bg-dark-600 px-3 py-3 rounded-md font-medium">
						{page.title}
					</span>
				</button>
			{/each}
			<a on:click={changeDark} href="#">
				<span class="block dark:hover:bg-dark-600 px-3 py-3 rounded-md font-medium">
					{#if isDark}
						<Icon icon={faMoon} />
					{:else}
						<Icon icon={faSun} />
					{/if}
				</span>
			</a>
			<button
				disabled={isInstalled == 'checking' || $accounts}
				on:click={metaMaskCon}
				class="m-auto hover:bg-none flex {$accounts && 'cursor-default bg-green-400'}"
			>
				<span
					class="dark:text-white dark:hover:bg-blue-gray-900 block hover:bg-gray-200 {isInstalled ==
						'checking' && 'cursor-default hover:bg-transparent'} {$accounts &&
						'hover:bg-transparent'} px-3 text-dark-800 py-3 mr-1 rounded-md font-medium hover:no-underline no-underline"
				>
					{#if isInstalled == 'checking'}
						Checking Metamask...
					{:else if $accounts}
						Connected
					{:else if isInstalled == 'isInstalled'}
						Connect to Metamask
					{:else}
						<a
							target="blank"
							href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
						>
							Install Metamask
						</a>
					{/if}
				</span>
				<span class="{$accounts ? 'bg-green-400' : 'bg-gray-300'} m-auto p-2 rounded-1 inline-flex">
					<Icon icon={faWallet} />
				</span>
			</button>
		</div>
	</div>
</nav>

<style global>
	.dark-active {
		background: #2c363e;
	}
	.navbar_item_home:hover {
		color: black;
	}
	.menu_mobile_dark {
		background-color: black !important;
	}
	button.bg-green-400 {
		border-radius: 15px;
		cursor: pointer;
	}
	span.connected:hover {
		border-radius: 15px;
		cursor: pointer;
	}
	@media only screen and (max-width: 700px) {
		span.connected:hover {
			border-radius: 15px;
			cursor: pointer;
		}
	}
</style>