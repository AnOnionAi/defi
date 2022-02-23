<nav
	class="{isHomescreen && 'z-10'} backdrop-filter {$darkMode &&
		!$isHomescreen &&
		'border-dark-200 bg-zinc-800'} top-0 w-full backdrop-blur  {!$isHomescreen &&
		'shadow-sm'} py-2 "
	class:dark={$darkMode}>
	<div class=" flex h-16 items-center justify-between px-3 ">
		<div
			bind:this={menu}
			class="sm:left-35 flex items-center  rounded-md border  dark:border-none sm:static sm:absolute sm:inset-auto sm:mr-4">
			<LangPicker bind:showDropDownMenu />
		</div>
		<div
			class="flex flex-1 items-center justify-center sm:mr-3 sm:justify-start">
			<!-- LOGO -->
			<Logo />
			<div class="ml-4 hidden lg:block ">
				<div
					class="ml-9 flex items-center space-x-2 dark:text-white {$isHomescreen &&
						'text-white'}">
					{#each PAGES as page}
						<NavbarRoute pageRoute={page} />
					{/each}
				</div>
			</div>
			<!-- day/nite toggle -->

			<div
				class="ml-auto hidden items-center space-x-5  dark:text-white lg:flex {$isHomescreen &&
					'text-white'}   ">
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
		class="{navbarMenuIsOpen
			? 'block'
			: 'hidden'} dark:text-white lg:hidden  {$darkMode &&
			!$isHomescreen &&
			'bg-neutral-600'}">
		<div
			id="navbar-menu-mobile"
			class="space-y-4 px-2 pt-2 pb-3 text-center {$isHomescreen &&
				'text-white'}">
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
