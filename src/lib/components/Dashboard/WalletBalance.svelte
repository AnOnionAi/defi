<script lang="ts">
    import metaMaskIcon from '/static/metamask.svg'
    import {addTokenToMetamaskWallet} from '$lib/utils/metamaskCalls'
    
</script>



<div class="bg-white rounded-lg px-2 py-5 h-60 border border-gray-300 shadow-lg">
    <p class="font-bold text-3xl pl-3 text-gray-500 text-lg ">In your Wallet</p>
    <div class="flex h-44 justify-center items-center flex-col gap-3">
        <p class="font-bold text-4xl">7,355,231.20</p>
        <p class="font-bold text-xl text-green-600">~$735.12</p>
        <button 
        on:click={addTokenToMetamaskWallet}
        class="flex items-center font-medium border border-green-500 rounded-lg p-2  text-lg ">
            <p class="pr-1">Add MUSH</p>
            <img src="/metamask.svg" class="h-7" alt="Metamask Icon">
        </button>
    </div>
</div>