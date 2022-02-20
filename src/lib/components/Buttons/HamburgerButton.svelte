<script lang="ts">
	export let navbarMenuIsOpen = false;
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import Icon from 'svelte-fa';
</script>

<div class="float-0 flex items-center lg:hidden">
	<button
		aria-label="Menu"
		id="btn_hamburger_navbar"
		class="dark:text-light-600 inline-flex items-center justify-center rounded-md p-2 text-gray-500
  focus:outline-none"
		on:click={() => {
			navbarMenuIsOpen = !navbarMenuIsOpen;
		}}>
		{#if !navbarMenuIsOpen}
			<Icon icon={faBars} />
		{:else}
			close
		{/if}
	</button>
	<!-- end hamburger button -->
</div>
