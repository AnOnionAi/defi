<script lang="ts">
    import {loading,fetchNativeTokenPrice,tokenPrice} from "$lib/stores/NativeTokenPrice"
    fetchNativeTokenPrice();
    const swapperURL =`https://app.sushi.com/swap?inputCurrency=${"0x2791bca1f2de4661ed88a30c99a7a9449aa84174"}&outputCurrency=${"0x627F699300A9D693FBB84F9Be0118D17A1387D4e"}`
</script>

<a href={swapperURL}
target="_blank"
 class="flex items-center group">
{#if $tokenPrice}
    <img src="/mushRound.png" alt="" class="w-6  transform transition duration-300 group-hover:scale-125">
    <p class="pl-2 font-medium text-gray-700 dark:text-gray-200 "> ${$tokenPrice.toPrecision(6)}</p>
 {:else}
    <div class="h-8 w-24 rounded-lg bg-gray-200 dark:bg-dark-400 animate-pulses"></div>
{/if}
</a>


<style>
    div{
        height: 38px;
    }

    img{
        margin-bottom: 2px;
    }
</style>