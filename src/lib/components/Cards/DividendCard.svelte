<script lang="ts">
    import {getContractAddress} from "$lib/utils/addressHelpers"
    import { getTokenBalance } from "$lib/utils/erc20";
    import { stakedWantTokens } from "$lib/utils/vaultChef";
    import {Token} from "$lib/ts/types"
    import { onMount } from "svelte";
    import {accounts} from "$lib/stores/MetaMaskAccount"
    import type { BigNumber } from "ethers";
    import { parseBigNumberToDecimal, parseBigNumberToString } from "$lib/utils/balanceParsers";

    let userBalance: BigNumber
    let userStakedTokens: BigNumber
    onMount(()=>{
        if($accounts){
            getTokenBalance(getContractAddress(Token.MUSHTOKEN),$accounts[0]).then(balance => (userBalance = balance))
            stakedWantTokens(2,$accounts[0]).then(stakedTokens => (userStakedTokens = stakedTokens)).then(()=> console.log(userStakedTokens,"AQUI"))
            
        }
    });
</script>



<div class="h-full w-full ">
    <div class="flex flex-col justify-around w-full h-4/12">
        <div class="flex w-23/24 mx-auto justify-between items-center">
            <div class="flex items-center">
                <img src="/mushRound.png" alt="" class="w-10" />
                <h2 class="text-2xl font-bold pl-2  dark:text-white">MUSH</h2>
            </div>
            <div>
                <p
                    class="rounded-full py-1 px-4  border-2 border-green-500 text-green-600 inline text-xs font-semibold"
                >
                    Earn MUSH 🍄
                </p>
            </div>
        </div>

        <div class="w-full h-26 flex flex-col justify-between ">
            <div class="flex w-full h-12 text-center">
                <div class="w-6/12">
                    <p class="text-xs text-gray-600 font-semibold dark:text-gray-300">APR</p>
                    <p class="font-medium dark:text-white">65.82%</p>
                </div>

                <div class="w-6/12">
                    <p class="text-xs text-gray-600 font-semibold dark:text-gray-300">TVL</p>
                    <p class="font-medium dark:text-white">$1000</p>
                </div>
            </div>

            <div class="flex w-full h-12 text-center">
                <div class="w-6/12">
                    <p class="text-xs text-gray-600 font-semibold dark:text-gray-300 ">Wallet</p>
                    <p class="font-medium dark:text-white">
                        {#if userBalance}
                            {parseBigNumberToString(userBalance)}
                            {:else}
                            -- MUSH
                        {/if}

                    </p>
                </div>

                <div class="w-6/12">
                    <p class="text-xs text-gray-600 font-semibold dark:text-gray-300">Deposit</p>
                    <p class="font-medium dark:text-white">
                        {#if userStakedTokens}
                        { parseBigNumberToString(userStakedTokens) }
                        {:else}
                        --
                        {/if}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full h-8/12 flex flex-col justify-between">
        <div class="flex flex-col text-sm">
            <p class="text-gray-600 font-semibold mb-1 ml-1 dark:text-gray-300">
                Your Wallet:
                <span class="text-black dark:text-white">
                    {#if userBalance}
                        {parseBigNumberToString(userBalance)} MUSH
                        {:else}
                        -- MUSH
                    {/if}
                </span>
            </p>

            <div class="bg-gray-200 dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-around">
                <input
                    type="text"
                    class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12"
                />
                <button
                    class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5"
                >
                    <p>Deposit</p>
                    <!-- <div class="pl-3">
                    <Chasing size={18} unit="px" color="#FFF"></Chasing>
                </div> -->
                </button>
            </div>
            
        </div>

        <div class="flex flex-col text-sm">
            <p class="text-gray-600 dark:text-gray-300 font-semibold ml-1 mb-1">
                Deposited:
                <span class="text-black dark:text-white">
                    {#if userStakedTokens}
                        { parseBigNumberToString(userStakedTokens) } MUSH
                        {:else}
                        --
                        {/if}
                </span>
            </p>

            <div class="bg-gray-200  dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-around">
                <input
                    type="text"
                    class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12"
                />
                <button
                    class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5"
                >
                    <p>Withdraw</p>
                    <!-- <div class="pl-3">
                    <Chasing size={18} unit="px" color="#FFF"></Chasing>
                </div> -->
                </button>
            </div>
            
        </div>

        <div class="flex flex-col text-sm">
            <p class="text-gray-600 dark:text-gray-300 font-semibold mb-1 ml-1">
                MUSH Earned:
                <span class="text-black" />
            </p>

            <div class="bg-gray-200 dark:bg-gray-800 rounded-xl h-17 py-2 flex justify-around">
                <p class="bg-transparent h-full text-xl font-bold text-gray-700 dark:text-gray-200  w-7/12 flex items-center">0.00000</p>
                <button
                    class="hover:bg-green-500 bg-black h-full rounded-xl text-white font-semibold text-lg flex items-center justify-center  px-3 md:px-5"
                >
                    <p>Harvest</p>
                    <!-- <div class="pl-3">
                    <Chasing size={18} unit="px" color="#FFF"></Chasing>
                </div> -->
                </button>
            </div>
        </div>
    </div>
</div>