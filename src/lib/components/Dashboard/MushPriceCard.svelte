<script lang="ts">
    export let title:string;
    export let display: string | number;
</script>

<div class="bg-white p-3 dark:bg-dark-900 h-28 md:h-28 lg:h-24 rounded-xl w-full w-7/12 min-w-sm md:min-w-20  lg:w-11/12 xl:w-11/12 flex flex-col justify-between dark:text-white shadow-md dark:shadow-none">
    <h3 class="font-semibold text-2xl md:text-xl lg:text-2xl">{title}</h3>
    <p class="text-center text-4xl md:text-2xl lg:text-3xl">{display}</p>  
    <p></p>
</div>