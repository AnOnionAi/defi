<script context="module" lang="ts">
    export const prerender = false
    
    import { _ } from "svelte-i18n"
    import {setInit} from "$lib/i18n/init"
    import { darkMode } from "../../../stores/dark";
    import sushi from "../../../../static/sushi.png"
    import dyfn from "../../../../static/dfyn.svg"
    import quick from "../../../../static/quiswa.png"
    export async function load({page}){
        const { lang } = page.params;
        
        return {
            props:{lang}
        }
    }
    
</script>
<script lang="ts">
    export let lang
</script>

<section>
        <br />
        <h1 class = "text-dark-200 dark:text-white text-4xl">F A R M S</h1>
        <section class:dark={$darkMode} class="mt-3">
            <section class="mt-5 space-y-4">
              
                <div class="w-full flex">
                    <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 text-center">

                        <!--Start Farms-->
                        <div class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                            <div class="flex justify-center items-center">
                            <img class="max-h-40" src={quick} alt="tic-tac-toe" />
                            </div>
                            <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                            <p class="text-lg font-bold dark:text-white">
                                QuickSwap
                            </p>
                            <div class = "px-5">
                                <div class="flex justify-between">
                                    <p class = "font-semibold">APY:::</p>
                                    <p>999%</p>
                                </div>
                                <div class="flex justify-between">
                                    <p class = "font-semibold">APR:</p>
                                    <p>999%</p>
                                </div>
                                <div class="flex justify-between">
                                    <p class = "font-semibold">EARN:</p>
                                    <p>MUSH</p>
                                </div>
                                <div class="flex justify-between">
                                    <p>DEPOSIT FEE</p>
                                    <p>0%</p>
                                </div>
                            </div>
                            <a
                                href="#"
                                class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                            >
                                Unlock
                            </a>
                            </div>
                        </div>

                        <div class="shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                            <div class="flex justify-center items-center">
                                <img class="max-h-40" src={sushi} alt="tic-tac-toe" />
                            </div>
                            <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                                <p class="text-lg font-bold dark:text-white">
                                    SushiSwap
                                </p>
                                <div class = "px-5">
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">APY:::</p>
                                        <p>999%</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">APR:</p>
                                        <p>999%</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">EARN:</p>
                                        <p>MUSH</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p>DEPOSIT FEE</p>
                                        <p>0%</p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                                >
                                    Unlock
                                </a>
                            </div>
                        </div>

                        <div class="shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                            <div class="flex justify-center items-center">
                                <img class="max-h-40" src={dyfn} alt="tic-tac-toe" />
                            </div>
                            <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                                <p class="text-lg font-bold dark:text-white">
                                    Dyfn
                                </p>
                                <div class = "px-5">
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">APY:::</p>
                                        <p>999%</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">APR:</p>
                                        <p>999%</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p class = "font-semibold">EARN:</p>
                                        <p>MUSH</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <p>DEPOSIT FEE</p>
                                        <p>0%</p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                                >
                                    Unlock
                                </a>
                            </div>
                        </div>
                        <!--End Farms-->
                    </div>
                </div>
            </section>
          </section>
          
</section>


<style>
    .dark .active {
      --tw-bg-opacity: 1;
      background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: rgba(0, 0, 0, var(--tw-text-opacity));
    }
    .active {
      --tw-bg-opacity: 1;
      background-color: rgba(217, 119, 6, var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
    }
</style>