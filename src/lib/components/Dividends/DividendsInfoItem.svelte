<script lang="ts">
import { _ } from "svelte-i18n";
export let secondText = ""
export let thirdText = ""
export let name = " "
export let info:number
</script>

<div class="text-center">
    <p class="text-xs text-gray-500  dark:text-gray-300">{name}</p>
    {#if info}
    <p class="text-lg font-medium dark:text-white">{secondText}{info.toFixed(2)}{thirdText}</p>
    {:else if info == null || isNaN(info)}
    <p class="text-xs dark:text-white">{$_("actions.notAvaliable")}</p>
    {:else}
    <p class="text-lg font-medium dark:text-white">0 {thirdText}</p>
    {/if}
</div>