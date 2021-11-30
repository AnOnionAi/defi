<script context="module" lang="typescript">
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	export async function getMush() {
		try {
			const mushLoader = new GLTFLoader();
			let mushModelFA = await mushLoader.loadAsync('agaricCompressedGLB.glb');
			let dollarSign = await mushLoader.loadAsync('dollarCompressedGLB.glb');
			let lactarius = await mushLoader.loadAsync('lactariusCompressedGLB.glb');
			let mushCrypto = await mushLoader.loadAsync('mushglb.glb');
			return [mushModelFA, dollarSign, lactarius, mushCrypto];
		} catch (error) {
			return error;
		}
	}
</script>