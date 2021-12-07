<script lang="ts">
import Icon from 'svelte-fa';
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {darkMode} from "$lib/stores/dark"


const changeDark = () => {
    darkMode.set(!$darkMode);
}

</script>


    <span
        on:click={changeDark}
        class=" {$darkMode &&
            ''} block px-3 py-3 rounded-md font-medium {!$darkMode &&
            'spinner'} cursor-pointer "
    >
        {#if $darkMode}
            <Icon class="text-white" icon={faMoon} />
        {:else}
            <Icon class="text-black" icon={faSun} />
        {/if}
    </span>



<style>
    .spinner {
		animation: spin 4s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>