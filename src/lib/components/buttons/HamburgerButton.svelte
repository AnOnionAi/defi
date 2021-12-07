<script lang="ts">
        export let navbarMenuIsOpen = false
    	import {  faBars } from '@fortawesome/free-solid-svg-icons';
	    import Icon from 'svelte-fa';
</script>

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