<script context="module" lang="typescript">

    import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js'
    export async function getMush(){
        try {
            const mushLoader = new GLTFLoader()
            let mushModelFA = await mushLoader.loadAsync("../../../static/texturedmuscaria.gltf")
            let mushModelLI = await mushLoader.loadAsync("../../../static/lactarius.gltf")
            return [mushModelFA, mushModelLI]
            
        } catch (error) {
            return error
        }
    }
</script>