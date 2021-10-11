<script lang='ts'>
    import WalletBalance from "$lib/components/Dashboard/WalletBalance.svelte";
    import farmerIcon from "/static/farmerIcon.png"
    import hoe from "/static/hoe.png"
    import poolIcon from '/static/poolIcon.png'
    import vaultIcon from '/static/vaultIcon.png'
    import usdc from '/static/vaultTokensIcons/usdc.svg'
    import usdt from '/static/vaultTokensIcons/usdt.svg'

    import btc from '/static/vaultTokensIcons/wbtc.svg'
    import dai from '/static/vaultTokensIcons/dai.svg'
</script>


<div class="">
    <h1>Dashboard</h1>
    <div class="w-11/12 max-w-screen-2xl bg-gray-500 mx-auto">
        <div class="flex flex-wrap flex-row p-4">
            <div class="bg-green-600  w-full max-w-screen-sm p-1 mb-5 mx-auto lg:mx-4">
                <WalletBalance/>
            </div>

            <div class="bg-green-600  w-full max-w-screen-sm p-1 mb-5 flex flex-col gap-3 lg:flex-row ">

                <!-- FarmCard -->
                <div>
                    <div class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60">
                       <div class="pl-4 flex flex items-center">
                           <img src={farmerIcon} class="h-12 w-12" alt="">
                           <p class="ml-2 text-gray-700 font-bold text-xl">Farms</p>
                       </div>
                       <div class="flex flex-col items-center pb-3 gap-2">
                           <p class="text-3xl tracking-wide font-bold">$29,574.12</p>
                           <p class="text-gray-700 font-semibold text-sm">Locked In Mush Farms</p>
                           <button class="border border-green-500 rounded-lg py-2 px-3  flex items-center">
                               <p class="font-semibold pr-1">
                                   Start Farming
                               </p>
                               <img src={hoe} alt="farming hoe">
                           </button>
                       </div>
                    </div>
                </div>
                <!-- FarmCard -->
                <div>
                    <div class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60">
                       <div class="pl-4 flex flex items-center">
                           <img src={poolIcon} class="h-12 w-12" alt="">
                           <p class="ml-2 text-gray-700 font-bold text-xl">Pools</p>
                       </div>
                       <div class="flex flex-col items-center pb-3 gap-2">
                           <p class="text-3xl tracking-wide font-bold">$40,112.99</p>
                           <p class="text-gray-700 font-semibold text-sm">Locked In Zyber Pools</p>
                           <button class="border border-green-500 rounded-lg py-2 px-5  flex items-center">
                               <p class="font-semibold pr-1">
                                   Add Liquidity
                               </p>
                               <div class="flex relative">
                                   <img src={btc} alt="mushToken" class="h-5 w-5">
                                   <img src={dai} alt='daiToken' class="h-5 w-5 absolute left-3">
                               </div>
                           </button>
                       </div>
                    </div>
                </div>
               <!--Pool Card-->
               <div>
                <div class="flex flex-col justify-between bg-white bg-white rounded-lg px-2 py-5 h-60">
                   <div class="pl-4 flex flex items-center">
                       <img src={vaultIcon} class="h-12 w-12" alt="">
                       <p class="ml-2 text-gray-700 font-bold text-xl">Vaults</p>
                   </div>
                   <div class="flex flex-col items-center pb-3 gap-2">
                       <p class="text-3xl tracking-wide font-bold">$20,907.17</p>
                       <p class="text-gray-700 font-semibold text-sm">Locked In Zyber Vaults</p>
                       <button class="border border-green-500 rounded-lg py-2 px-5  flex items-center">
                           <p class="font-semibold pr-1">
                               Go Deposit
                           </p>
                           <div class="flex relative">
                               <img src={usdc} alt="mushToken" class="h-5 w-5">
                               <img src={usdt} alt='daiToken' class="h-5 w-5 absolute left-3">
                           </div>
                       </button>
                   </div>
                </div>
            </div>
            </div>






            <div class="bg-green-600 h-36 w-full max-w-screen-sm p-1 mb-5 ">
                <div>

                </div>
            </div>
        </div>

    </div>
</div>