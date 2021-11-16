<div class="linear-progress">
	<div class="bar bar1" />
	<div class="bar bar2" />
</div>

<style>
	.linear-progress {
		background: #4ade80;
		height: 4px;
		position: relative;
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		animation: start 0.3s ease-in;
	}

	.bar {
		position: absolute;
		background: #bbf7d0;
		transition: transform 0.2s linear;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
	}

	.bar1 {
		animation: progressLinearMovement 2.5s infinite;
		animation-delay: 0;
	}

	.bar2 {
		left: -100%;
		animation: progressLinearMovement 2.5s infinite;
		animation-delay: 0.7s;
	}

	@keyframes start {
		from {
			max-height: 0;
			opacity: 0;
		}
		to {
			max-height: 20px;
			opacity: 1;
		}
	}

	@keyframes progressLinearMovement {
		0% {
			left: -100%;
		}
		50% {
			left: 100%;
		}
		100% {
			left: 100%;
		}
	}
</style>
