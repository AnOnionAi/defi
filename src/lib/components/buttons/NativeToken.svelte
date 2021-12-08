<script lang="ts">
    import {darkMode} from "$lib/stores/dark"
    import {loading,error,fetchNativeTokenPrice,tokenPrice} from "$lib/stores/NativeTokenPrice"
    import { onMount } from "svelte";

    fetchNativeTokenPrice();
    
    const swapperURL =`https://app.sushi.com/swap?inputCurrency=${"0x2791bca1f2de4661ed88a30c99a7a9449aa84174"}&outputCurrency=${"0x627F699300A9D693FBB84F9Be0118D17A1387D4e"}`
</script>

<a href={swapperURL} target="_blank" class="dark:text-white mr-3 py-1 px-2 border border-green-500 rounded-md flex items-center bg-white dark:bg-dark-800 font-light">
    <img src="/mushCoin.svg" alt="Go buy MUSH" class="w-5 mr-1">
    {#if $loading}
        <p class="w-16 h-5 bg-gray-300 dark:bg-dark-200 rounded-md animate-pulse"></p>
    {:else}
        ${$tokenPrice.toPrecision(6)}
    {/if}
    

</a>