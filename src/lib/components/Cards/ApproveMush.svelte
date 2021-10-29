<script>
    

    export  let onApproval;


    
    
</script>


<div class="h-12/12 w-full flex items-center justify-center"
>
    <div class="w-9/12 h-8/12 flex flex-col  justify-around items-center">
        <img src="/mushRound.png" alt="MushToken" class="w-36  ">
        <div>
            <p class="text-xl text-center font-medium dark:text-white mb-2">Approval Required</p>
            <p class="text-center dark:text-white text-xs">You need to approve your MUSH expent first.</p>
        </div>
        <div>
            <button 
            on:click={onApproval}
            class="self-center font-semibold py-2 px-4 bg-black text-white hover:bg-green-500 dark:border dark:border-green-500 dark:rounded-full  rounded-xl">Approve</button>
        </div>
    </div>
</div>