<nav
	class="{isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'bg-zinc-800 border-dark-200'} backdrop-blur top-0 w-full  {!$isHomescreen &&
		'shadow-sm'} py-2 "
	class:dark={$darkMode}
>
	<div class=" flex items-center justify-between h-16 px-3 ">
		<div
			bind:this={menu}
			class="sm:absolute sm:left-35 border  dark:border-none rounded-md  items-center flex sm:static sm:inset-auto sm:mr-4"
		>
			<LangPicker bind:showDropDownMenu />
		</div>
		<div class="sm:mr-3 flex-1 flex items-center justify-center sm:justify-start">
			<!-- LOGO -->
			<Logo/>
			<div class="ml-4 hidden lg:block ">
				<div
					class="flex items-center ml-9 space-x-2 dark:text-white {$isHomescreen && 'text-white'}"
				>
					{#each PAGES as page}
						<NavbarRoute pageRoute={page} />
					{/each}
				</div>
			</div>
			<!-- day/nite toggle -->

			<div
				class="hidden lg:flex space-x-5 ml-auto  dark:text-white items-center {$isHomescreen &&
					'text-white'}   "
			>
				<DarkModeButton />
				<MushPrice />
				<ConnectButton />
			</div>
		</div>

		<!-- start hamburger button -->
		<HamburgerButton bind:navbarMenuIsOpen />
	</div>

	<!-- start mobile navbar -->
	<div
		class:menu_mobile_dark={home}
		class="{navbarMenuIsOpen ? 'block' : 'hidden'} dark:text-white lg:hidden  {$darkMode &&
			!$isHomescreen &&
			'bg-neutral-600'}"
	>
		<div
			id="navbar-menu-mobile"
			class="text-center px-2 pt-2 pb-3 space-y-4 {$isHomescreen && 'text-white'}"
		>
			{#each PAGES as page}
				<div class="">
					<NavbarRoute pageRoute={page} />
				</div>
			{/each}
			<div class="flex justify-center">
				<DarkModeButton />
			</div>
			<ConnectButton />
		</div>
	</div>
</nav>
