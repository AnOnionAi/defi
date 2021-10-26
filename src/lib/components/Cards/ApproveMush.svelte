<script>
    

    export  let onApproval;


    
    
</script>


<div class="h-8/12 w-full flex justify-center "
>
    <div class="w-8/12 h-full flex flex-col items-center justify-around">
        <img src="/mushRound.png" alt="MushToken" class="w-40  mb-5">
        <div>
            <p class="text-xl text-center font-medium dark:text-white mb-1">Approval Required</p>
            <p class="text-center text-xs">You need to approve your MUSH expent first.</p>
        </div>
        <div>
            <button 
            on:click={onApproval}
            class="self-center font-semibold py-2 px-4 bg-black text-white hover:bg-green-500 rounded-xl">Approve</button>
        </div>
    </div>
</div>