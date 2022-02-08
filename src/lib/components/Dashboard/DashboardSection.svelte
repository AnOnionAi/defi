<div class="grid lg:grid-cols-10 w-full gap-x-4 xl:gap-x-6 gap-y-4 px-4 ">
	<div
		class="col-start-1 col-end-11 md:col-start-2 md:col-end-10 lg:col-start-3 lg:col-end-9 xl:col-start-1 xl:col-end-5"
	>
		<slot name="wallet" />
	</div>

	<div class="col-start-1 col-end-6 xl:col-start-5 xl:col-end-8">
		<slot name="apy" />
	</div>

	<div class="col-start-6 col-end-11 xl:col-start-8 xl:col-end-11">
		<slot name="tvl" />
	</div>
</div>
