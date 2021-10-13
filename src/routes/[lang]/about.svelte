<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;400;900&display=swap"
		rel="stylesheet"
	/>
	<script src="https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"></script>
</svelte:head>

<section class="green">
	<h1>{$_('headers.automated-crypto.text')}</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias esse eius quis eaque, vero ullam
		iste ipsam. Obcaecati error odit debitis distinctio quas eos natus recusandae, non mollitia.
		Cupiditate, error?
	</p>
	<div class="curve" />
	<img src="/crypto-market.png" alt="crypto-market" />
</section>

<section class="farms">
	<h1>{$_('headers.farms.text')}</h1>
	<div class="columns">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias fugit eius aspernatur
			exercitationem tenetur soluta, nam similique. Eveniet quod facilis, animi aliquam iste
			perferendis asperiores distinctio corrupti voluptatum, itaque amet.
		</p>
		<img src="/farms.png" alt="farms" />
	</div>
</section>

<section class="pools bubble">
	<h1>{$_('headers.pools.text')}</h1>
	<div class="columns">
		<img src="/pools.png" alt="pools" />
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta recusandae totam
			asperiores nostrum, quo, id excepturi sint aperiam voluptatum quod quia facere aut! Reiciendis
			explicabo impedit quod odio excepturi.
		</p>
	</div>
</section>

<section class="orange">
	<h1>{$_('headers.vaults.text')}</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt incidunt blanditiis,
		pariatur quibusdam voluptatibus vel quam quia amet minus dolorem sapiente voluptas facere
		veritatis voluptatum id placeat repellat nisi.
	</p>
	<img src="/vaults.png" alt="vaults" />
</section>

<div class="spacer layer1 flip" />

<section class="crypto-responsibility blue">
	<h1>{$_('headers.crypto-responsibility.text')}</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nesciunt incidunt blanditiis,
		pariatur quibusdam voluptatibus vel quam quia amet minus dolorem sapiente voluptas facere
		veritatis voluptatum id placeat repellat nisi.
	</p>
	<img src="/crypto-responsibility.png" alt="crypto-responsibility" />
</section>

<style>
	h1 {
		font-size: 4rem;
	}
	p {
		font-size: 1.5rem;
		padding: 0 200px;
		text-align: justify;
	}
	:global(body) {
		overflow-x: hidden;
	}
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 500px;
		padding-top: 150px;
		padding-bottom: 100px;
	}
	.farms .columns {
		display: -ms-flex;
		display: -webkit-flex;
		display: flex;
		width: 80%;
		justify-content: center;
	}
	.farms .columns p {
		margin: 5px;
		padding: 0;
		padding-top: 10px;
		width: 60%;
	}
	.farms .columns img {
		margin-left: 30px;
	}
	.pools .columns {
		display: -ms-flex;
		display: -webkit-flex;
		display: flex;
		width: 80%;
		justify-content: center;
	}
	.pools .columns p {
		margin: 5px;
		padding: 0;
		padding-top: 10px;
		width: 60%;
	}
	.pools .columns img {
		margin-right: 30px;
	}
	.crypto-responsibility {
		transform: translateY(-2px);
	}
	.green {
		background: #4ade80;
	}
	.orange {
		background: #fb923c;
	}
	.blue {
		background: #60a5fa;
	}
	/* Curved bg with plain CSS */
	.curve {
		position: absolute;
		height: 150px;
		width: 100%;
		bottom: 0;
		text-align: center;
	}
	.curve::before {
		content: '';
		display: block;
		position: absolute;
		border-radius: 100% 50%;
		width: 55%;
		height: 100%;
		transform: translate(85%, 60%);
		background-color: white;
	}
	.curve::after {
		content: '';
		display: block;
		position: absolute;
		border-radius: 100% 50%;
		width: 55%;
		height: 100%;
		background-color: #4ade80;
		transform: translate(-4%, 40%);
		z-index: 0;
	}
	/* Bubble bg with plain CSS */
	.bubble::after {
		content: '';
		border-top-left-radius: 50% 100%;
		border-top-right-radius: 50% 100%;
		position: absolute;
		bottom: 0;
		z-index: -1;
		width: 100%;
		background-color: #fb923c;
		height: 85%;
	}
	/* SVG background image via https://haikei.app/ */
	.spacer {
		aspect-ratio: 960/300;
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.layer1 {
		background-image: url('/layer1.svg');
	}
	.flip {
		transform: rotate(180deg);
	}
</style>