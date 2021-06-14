<script context="module" lang="ts"> export const router = true </script>
<script lang="ts">

	import { scale } from "svelte/transition";	
	import {darkMode} from "../../stores/dark"
	
	let showDropDownMenu = false
	let home = false
	let menu
	let isDark : boolean;
	darkMode.subscribe(val => {
	console.log(val)
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
			route: "/farms",
			title: "link 1",
		},
		{
			route: "/pools",
			title: "link 2",
		},
		{
			route: "/vaults",
			title: "link 3",
		},
		{
			route: "/login",
			title: "Login",
		},
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
<nav class = "absolute top-0 w-full text-black">

	<div class="flex items-center justify-between h-16 px-5">
		<div
			bind:this={menu}
			class="sm:absolute sm:left-32 border hover:bg-gray-100 rounded-md items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<div>
				<button
					on:click={()=>{
						showDropDownMenu = !showDropDownMenu
					}}
					class="border-none hover:bg-gray-100 focus:outline-none font-medium flex items-center rounded-md"

				>
				<p class = "m-0">Lang</p>
				</button>
				{#if showDropDownMenu}
					<div
						in:scale={{ duration: 100, start: 0.95 }}
						out:scale={{ duration: 75, start: 0.95 }}
						style = {isDark && "background-color:#1F2937;"}
						class="title z-10 sm:origin-top-right sm:left-0 absolute w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
					>
						{#each LANGUAGES as l}
						<button
							style="background-color: {home
							? (isDark? 'black' :'#F3F4F6')
							: ''}; {isDark ? 'color:white' : ''};"
							class:navbar_item_home={home}
							class="border-none block w-full px-4 py-2 text-gray-700 {isDark ? 'hover:bg-black' :'hover:bg-gray-100'}"
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
				<a href="/">
				<div class="w-24">
					LOGO
				</div>
				</a>
			</div>
			<!-- day/nite toggle -->

			<div class="hidden sm:block sm:ml-auto">
				<div class="flex space-x-4 items-center">
				  <a style = {isDark && "color:white;"} on:click = {changeDark} class:navbar_item_home={home} href= "#">
					<span
					  class="block {isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} px-3 py-3 rounded-md font-medium"
					  >
		
					  {#if isDark}
						LUNA
					  {:else}
						SOL
					  {/if}
					</span>
				  </a>
				  {#each PAGES as page}
					
					  <a style = {isDark && "color:white;"} class:navbar_item_home={home} href="/">
						<span
						  class="block hover:bg-gray-200 px-3 py-3 rounded-md font-medium hover:no-underline no-underline"
						>
						  {page.title}
						</span>
					  </a>
					  
				  {/each}
				</div>
			  </div>

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
  