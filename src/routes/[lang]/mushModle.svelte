<script context="module" lang="typescript">

    import { GLTFLoader } from './three/examples/loaders/GLTFLoader.js'
    export async function getMush(){
        try {
            const mushLoader = new GLTFLoader()
            let mushModelFA = await mushLoader.loadAsync("agaricglb.glb")
            let dollarSign = await mushLoader.loadAsync("dollargold.glb")
            let lactarius = await mushLoader.loadAsync("lactariusglb.glb")
            return [mushModelFA, dollarSign, lactarius]
            
        } catch (error) {
            return error
        }
    }
</script>