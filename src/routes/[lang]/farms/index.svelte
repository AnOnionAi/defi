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
    import {accounts} from "../../../stores/MetaMaskAccount";
    import { BigNumber, ethers } from "ethers";
    import {getMasterChefContract, getZyberTokenContract,getTESTLPContract} from "../../../utils/contracts";
    import {addresses} from "../../../config/constants/addresses";
    import { farms } from "../../../config/constants/farms";

    let buttonName;
    let currentAccount;
   
     accounts.subscribe(value => {
         currentAccount = value
        if(value == undefined){
            buttonName="Unlock";
        }else{
            buttonName="Execute";
        }
    });

    const metaMaskCon = async () => {
		try{
			const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			accounts.set(user_accounts)
		}catch{
			console.log("failed")
		}
	};
 
    const approve = async () => {
        const LPTokenContract = getZyberTokenContract();
        await LPTokenContract.approve(addresses.ZyberToken.TEST,ethers.utils.parseUnits("10",18))
    }

    const getAllowance = async (tokenContract,owner,spender,) => {
        const contractAllowance = await tokenContract.allowance(owner,spender);
        return contractAllowance;
    }

    const checkIfApproved =  (allowance) => {
        return ethers.constants.Zero == allowance;
    }

    const stake = async(farmID,wantAmount) => {
        const MasterChef = getMasterChefContract();
        await MasterChef.deposit(farmID,ethers.utils.parseUnits(wantAmount,18),ethers.constants.AddressZero);
    }

    const unStake = async(farmID,wantAmount) => {
        const MasterChef = getMasterChefContract();
        await MasterChef.withdraw(farmID,ethers.utils.parseUnits(wantAmount,18))
    }

    const withdrawFarmedMush = async(farmID) => {
        const MasterChef = getMasterChefContract();
        await MasterChef.deposit(farmID,ethers.utils.parseUnits("0",18),ethers.constants.AddressZero);
    }

    const getPendingMush = async(farmID) => {
        let pendingMushBN,pendingMush;
        const MasterChef = getMasterChefContract();
        pendingMushBN =  await MasterChef.pendingmush(farmID,currentAccount[0])
        pendingMush = ethers.utils.formatUnits(pendingMushBN,18);
        return pendingMush;
    }

    const getUserStakedTokens = async(farmPID) => {
        let userInfo;
        const MasterChef = getMasterChefContract();
        let {amount} = await MasterChef.userInfo(farmPID,currentAccount[0]);
        amount = ethers.utils.formatUnits(amount,18);
        return amount;
    }

    const getPoolInfo = async(farmPID) => {
        const MasterChef = getMasterChefContract();
        const poolInfo = await MasterChef.poolInfo(farmPID);
        return poolInfo;
    }

    const buttonOnClickHandler = async (farmName) => {
        console.log(currentAccount)
        if (buttonName === "Unlock"){
            metaMaskCon();
        }
        else if(buttonName === "Execute"){
            // approve()
            // .then(()=> stake("0","5"))
            // .catch(()=>console.log("Transaccion no Autorizada"))
            // console.log(await getPendingMush(farms["ZYBER FARM"].pid));
            // console.log(await getUserStakedTokens(farms["ZYBER FARM"].pid));
            withdrawFarmedMush(farms["ZYBER FARM"].pid)
            .then(()=> console.log("Mush out!"))
            .catch(()=> console.log("Error"))
        }
    }

    const quickSwapFarm = async () => {
        if (buttonName === "Unlock"){
            metaMaskCon();
        }
        else if (buttonName === "Execute"){
        const LPToken = getTESTLPContract();
        const alowance = await getAllowance(LPToken,currentAccount[0],addresses.MasterChef.TEST);
        console.log(alowance)
        console.log(ethers.constants.Zero)
        console.log(checkIfApproved(alowance));
        }
        }


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
                                on:click={quickSwapFarm}
                                href="#"
                                class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                            >
                            {buttonName}
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
                                    on:click={buttonOnClickHandler}
                                    href="#"
                                    class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                                >
                                    {buttonName}
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
                                    on:click={buttonOnClickHandler}
                                    href="#"
                                    class="block bg-green-400 text-white font-bold p-1 rounded-md w-full hover:bg-green-600"
                                >
                                    {buttonName}
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