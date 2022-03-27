<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	export let checked;
	export let handleClick;
</script>

<label class="switch">
	<input {checked} on:click={handleClick} type="checkbox" />
	<span class="slider {$darkMode ? 'sliderDark' : ''} round" />
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 36px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.sliderDark {
		background-color: rgba(64, 64, 64, 1);
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 24px;
		width: 24px;
		left: 4px;
		bottom: 6px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #fe7688;
	}

	input:checked + .sliderDark {
		background-color: #fc28b2;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #fe7688;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
