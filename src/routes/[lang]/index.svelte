<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { darkMode } from '$lib/stores/dark';
	import { getMush } from '$lib/components/ThreeD/mushModle.svelte';
	import { _ } from 'svelte-i18n';
	import {
		Scene,
		PerspectiveCamera,
		WebGLRenderer,
		TorusGeometry,
		MeshStandardMaterial,
		Mesh,
		PointLight,
		AmbientLight,
		TextureLoader,
		SphereGeometry
	} from 'three';
	import { isHomescreen } from '$lib/stores/homescreen';
	import { mushMarketCap } from '$lib/stores/MushMarketStats';
	import { fade } from 'svelte/transition';

	let canvas;
	let scene;
	let visible = false;

	onDestroy(() => {
		isHomescreen.set(false);
	});

	onMount(() => {
		isHomescreen.set(true);
		scene = new Scene();
		visible = true;
		const camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const renderer = new WebGLRenderer({
			canvas
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		camera.position.setZ(30);

		const spaceTexture = new TextureLoader().load(
			'/animation/green-space-texture.webp'
		);
		const spaceTextureLight = new TextureLoader().load(
			'/animation/elegant-space-texture.webp'
		);

		//Start Torus
		const geometryTorusOne = new TorusGeometry(7, 1, 8, 25);
		const materialTorusOne = new MeshStandardMaterial({
			color: 0xfe7688,
			wireframe: true
		});
		const torusOne = new Mesh(geometryTorusOne, materialTorusOne);
		scene.add(torusOne);

		torusOne.position.set(0, 0, 0);
		// End Torus

		const lightPoint = new PointLight(0xfe7688);

		lightPoint.position.set(0, 0, 0);

		const ambientLight = new AmbientLight(0xfe7688);
		scene.add(lightPoint, ambientLight);

		/**
            Getting gltf models
        */
		let dollarSign;
		let mushMeshCryp;
		getMush()
			.then((mush) => {
				const [dollar, mushCrypto] = mush;
				dollarSign = dollar.scene;
				mushMeshCryp = mushCrypto.scene;
				mushMeshCryp.scale.set(200, 200, 200);
				floppaMoon.position.set(0, 0, 0);
				scene.add(dollarSign, floppaMoon, mushMeshCryp);
			})
			.catch((err) => {
				console.log('Error loading 3D models');
			});

		// Start Moon
		const floppaTextureMoon = new TextureLoader().load('/animation/moon.webp');

		const floppaMoon = new Mesh(
			new SphereGeometry(250, 250, 250),
			new MeshStandardMaterial({
				map: floppaTextureMoon,
				metalness: 0.25
			})
		);

		function animate() {
			requestAnimationFrame(animate);

			var time = Date.now() * 0.0005;

			torusOne.rotation.y += 0.0015;

			if (mushMeshCryp) {
				mushMeshCryp.rotation.y -= 0.0015;

				mushMeshCryp.position.x = 0;
				mushMeshCryp.position.y = 0;
				mushMeshCryp.position.z = -100;
			}

			if (floppaMoon) {
				floppaMoon.rotation.y += 0.0005;
			}
			if (dollarSign) {
				const t = document.body.getBoundingClientRect().top;

				dollarSign.rotation.y -= 0.01;
				dollarSign.rotation.x -= 0.01;

				if (t < -7000) {
					dollarSign.position.x = -340 + Math.sin(time * 2.5) * 200;
					dollarSign.position.y = 0;
					dollarSign.position.z = -1100 + Math.cos(time * 2.5) * 200;

					dollarSign.rotation.y = 0;
					dollarSign.rotation.x = 0;
				} else {
					dollarSign.position.x = t * 0.00625 + Math.cos(time * 3) * 25;
					dollarSign.position.y = t * -0.00075 + Math.cos(time * 2.5) * 18;
					dollarSign.position.z = 10 + t * 0.1 + Math.cos(time * 2) * 16;
				}
			}

			if ($darkMode) {
				scene.background = spaceTextureLight;
			} else {
				scene.background = spaceTexture;
			}

			renderer.render(scene, camera);
		}
		function moveCamera() {
			const t = document.body.getBoundingClientRect().top;

			torusOne.rotation.x += 0.018;

			camera.position.z = 10 + t * 0.1;
			camera.position.x = t * 0.00625;
			camera.rotation.y = t * -0.00075;
		}

		window.onresize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		document.body.onscroll = moveCamera;
		moveCamera();

		animate();
	});
</script>

<noscript>
	<div id="noscript_warning">
		We have detected javascript is disabled on your browser, please enable it !
	</div>
</noscript>

<section class="relative">
	<canvas bind:this={canvas} id="bg" />

	<section class="mr-auto ml-auto w-5/6 text-white">
		<section
			class="MUSH_about title group min-h-screen bg-transparent text-center">
			<h2 class="relative text-9xl">FUNGFI DEFI</h2>
			{#if visible}
				<h4 in:fade={{ duration: 1000 }} class="relative pt-48 text-7xl italic">
					{$_('home.tagline1')}
				</h4>
				<h4
					in:fade={{ delay: 1500, duration: 3000 }}
					class="relative pt-2 text-5xl">
					{$_('home.tagline2')} 🍄
				</h4>
				<h3
					in:fade={{ delay: 3500, duration: 1000 }}
					class="market-cap max-w-screen text-triadicGreenn-500 relative m-auto mt-2 pt-2 text-3xl font-bold lg:mt-6 lg:ml-auto lg:mr-auto lg:max-w-screen-md lg:text-6xl">
					{$_('home.marketCap')}
					{#if $mushMarketCap}
						<p in:fade={{ delay: 4250, duration: 2000 }}>
							${$page.params.lang == 'es'
								? $mushMarketCap.toLocaleString('es-ES')
								: $mushMarketCap.toLocaleString('en-US')}
						</p>
					{/if}
				</h3>
			{/if}
		</section>

		<section
			class="MUSH_about m-auto max-w-3xl rounded shadow-md backdrop-filter">
			<h2 class="text-center text-5xl">{$_('home.introTitle')} 📜</h2>
			<div class="MUSH_main_section text-md lg:text-xl">{$_('home.intro')}</div>
		</section>

		<section class="MUSH_about subtitle m-auto flex max-w-3xl backdrop-filter">
			<div class="MUSH_main_section">
				<blockquote>{$_('home.velocityIdeas')}</blockquote>
				<blockquote>{$_('home.revolution')}</blockquote>
			</div>
		</section>

		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.velocityIdeasText')}
				<br />
				<br />
				{$_('home.gainzText')} 🤑
				<br />
				<br />
				{$_('home.fijiSignature')} 🍄
			</div>
		</section>

		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.psText')}
				<br />
				<br />
				{$_('home.powerText')}
			</div>
		</section>
		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.ps2Text')} 🚀
			</div>
		</section>
	</section>
</section>

<style>
	h2 {
		font-weight: 100;
	}

	section blockquote {
		line-height: 170px;
		font-size: 30px;
		display: inline;
		background-color: white;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
		padding: 0;
		color: black;
		font-size: 45px;
		padding: 10px;
		/* line-height: 100px; */

		max-height: none;
		height: -webkit-max-content;
		height: -moz-max-content;
		height: max-content;
		text-align: center;
	}
	@media (min-width: 1024px) {
		section blockquote {
			font-size: 130px;
		}
	}

	.MUSH_about {
		background-color: rgba(15, 15, 15, 0.7);
		padding: 25px;
		--tw-backdrop-blur: blur(1px);
		margin-bottom: 50vh;
	}

	.MUSH_about:last-child {
		margin-bottom: 40px;
	}

	.MUSH_about.title {
		background-color: transparent;
		margin-bottom: 10vh !important;
	}

	.MUSH_about.subtitle {
		background-color: transparent;
		align-items: center;
		justify-content: center;
	}

	.MUSH_about h2 {
		margin-bottom: 10px;
	}

	@media (max-width: 680px) {
		.MUSH_main_section {
			display: block;
		}
	}

	#bg {
		position: fixed;
		left: 0;
		top: 0;
	}

	.market-cap {
		text-shadow: 4px 4px 4px seagreen;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}

	#noscript_warning {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 101;
		text-align: center;
		font-weight: bold;
		color: #fff;
		background-color: orangered;
		padding: 5px 0 5px 0;
		z-index: 100;
	}
</style>
