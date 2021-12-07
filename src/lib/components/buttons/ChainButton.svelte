<script lang="ts">
 import {darkMode} from "$lib/stores/dark"
 import {accounts} from "$lib/stores/MetaMaskAccount"
 import {chainID} from "$lib/stores/MetaMaskAccount"

 
</script>


{#if $accounts}
    {#if $chainID == "0x89"}
    <button class="mr-3  p-1 border border-green-400 rounded-md flex items-center bg-white dark:bg-dark-800">
        <img src="/polygon.jpeg" alt="" class="icon">
        <p class="font-light dark:text-white">Polygon</p>
    </button>

    {:else}
    <button class="mr-5 py-1 px-2   rounded-md flex items-center bg-rose-500">
        <img src="/chain.svg" alt="" class="w-4 mr-1">
        <p class="font-light text-white">Wrong Chain</p>
    </button>   
    {/if}



{/if}




<style>
    .icon { 
        width: 18px;
        
        border-radius: 20%;
        margin-right: 4px;
    }
</style>