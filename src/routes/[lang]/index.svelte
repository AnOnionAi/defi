<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { page } from '$app/stores';

	import spaceDay from '/static/space.webp';
	import spaceNight from '/static/space35.webp';
	import moon from '/static/moon.webp';
	import earth from '/static/earth.webp';
	import earthNite from '/static/earthNite.jpg';

	import { darkMode } from '$lib/stores/dark';
	import { getMush } from '$lib/components/ThreeD/mushModle.svelte';
	import { _ } from 'svelte-i18n';
	import * as THREE from 'three';
	import { isHomescreen } from '$lib/stores/homescreen';

	import { mushMarketCap } from '$lib/stores/MushMarketStats';

	import { fade } from 'svelte/transition';

	isHomescreen.set(true);
	let canvas;
	let scene;
	let visible = false;

	onDestroy(() => {
		isHomescreen.set(false);
	});

	onMount(() => {
		scene = new THREE.Scene();
		visible = true;
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const renderer = new THREE.WebGLRenderer({
			canvas
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		camera.position.setZ(30);

		//Start Torus
		const geometryTorusOne = new THREE.TorusGeometry(
			7,
			1,
			8,
			25
		); /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
		const materialTorusOne = new THREE.MeshStandardMaterial({
			color: 0xff6347,
			wireframe: true
		});
		const torusOne = new THREE.Mesh(geometryTorusOne, materialTorusOne);
		scene.add(torusOne);

		torusOne.position.set(0, 0, 0);
		// End Torus

		const lightPoint = new THREE.PointLight(0xffffff);

		lightPoint.position.set(20, 20, 20);

		const ambientLight = new THREE.AmbientLight(0xffffff);
		scene.add(lightPoint, ambientLight);

		function addStar() {
			const geometry = new THREE.SphereGeometry(1, 24, 24);
			const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

			const star = new THREE.Mesh(geometry, material);
			const [x, y, z] = Array(3)
				.fill()
				.map(() => THREE.MathUtils.randFloatSpread(2500));
			star.position.set(x, y, z);
			scene.add(star);
		}

		Array(1000).fill().forEach(addStar);

		const spaceTexture = new THREE.TextureLoader().load(spaceDay);
		const spaceTextureLight = new THREE.TextureLoader().load(spaceNight);
		if ($darkMode) {
			scene.background = spaceTextureLight; //new THREE.Color(0x000000);
		} else {
			scene.background = spaceTexture;
		}

		const moonTexture = new THREE.TextureLoader().load('textureMoon.webp');
		const earthTexture = new THREE.TextureLoader().load('textureEarth.webp');
		const floppaTextureMoon = new THREE.TextureLoader().load(moon);
		const floppaTextureEarth = new THREE.TextureLoader().load(earth);
		const floppaTextureEarthNite = new THREE.TextureLoader().load(earthNite);

		const floppaMoon = new THREE.Mesh(
			new THREE.SphereGeometry(64, 256, 256),
			new THREE.MeshStandardMaterial({
				map: floppaTextureMoon,
				normalMap: moonTexture
			})
		);

		const floppaEarth = new THREE.Mesh(
			new THREE.SphereGeometry(260, 512, 512), // new THREE.SphereGeometry(128, 508, 508),
			new THREE.MeshStandardMaterial({
				map: floppaTextureEarth,
				normalMap: earthTexture
			})
		);

		/**
            Getting gltf models
        */
		let dollarSign;
		let mushMeshCryp;
		getMush()
			.then((mush) => {
				const [dollar, mushCrypto] = mush;
				dollarSign = dollar.scene;
				// mushMeshLA = lactarius.scene;
				// mushMeshLA.position.set(-1.5, 0, -47);
				mushMeshCryp = mushCrypto.scene;
				mushMeshCryp.scale.set(100, 100, 100);
				mushMeshCryp.position.set(0, 50, 0);
				floppaMoon.position.set(440, 0, -500);
				floppaEarth.position.set(240, 0, -260);
				scene.add(dollarSign, floppaMoon, floppaEarth, mushMeshCryp);
			})
			.catch((err) => {
				console.log(err);
			});

		function animate() {
			requestAnimationFrame(animate);

			var time = Date.now() * 0.0005;

			torusOne.rotation.y += 0.0015;

			// if (mushMeshLA) {
			// 	mushMeshLA.rotateY((Math.PI / 60) * 0.6);
			// 	mushMeshLA.rotateX((Math.PI / 120) * 0.6);
			// }
			if (mushMeshCryp) {
				mushMeshCryp.rotation.y -= 0.005;

				mushMeshCryp.position.x = -100;
				mushMeshCryp.position.y = -100;
				mushMeshCryp.position.z = -1100;
			}

			if (floppaMoon) {
				floppaMoon.rotation.y += 0.002;
			}
			if (floppaEarth) {
				floppaEarth.rotation.y += 0.0005;
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
				scene.background = spaceTextureLight; //new THREE.Color(0x000000);
				floppaEarth.material.setValues(
					new THREE.MeshStandardMaterial({
						map: floppaTextureEarthNite,
						normalMap: earthTexture
					})
				);
			} else {
				scene.background = spaceTexture;
				floppaEarth.material.setValues(
					new THREE.MeshStandardMaterial({
						map: floppaTextureEarth,
						normalMap: earthTexture
					})
				);
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

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap"
		rel="stylesheet" />
</svelte:head>

<section class="relative">
	<canvas bind:this={canvas} id="bg" />

	<section class="mr-auto ml-auto w-5/6 text-white">
		<section
			style="margin-top: 25px;"
			class="MUSH_about title group min-h-screen bg-transparent text-center">
			<h2 class="relative text-5xl lg:text-9xl">FUNGFI DEFI</h2>
			<!-- <div class="relative">
				<img class="m-auto" src="title.webp" alt="title">
			</div> -->
			{#if visible}
				<h4
					in:fade={{ duration: 1000 }}
					class="pt-33 xl:pt-75 relative text-4xl">
					{$_('home.tagline1')}
				</h4>
				<h4
					in:fade={{ delay: 1500, duration: 3000 }}
					class="relative pt-2 text-4xl italic">
					{$_('home.tagline2')} 🍄
				</h4>
				<h3
					in:fade={{ delay: 3500, duration: 1000 }}
					class="market-cap max-w-screen relative m-auto mt-2 pt-2 text-3xl font-bold text-green-500 lg:mt-6 lg:ml-auto lg:mr-auto lg:max-w-screen-md lg:text-6xl">
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

		<section
			class="MUSH_about subtitle m-auto flex max-w-3xl text-sm backdrop-filter">
			<div class="MUSH_main_section">
				<blockquote>{$_('home.wallStreetTitle')}</blockquote>
			</div>
		</section>

		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.wallStreetSpeech')}
			</div>
		</section>

		<section class="MUSH_about subtitle m-auto flex max-w-3xl backdrop-filter">
			<div class="MUSH_main_section">
				<blockquote>{$_('home.cryptoAdventureTitle')}</blockquote>
			</div>
		</section>

		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.cryptoAdventureText')}
			</div>
		</section>

		<section class="MUSH_about subtitle m-auto flex max-w-3xl backdrop-filter">
			<div class="MUSH_main_section">
				<blockquote>{$_('home.kariosTitle')} ⏰</blockquote>
			</div>
		</section>

		<section class="MUSH_about m-auto max-w-3xl shadow-md backdrop-filter">
			<div class="MUSH_main_section text-md lg:text-xl">
				{$_('home.kariosText')}
			</div>
		</section>

		<section class="MUSH_about subtitle m-auto flex max-w-3xl backdrop-filter">
			<div class="MUSH_main_section">
				<blockquote>{$_('home.velocityIdeas')} 💡</blockquote>
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
		margin-bottom: 70vh;
	}

	.MUSH_about:last-child {
		margin-bottom: 40px;
	}

	.MUSH_about.title {
		background-color: transparent;
		margin-bottom: 50vh !important;
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
