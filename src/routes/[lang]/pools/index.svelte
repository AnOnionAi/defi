<script context="module" lang="ts">
    export const prerender = false
    
    import { _ } from "svelte-i18n"
    import {setInit} from "$lib/i18n/init"
    
    export async function load({page}){
        const { lang } = page.params;
        setInit(lang)
        return {
            props:{lang}
        }
    }
    
</script>
<script lang="ts">
    export let lang
</script>

<section>
        <h1 class = "text-dark-200 dark:text-white">Z Y B E R / P O O L S</h1>
</section>