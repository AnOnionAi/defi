<script context="module" lang="ts"> 
	export const prerender = false
	export async function load({page}){
        console.log(page)
        return {
            props:{lang: page.path}
        }
    }
</script>
<script lang="ts">
	import 'virtual:windi.css'
	import { scale } from "svelte/transition";	
	import {faWallet} from "@fortawesome/free-solid-svg-icons/faWallet.js" 
	import {faSun} from "@fortawesome/free-solid-svg-icons/faSun.js"
	import {faMoon} from "@fortawesome/free-solid-svg-icons/faMoon.js"
	import { faBars } from "@fortawesome/free-solid-svg-icons/faBars.js";
  	import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes.js";
	import Icon from "fa-svelte"
	import {darkMode} from "../../stores/dark"
	import bFloppa from "../../../static/floppa.jpg"
	import {page} from "$app/stores"
	export let lang

	let navbarMenuIsOpen = false
	let showDropDownMenu = false
	let home = false
	let menu

	let isDark : boolean;
	darkMode.subscribe(val => {
	isDark = val;
	})

	const changeDark = (e) => {
	darkMode.set(!isDark)
	}
	const LANGUAGES = [
		{
		code: "es",
		lang: "Español",
		},
		{
		code: "de",
		lang: "Deutsche",
		},
		{
		code: "en",
		lang: "English",
		},
		{
		code: "fr",
		lang: "Français",
		},
  	];
	const PAGES = [
		{
			route: `/${$page.params.lang}/farms`,
			title: "Farms",
		},
		{
			route: `/${$page.params.lang}/pools`,
			title: "Pools",
		},
		{
			route: `/${$page.params.lang}/trade`,
			title: "Trade",
		}
  	];

	
</script>

<svelte:window
  on:click={(e) => {
    if (showDropDownMenu && !menu.contains(e.target)) {
      showDropDownMenu = false;
    }
  }}
  on:keydown={(e) => {
    if (e.code === "Escape") {
      showDropDownMenu = false;
    }
  }}
/>
<nav class = "top-0 w-full text-black" class:dark = {$darkMode}>

	<div class="dark:bg-blue-gray-800 flex items-center justify-between h-16 px-5">
		<div
			bind:this={menu}
			class="sm:left-32 border hover:bg-gray-100 dark:border-none rounded-md  items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<div>
				<button
					on:click={()=>{
						showDropDownMenu = !showDropDownMenu
					}}
					class="dark:border dark:rounded-md dark:hover:bg-blue-gray-600 hover:bg-gray-100 focus:outline-none font-medium flex p-2 items-center"

				>
				<p class = "m-0 font-semibold text-gray-900 dark:text-white">Lang</p>
				</button>
				{#if showDropDownMenu}
					<div
						in:scale={{ duration: 100, start: 0.95 }}
						out:scale={{ duration: 75, start: 0.95 }}
						class="dark:bg-blue-gray-900 title z-10 sm:origin-top-right sm:left-0 absolute w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
					>
						{#each LANGUAGES as l}
						<button
							style="background-color: {home
							? (isDark? 'black' :'#F3F4F6')
							: ''}; {isDark ? 'color:white' : ''};"
							class:navbar_item_home={home}
							class="dark:hover:bg-blue-gray-900 dark:text-white border-none block w-full px-4 py-2 text-dark-200 hover:bg-gray-100"
						>
						<a href= {`/${l.code}`}> {l.lang} </a>
						</button>
						{/each}
					</div>
				{/if}				
			</div>
		</div>
		<div
			class = "sm:mr-3 flex-1 flex items-center justify-center sm:justify-start"
		>
			<!-- LOGO -->
			<div class="flex-shrink-0 flex items-center">
				<a class="flex space-y-2 space-x-2" href="/">
					<img class = "w-10 rounded-full" src={bFloppa} alt="floppa">
					<span class="w-24 text-lg dark:text-white font-semibold">
						Z Y B E R
					</span>
				</a>
			</div>
			<!-- day/nite toggle -->

			<div class="hidden sm:block sm:ml-auto">
				<div class="flex space-x-4 items-center">
				  <a href= "#">
					<span
						on:click={changeDark}
					  	class="dark:hover:bg-gray-800 hover:bg-gray-200 block px-3 py-3 rounded-md font-medium"
					>
		
					  {#if isDark}
						<Icon class = "text-white" icon = {faMoon}/>
						{:else}
						<Icon class = "text-black" icon = {faSun}/>
					  {/if}
					</span>
				  </a>
				  {#each PAGES as page}
					
					  <a href={page.route}>
						<span
						  class="dark:text-white dark:hover:bg-blue-gray-900 block hover:bg-gray-200 px-3 text-dark-200 py-3 rounded-md font-medium hover:no-underline no-underline"
						>
						  {page.title}
						</span>
					  </a>
					  
				  {/each}
				  <span class="bg-green-600 m-0 p-2 rounded-1 inline-flex">
					  <Icon icon = {faWallet}/>
				  </span>
				</div>
			  </div>

		</div>
		
    <!-- start hamburger button -->
    <div class="float-0 flex items-center sm:hidden">
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
			<Icon icon={faTimes} />
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
		: 'hidden'} dark:text-white sm:hidden dark:bg-blue-gray-800 bg-white"
	>
	  <div id="navbar-menu-mobile" class="text-center px-2 pt-2 pb-3 space-y-1">
		{#each PAGES as page}
			<a href={page.route}>
			  <span
				class="block dark:hover:bg-dark-600 px-3 py-3 rounded-md font-medium"
			  >
				{page.title}
			  </span>
			</a>
		{/each}
		<a on:click={changeDark} href="#">
		  <span
			class="block dark:hover:bg-dark-600 px-3 py-3 rounded-md font-medium"
		  >
			{#if isDark}
			  <Icon icon={faMoon} />
			{:else}
			  <Icon icon={faSun} />
			{/if}
		  </span>
		</a>
	  </div>
	</div>

</nav>


<style>
	.navbar_home {
	  color: white !important;
	  z-index: 10;
	  background-color: transparent !important;
	}
	.navbar_item_home:hover {
	  color: black;
	}
	.menu_mobile_dark {
	  background-color: black !important;
	}
  </style>
  