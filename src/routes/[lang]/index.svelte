<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import spaceDay from '/static/space.jpg';
	import spaceNight from '/static/space35.jpg';
	import moon from '/static/moon.jpg';
	import earth from '/static/earth.jpg';
	import sun from '/static/sun.jpg';
	import { darkMode } from '$lib/stores/dark';
	import { getMush } from './mushModle.svelte';
	import { _ } from 'svelte-i18n';
	import * as THREE from 'three';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.update((v) => (v = true));
	export let lang;
	let canvas;
	let scene;
	onMount(() => {
		scene = new THREE.Scene();

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
		const materialTorusOne = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
		const torusOne = new THREE.Mesh(geometryTorusOne, materialTorusOne);

		scene.add(torusOne);

		const geometryTorusThree = new THREE.TorusGeometry(
			7,
			1,
			5,
			50
		); /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
		const materialTorusThree = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
		const torusThree = new THREE.Mesh(geometryTorusThree, materialTorusThree);

		const geometryTorusFour = new THREE.TorusGeometry(
			9,
			1,
			6,
			50
		); /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
		const materialTorusFour = new THREE.MeshStandardMaterial({ color: 0xe62e2d, wireframe: true });
		const torusFour = new THREE.Mesh(geometryTorusFour, materialTorusFour);
		// scene.add(torusThree, torusFour);

		torusOne.position.set(-1.5, 0, -47);
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

		const moonTexture = new THREE.TextureLoader().load('textureMoon.jpg');

		const floppaTexture = new THREE.TextureLoader().load(moon);
		const floppaTextureEarth = new THREE.TextureLoader().load(earth);
		const floppaTextureSun = new THREE.TextureLoader().load(sun);

		const floppaMoon = new THREE.Mesh(
			new THREE.SphereGeometry(2, 8, 8),
			new THREE.MeshStandardMaterial({
				map: floppaTexture,
				normalMap: moonTexture
			})
		);

		const floppaEarth = new THREE.Mesh(
			new THREE.SphereGeometry(8, 32, 32),
			new THREE.MeshStandardMaterial({
				map: floppaTextureEarth,
				normalMap: moonTexture
			})
		);

		const floppaSun = new THREE.Mesh(
			new THREE.SphereGeometry(128, 508, 508),
			new THREE.MeshStandardMaterial({
				map: floppaTextureSun,
				normalMap: moonTexture
			})
		);

		/**
            Getting gltf models
        */
		let mushMeshFA;

		let dollarSign;
		let mushMeshLA;
		let mushMeshCryp;
		getMush()
			.then((mush) => {
				const [agaric, dollar, lactarius, mushCrypto] = mush;
				// mushMeshFA = agaric.scene;
				// mushMeshFA.position.set(0, 5, -5);
				dollarSign = dollar.scene;
				mushMeshLA = lactarius.scene;
				mushMeshLA.position.set(-1.5, 0, -47);
				mushMeshCryp = mushCrypto.scene;
				mushMeshCryp.scale.set(25, 25, 25);
				mushMeshCryp.position.set(-340, 0, -1100);
				floppaMoon.position.set(-50, 0, -150);
				floppaEarth.position.set(-100, 0, -300);
				floppaSun.position.set(500, 0, -1000);
				scene.add(dollarSign, mushMeshLA, floppaMoon, floppaEarth, floppaSun, mushMeshCryp);
			})
			.catch((err) => {
				console.log(err);
			});

		function animate() {
			requestAnimationFrame(animate);

			var time = Date.now() * 0.0005;

			torusOne.rotation.y += 0.015;
			torusFour.rotation.x += 0.015;
			torusThree.rotation.z += 0.015;

			if (mushMeshLA) {
				mushMeshLA.rotateY((Math.PI / 60) * 0.6);
				mushMeshLA.rotateX((Math.PI / 120) * 0.6);
			}
			if (mushMeshCryp) {
				mushMeshCryp.rotation.y -= 0.01;

				mushMeshCryp.position.x = -340;
				mushMeshCryp.position.y = -50;
				mushMeshCryp.position.z = -1000;
			}
			if (floppaMoon) {
				// floppaMoon.rotation.x += 0.01;
				floppaMoon.rotation.y += 0.01;
				// floppaMoon.rotation.Z += 0.0025;
			}
			if (floppaEarth) {
				floppaEarth.rotation.y += 0.01;
			}
			if (floppaSun) {
				floppaSun.rotation.y += 0.005;
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
			} else {
				scene.background = spaceTexture;
			}

			renderer.render(scene, camera);
		}
		function moveCamera() {
			const t = document.body.getBoundingClientRect().top;

			torusOne.rotation.x += 0.18;

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

	<section class="text-white mr-auto ml-auto w-5/6">
		<section
			style="margin-top: 100px;"
			class="MUSH_about title text-center bg-transparent min-h-screen"
		>
			<h2 class="relative text-5xl lg:text-9xl"><div>FUNG FINANCIAL</div></h2>
			<h4 class="relative italic text-4xl"><div>WHERE MONEY GROWS&#127812;</div></h4>
			<h3
				class="market-cap relative text-green-500 font-bold text-3xl lg:text-6xl mt-10 lg:mt-30 pt-2 pb-2 max-w-screen -ml-10 -mr-10 lg:ml-auto lg:mr-auto lg:max-w-screen-md m-auto"
			>
				Market Cap: $10, 000, 000
			</h3>
		</section>

		<section class="MUSH_about shadow-md backdrop-filter max-w-3xl m-auto min-h-screen rounded">
			<h2 class="text-center text-5xl">THE DEAL 📜</h2>
			<div class="MUSH_main_section text-md lg:text-xl">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus iure
					voluptate, numquam nostrum blanditiis, dolorum porro laboriosam aut neque modi vel
					distinctio. Ut, quibusdam iste reprehenderit cupiditate voluptatum libero inventore quo
					quasi earum distinctio in eveniet, rerum consectetur, eligendi sit laudantium minus dicta
					sapiente possimus quisquam! Veniam vitae quas aspernatur ad veritatis nobis voluptates
					dolorem cupiditate numquam doloremque, eligendi ratione, quisquam quasi nemo. Nihil quod,
					enim, tenetur vero quae libero mollitia labore dolorem dolorum necessitatibus quo veniam
					laboriosam veritatis praesentium aut nulla a ad fuga. Illo optio nostrum eaque quidem!
					Laborum, voluptate commodi eaque rem dicta tempora animi cumque dolorum similique quos
					exercitationem quam, reiciendis voluptatem odit fugit voluptatum qui tenetur officia harum
					illo minus magni eligendi? Exercitationem, nulla cumque dolor in ullam explicabo eum.
					Delectus inventore dolore eveniet quam velit deserunt, sunt repellat, possimus unde
					dignissimos laborum tenetur dolor. Iusto consectetur accusantium suscipit neque, ab ut
					earum accusamus ratione dolores sapiente placeat, quae eveniet adipisci maxime amet? Sequi
					quia veritatis maiores cupiditate minima dicta praesentium quisquam voluptatem dolorem,
					reprehenderit, in quis perferendis porro temporibus saepe, earum omnis sunt deserunt.
					Ipsum magni ea corrupti! Expedita ipsa in soluta aspernatur dolorem. Magnam quas nam quasi
					mollitia a qui aliquam dolore.
				</p>
			</div>
		</section>

		<section class="MUSH_about subtitle backdrop-filter max-w-3xl m-auto min-h-screen flex text-sm">
			<div class="MUSH_main_section">
				<blockquote>GETTING STARTED</blockquote>
			</div>
		</section>

		<section class="MUSH_about shadow-md backdrop-filter max-w-3xl m-auto min-h-screen">
			<div class="MUSH_main_section text-md lg:text-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus iure voluptate,
				numquam nostrum blanditiis, dolorum porro laboriosam aut neque modi vel distinctio. Ut,
				quibusdam iste reprehenderit cupiditate voluptatum libero inventore quo quasi earum
				distinctio in eveniet, rerum consectetur, eligendi sit laudantium minus dicta sapiente
				possimus quisquam! Veniam vitae quas aspernatur ad veritatis nobis voluptates dolorem
				cupiditate numquam doloremque, eligendi ratione, quisquam quasi nemo. Nihil quod, enim,
				tenetur vero quae libero mollitia labore dolorem dolorum necessitatibus quo veniam
				laboriosam veritatis praesentium aut nulla a ad fuga. Illo optio nostrum eaque quidem!
				Laborum, voluptate commodi eaque rem dicta tempora animi cumque dolorum similique quos
				exercitationem quam, reiciendis voluptatem odit fugit voluptatum qui tenetur officia harum
				illo minus magni eligendi? Exercitationem, nulla cumque dolor in ullam explicabo eum.
				Delectus inventore dolore eveniet quam velit deserunt, sunt repellat, possimus unde
				dignissimos laborum tenetur dolor. Iusto consectetur accusantium suscipit neque, ab ut earum
				accusamus ratione dolores sapiente placeat, quae eveniet adipisci maxime amet? Sequi quia
				veritatis maiores cupiditate minima dicta praesentium quisquam voluptatem dolorem,
				reprehenderit, in quis perferendis porro temporibus saepe, earum omnis sunt deserunt. Ipsum
				magni ea corrupti! Expedita ipsa in soluta aspernatur dolorem. Magnam quas nam quasi
				mollitia a qui aliquam dolore.
			</div>
		</section>

		<section class="MUSH_about subtitle backdrop-filter max-w-3xl m-auto min-h-screen flex">
			<div class="MUSH_main_section">
				<blockquote>YOUR CRYPTO ADVENTURE</blockquote>
			</div>
		</section>

		<section class="MUSH_about shadow-md backdrop-filter max-w-3xl m-auto min-h-screen">
			<div class="MUSH_main_section text-md lg:text-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus iure voluptate,
				numquam nostrum blanditiis, dolorum porro laboriosam aut neque modi vel distinctio. Ut,
				quibusdam iste reprehenderit cupiditate voluptatum libero inventore quo quasi earum
				distinctio in eveniet, rerum consectetur, eligendi sit laudantium minus dicta sapiente
				possimus quisquam! Veniam vitae quas aspernatur ad veritatis nobis voluptates dolorem
				cupiditate numquam doloremque, eligendi ratione, quisquam quasi nemo. Nihil quod, enim,
				tenetur vero quae libero mollitia labore dolorem dolorum necessitatibus quo veniam
				laboriosam veritatis praesentium aut nulla a ad fuga. Illo optio nostrum eaque quidem!
				Laborum, voluptate commodi eaque rem dicta tempora animi cumque dolorum similique quos
				exercitationem quam, reiciendis voluptatem odit fugit voluptatum qui tenetur officia harum
				illo minus magni eligendi? Exercitationem, nulla cumque dolor in ullam explicabo eum.
				Delectus inventore dolore eveniet quam velit deserunt, sunt repellat, possimus unde
				dignissimos laborum tenetur dolor. Iusto consectetur accusantium suscipit neque, ab ut earum
				accusamus ratione dolores sapiente placeat, quae eveniet adipisci maxime amet? Sequi quia
				veritatis maiores cupiditate minima dicta praesentium quisquam voluptatem dolorem,
				reprehenderit, in quis perferendis porro temporibus saepe, earum omnis sunt deserunt. Ipsum
				magni ea corrupti! Expedita ipsa in soluta aspernatur dolorem. Magnam quas nam quasi
				mollitia a qui aliquam dolore.
			</div>
		</section>

		<section class="MUSH_about subtitle backdrop-filter max-w-3xl m-auto min-h-screen flex">
			<div class="MUSH_main_section">
				<blockquote>WALL STREET CRYPTO</blockquote>
			</div>
		</section>

		<section class="MUSH_about shadow-md backdrop-filter max-w-3xl m-auto min-h-screen">
			<div class="MUSH_main_section text-md lg:text-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus iure voluptate,
				numquam nostrum blanditiis, dolorum porro laboriosam aut neque modi vel distinctio. Ut,
				quibusdam iste reprehenderit cupiditate voluptatum libero inventore quo quasi earum
				distinctio in eveniet, rerum consectetur, eligendi sit laudantium minus dicta sapiente
				possimus quisquam! Veniam vitae quas aspernatur ad veritatis nobis voluptates dolorem
				cupiditate numquam doloremque, eligendi ratione, quisquam quasi nemo. Nihil quod, enim,
				tenetur vero quae libero mollitia labore dolorem dolorum necessitatibus quo veniam
				laboriosam veritatis praesentium aut nulla a ad fuga. Illo optio nostrum eaque quidem!
				Laborum, voluptate commodi eaque rem dicta tempora animi cumque dolorum similique quos
				exercitationem quam, reiciendis voluptatem odit fugit voluptatum qui tenetur officia harum
				illo minus magni eligendi? Exercitationem, nulla cumque dolor in ullam explicabo eum.
				Delectus inventore dolore eveniet quam velit deserunt, sunt repellat, possimus unde
				dignissimos laborum tenetur dolor. Iusto consectetur accusantium suscipit neque, ab ut earum
				accusamus ratione dolores sapiente placeat, quae eveniet adipisci maxime amet? Sequi quia
				veritatis maiores cupiditate minima dicta praesentium quisquam voluptatem dolorem,
				reprehenderit, in quis perferendis porro temporibus saepe, earum omnis sunt deserunt. Ipsum
				magni ea corrupti! Expedita ipsa in soluta aspernatur dolorem. Magnam quas nam quasi
				mollitia a qui aliquam dolore.
			</div>
		</section>

		<section class="MUSH_about subtitle backdrop-filter max-w-3xl m-auto min-h-screen flex">
			<div class="MUSH_main_section">
				<blockquote>THE FUTURE OF CRYPTO IS HERE</blockquote>
			</div>
		</section>

		<section class="MUSH_about shadow-md backdrop-filter max-w-3xl m-auto min-h-screen">
			<div class="MUSH_main_section text-md lg:text-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, minus iure voluptate,
				numquam nostrum blanditiis, dolorum porro laboriosam aut neque modi vel distinctio. Ut,
				quibusdam iste reprehenderit cupiditate voluptatum libero inventore quo quasi earum
				distinctio in eveniet, rerum consectetur, eligendi sit laudantium minus dicta sapiente
				possimus quisquam! Veniam vitae quas aspernatur ad veritatis nobis voluptates dolorem
				cupiditate numquam doloremque, eligendi ratione, quisquam quasi nemo. Nihil quod, enim,
				tenetur vero quae libero mollitia labore dolorem dolorum necessitatibus quo veniam
				laboriosam veritatis praesentium aut nulla a ad fuga. Illo optio nostrum eaque quidem!
				Laborum, voluptate commodi eaque rem dicta tempora animi cumque dolorum similique quos
				exercitationem quam, reiciendis voluptatem odit fugit voluptatum qui tenetur officia harum
				illo minus magni eligendi? Exercitationem, nulla cumque dolor in ullam explicabo eum.
				Delectus inventore dolore eveniet quam velit deserunt, sunt repellat, possimus unde
				dignissimos laborum tenetur dolor. Iusto consectetur accusantium suscipit neque, ab ut earum
				accusamus ratione dolores sapiente placeat, quae eveniet adipisci maxime amet? Sequi quia
				veritatis maiores cupiditate minima dicta praesentium quisquam voluptatem dolorem,
				reprehenderit, in quis perferendis porro temporibus saepe, earum omnis sunt deserunt. Ipsum
				magni ea corrupti! Expedita ipsa in soluta aspernatur dolorem. Magnam quas nam quasi
				mollitia a qui aliquam dolore.
			</div>
		</section>
	</section>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&family=IBM+Plex+Sans:wght@200&family=Roboto:wght@100;400&display=swap');

	section {
		font-family: 'Fira Sans Condensed', sans-serif;
	}

	section blockquote {
		line-height: 90px;
		font-size: 30px;
		font-family: 'Fira Sans Condensed', sans-serif;
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
			font-size: 90px;
		}
	}

	.MUSH_about {
		background-color: rgba(15, 15, 15, 0.7);
		padding: 45px;
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
		font-family: 'Roboto Thin', sans-serif;
	}

	.MUSH_about h2 {
		margin-bottom: 10px;
	}
	.MUSH_tvl,
	.MUSH_stats {
		margin: auto;
	}
	.MUSH_stats,
	.MUSH_tvl {
		width: 100%;
	}

	.MUSH_stats p,
	.MUSH_tvl p,
	.MUSH_about p {
		font-weight: 700;
	}
	.MUSH_stats div,
	.MUSH_tvl div,
	.MUSH_main_section {
		display: flex;
		justify-content: space-between;
		font-family: 'IBM Plex Sans', sans-serif;
		margin-top: 50px;
		margin-bottom: 50px;
	}

	@media (max-width: 680px) {
		.MUSH_info {
			width: 550px;
		}
		.MUSH_main_section {
			display: block;
		}
	}
	.bg-white {
		background-color: transparent;
		border-radius: 5px;
	}
	#bg {
		position: fixed;
		left: 0;
		top: 0;
	}
	main {
		color: white;
		z-index: 99;
		width: 90%;
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
