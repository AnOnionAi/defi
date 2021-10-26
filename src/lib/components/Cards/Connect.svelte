<script>
  import { metaMaskCon } from "$lib/utils/metamaskCalls";
</script>

<div class="h-12/12 w-full flex justify-center items-center cursor-pointer"
    on:click={metaMaskCon}
>
    <div class="w-6/12 h-12/12 flex flex-col justify-center">
        <img src="/metamask.svg" alt="Metamask Fox" class="w-40 self-center mb-5">
        <p 
        
        class="text-xl text-center bg-black text-white font-medium rounded-full p-1 ">Connect your Wallet</p>
    </div>
</div>