<script lang="ts">
	export let onApprove: () => void;
</script>

<div class="flex h-full items-center justify-center">
	<div
		class="customShadow flex w-[320px] flex-col items-center gap-5 rounded-xl bg-white px-10 py-12 dark:bg-neutral-800">
		<img src="/theme/fiji.svg" alt="USDC Token" class="imgToken " />
		<div class="text-center">
			<h1 class="mb-2 text-xl font-medium text-gray-800 dark:text-gray-100">
				Token Approval
			</h1>
			<p class="text-sm text-gray-600 dark:text-gray-200">
				You must approve your FAM spend.
			</p>
		</div>

		<button
			on:click={onApprove}
			class="rounded-xl bg-primary-400 px-4 py-2 text-center text-sm font-bold text-white transition duration-300 hover:bg-primary-300 dark:bg-analogPurple-300 dark:hover:bg-analogPurple-400"
			>Approve Token</button>
	</div>
</div>

<style>
	.imgToken {
		width: 50%;
		height: 50%;
	}

	.customShadow {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
</style>
