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
    
    import doge from "../../../../static/doge.png"
    import mxnc from "../../../../static/mxnc.png"
    import sushi from "../../../../static/sushi.png"
    import fish from "../../../../static/fish.svg"
    import dyfn from "../../../../static/dfyn.svg"
    import quick from "../../../../static/quiswa.png"
    import matic from "../../../../static/matic.png"
    import weth from "../../../../static/weth.png"
    import wbtc from "../../../../static/wbtc.png"
    import usdt from "../../../../static/usdt.png"
    import usdc from "../../../../static/usdc.png"
    export let lang

</script>

<section>
        <br />
        <h1 class="text-dark-200 dark:text-white text-4xl">P O O L S</h1>
        <div class="mt-5 space-y-4">
            <div id="mush" class = "flex justify-center p-5 text-center rounded-md">  
                <br />
                    <div class="mush-w p-2 text-2xl space-y-3 flex flex-col justify-around rounded-md backdrop-filter bg-transparent">
                        <p class="text-8xl font-bold text-white">
                            MUSH
                        </p>
                        <br />
                        <div class="px-5 bg-gray-50 bg-gradient-to-tl rounded-md">
                            <div class="flex justify-between">
                                <p class="font-black text-black">APY</p>
                                <p class="font-black text-black">999%</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="font-black text-black">APR</p>
                                <p class="font-black text-black">999%</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="font-black text-black">EARN</p>
                                <p class="font-black text-black">MUSH</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="font-black text-black">FEE</p>
                                <p class="font-black text-black">0%</p>
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
            <div class = "grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 text-center">
                <div class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={fish} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                    <p class="text-lg font-bold dark:text-white">
                        FISH
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
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={matic} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            Matic
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
    
                <div class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                    <div class="flex justify-center items-center">
                        <img class="max-h-40" src={weth} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            WETH
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

                <div class="flex flex-col justify-between shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                    <div class="flex justify-center items-center">
                    <img class="max-h-40" src={wbtc} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                    <p class="text-lg font-bold dark:text-white">
                        WBTC
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
                    <div class="flex justify-center items-center py-2">
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

                <div class="shadow-md dark:bg-dark-600 rounded-xl space-y-2 border dark:border-0">
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={usdt} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            USDT
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
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={usdc} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            USDC
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
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={doge} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            DOGE
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
                    <div class="flex justify-center items-center py-2">
                        <img class="max-h-40" src={mxnc} alt="tic-tac-toe" />
                    </div>
                    <div class="dark:bg-dark-300 bg-gray-100 p-2 space-y-3">
                        <p class="text-lg font-bold dark:text-white">
                            MXNC
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


            </div>
        </div>
</section>


<style>
    #mush{
        background-image: url("../../../../static/mushpan.jpg");
        width: 70%;
        height: 400px;
        margin: 0 auto;
        background-size: cover;
    }

    .mush-w{
        width:35%;
    }

    @media (max-width: 800px) {
        
        .mush-w{
            width:90%;
        }
    }

</style>