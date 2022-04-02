<script context="module" lang="ts">
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	export async function getMush(): Promise<Array<GLTF>> {
		try {
			const mushLoader = new GLTFLoader();
			let dollarSign = await mushLoader.loadAsync(
				'/animation/dollarCompressedGLB.glb'
			);
			let mushCrypto = await mushLoader.loadAsync('/animation/mushglb.glb');
			return [dollarSign, mushCrypto];
		} catch (error) {
			return error;
		}
	}
</script>
