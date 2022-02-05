<script lang="ts">
    export let title;
    export let description;
</script>

<div class="bg-white dark:bg-dark-900 rounded-2xl p-6 h-40 col-span-3 dark:text-white flex flex-col shadow-lg dark:shadow-none select-none">
    <div>
        <p class="text-dark-500 dark:text-gray-100 text-3xl md:text-2xl  lg:text-2xl">{title}</p>
    </div>
    <div class="w-full flex justify-center items-center h-32">
        <p class="text-dark-900 dark:text-white font-medium text-4xl md:text-2xl  lg:text-2xl">{description}</p>
    </div>
</div>




<style>

</style>