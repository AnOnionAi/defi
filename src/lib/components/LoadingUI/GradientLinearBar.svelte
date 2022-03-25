<div class="linear-progress animated-gradient" />

<style>
	.linear-progress {
		background: #ef6c00;
		height: 4px;
		position: relative;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		animation: start 0.3s ease-in;
	}
	.animated-gradient {
		animation: animateBg 2s linear infinite;
		background-image: linear-gradient(
			43deg,
			#ff4f69,
			#fe7688,
			#ff9eaa,
			#f8009a,
			#fc28b2,
			#ee5c00,
			#fea876
		);

		background-size: 700% 100%;
	}
	@keyframes animateBg {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
</style>
