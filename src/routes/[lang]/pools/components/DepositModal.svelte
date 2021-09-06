<script lang="ts">

    import type { BigNumber } from '@ethersproject/bignumber';
import { getContext } from 'svelte';
    import {parseBigNumberToDecimal, parseBigNumberToInt} from '../../../../utils/balanceParsers'
      export let tokenName;
      export let userBalance:BigNumber;
      export let onCancel = (wantAmount?: any) => {};
      export let onOkay = (wantAmount?: any) => {};

    const { close } = getContext('simple-modal');
      
      let wantAmount;
      let onChange = (wantAmount?: any) => {};
      
      function _onCancel() {
          onCancel();
          close();
      }
      
      function _onOkay() {
          onOkay(wantAmount);
          close();
      }
      
     
$: wantAmount: {
    console.log("cambio ",wantAmount)
}

  </script>
  

  <style>
      input{
          font-size: 18px;
          font-weight: bold;
          outline: none;
      }


      input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    input[type=number] {
  -moz-appearance: textfield;
}
 



  </style>
  
  

<div class="flex flex-col px-9 py-6">
    
    <div class=" w-full shadow-2xl  shadow-gray-1000 border-2 rounded-3xl border-gray-200 py-3">
        <div class="flex justify-between py-1 px-10">
            <p class="text-gray-400 font-semibold tracking-wide">Input</p>
            <div class="flex">
                <div 
                on:click={()=>wantAmount = parseBigNumberToDecimal(userBalance)}
                class="text-green-400 rounded-3xl cursor-pointer border border-green-400 text-xs font-semibold tracking-wide mr-1 p-1 hover:bg-green-400 hover:text-light-100">MAX</div>
                <p class="text-gray-400  font-semibold tracking-wide ">Balance: {parseBigNumberToDecimal(userBalance)}</p>
            </div>
        </div>
        <div class="flex justify-between py-3 px-10">
            <div>
                <input 
                bind:value={wantAmount}
                type="number"
                id="inputDeposit"
                min="0"
                placeholder="0.0" >
            </div>
            <div>
                <div>

                </div>
                <p class="text-gray-400  font-semibold tracking-wide " >{tokenName}</p>
            </div>
        </div>
    </div>
    <p class="text-gray-400  font-semibold tracking-wide mt-5 px-1">Other options:</p>
    <div class="flex justify-between px-4 pt-2">
        <button
        on:click={()=>wantAmount = parseBigNumberToDecimal(userBalance.div(10))} 
        class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500">
            10%
        </button>
        <button 
        on:click={()=>wantAmount = parseBigNumberToDecimal(userBalance.div(4))}
        class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500">
            25%
        </button>
        <button
        on:click={()=>wantAmount = parseBigNumberToDecimal(userBalance.div(2))} 
        class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500">
            50%
        </button>
        <button 
        on:click={()=>wantAmount = parseBigNumberToDecimal(userBalance.div(4).mul(3))}
        class="bg-green-400 text-light-100 rounded-xl cursor-pointer border border-green-400  font-semibold tracking-wide  px-4 py-1 hover:bg-green-500">
            75%
        </button>
    </div>

    <div class="flex justify-center mt-9">
        <button 
        on:click={_onOkay}
        class="w-full p-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-300 hover:to-green-500 text-light-100 font-bold tracking-wide ">
            DEPOSIT YOUR {tokenName}
        </button>
    </div>
    

   
        
</div>
