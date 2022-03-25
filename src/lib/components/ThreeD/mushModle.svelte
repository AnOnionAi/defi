<script context="module" lang="ts">
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	export async function getMush(): Promise<Array<GLTF>> {
		try {
			const mushLoader = new GLTFLoader();
			//let mushModelFA = await mushLoader.loadAsync('agaricCompressedGLB.glb');
			let dollarSign = await mushLoader.loadAsync(
				'/static/animation/dollarCompressedGLB.glb'
			);
			// let lactarius = await mushLoader.loadAsync('lactariusCompressedGLB.glb');
			let mushCrypto = await mushLoader.loadAsync(
				'/static/animation/mushglb.glb'
			);
			return [dollarSign, mushCrypto];
		} catch (error) {
			return error;
		}
	}
</script>
