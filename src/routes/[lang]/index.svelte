<script context="module" lang="ts">
    export const prerender = false
    

    import { _ } from "svelte-i18n"
    import {setInit} from "$lib/i18n/init"

    export function load({page}){

        
        const { lang } = page.params;
        
        return {
            props:{
                lang
            }
        }
        
    }
    
</script>
<script lang="ts">

    import { onMount } from "svelte"
    import space from "../../../static/space.jpg"
    import moon from "../../../static/moon.jpg"
    import mush from "../../../static/mush.jpg"
    import lact from "../../../static/lactarius.jpg"
    import {darkMode} from "../../stores/dark"
    import {getMush} from "./mushModle.svelte"
    import * as THREE from "three"
    export let lang
    let canvas;
    let scene;
    onMount(() => {
        scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        const renderer = new THREE.WebGLRenderer({
            canvas
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.position.setZ(30)

        //Start Torus
        const geometryTorusOne = new THREE.TorusGeometry( 7, 1, 8, 25); /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
        const materialTorusOne = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe:true })
        const torusOne = new THREE.Mesh( geometryTorusOne, materialTorusOne )

        scene.add(torusOne)
        
        const geometryTorusThree = new THREE.TorusGeometry(7, 1, 5, 50) /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
        const materialTorusThree = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe:true })
        const torusThree = new THREE.Mesh( geometryTorusThree, materialTorusThree )

        const geometryTorusFour = new THREE.TorusGeometry(9, 1, 6, 50) /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
        const materialTorusFour = new THREE.MeshStandardMaterial({ color: 0xE62E2D, wireframe:true })
        const torusFour = new THREE.Mesh( geometryTorusFour, materialTorusFour )
        scene.add(torusThree, torusFour)

        torusOne.position.set(-1.5, 0, -47)
        // End Torus

        const lightPoint = new THREE.PointLight(0xffffff)

        lightPoint.position.set(20,20,20)

        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(lightPoint, ambientLight)

        function addStar(){
            const geometry = new THREE.SphereGeometry(0.25, 24,24)
            const material = new THREE.MeshStandardMaterial({ color : 0xffffff })

            const star = new THREE.Mesh(geometry, material)
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
            star.position.set(x, y, z)
            scene.add(star)
        }

        Array(100).fill().forEach(addStar)

        const spaceTexture = new THREE.TextureLoader().load(space)
        if($darkMode){
            scene.background = new THREE.Color( 0x000000 );
        }else{
            scene.background = spaceTexture
        }
        

        const floppaTexture = new THREE.TextureLoader().load(moon)
        const lactTexture = new THREE.TextureLoader().load(lact)
        const mushTexture = new THREE.TextureLoader().load(mush)

        const floppaMoon = new THREE.Mesh(
            new THREE.SphereGeometry(8, 32, 32),
            new THREE.MeshStandardMaterial({
                map: floppaTexture
            })
        )

        /**
            Getting gltf models
        */
        let mushMeshFA

        let dollarSign
        let mushMeshLA
        getMush().then(mush => {
            const [agaric, dollar, lactarius] = mush
            mushMeshFA = agaric.scene
            mushMeshFA.position.set(0, -1.25, 0)
            dollarSign = dollar.scene
            mushMeshLA = lactarius.scene
            mushMeshLA.position.set(-1.5, 0, -47)
            scene.add(mushMeshFA, dollarSign, mushMeshLA)

        }).catch(err => {
            console.log(err)
        }) 

        function animate(){
            requestAnimationFrame(animate)
            
            var time = Date.now() * 0.0005;
            
            torusOne.rotation.y += 0.015 
            torusFour.rotation.x += 0.015 
            torusThree.rotation.z += 0.015 
            if(mushMeshFA){
            mushMeshFA.rotation.x -= 0.015 
            mushMeshFA.rotation.y += 0.015
            } 

            if(mushMeshLA){
                mushMeshLA.rotation.x += 0.01
                mushMeshLA.rotation.Y += 0.0025
                mushMeshLA.rotation.Z += 0.0025
            }
            if(dollarSign){
                dollarSign.rotation.y -= 0.01
                dollarSign.rotation.x -= 0.01
                dollarSign.position.x = Math.cos( time * 3 ) * 25;
                dollarSign.position.y = Math.cos( time * 2.5 ) * 18;
                dollarSign.position.z = Math.cos( time * 2 ) * 16;
            }

            renderer.render(scene, camera)
        }
        function moveCamera() {
            const t = document.body.getBoundingClientRect().top;
            
            torusOne.rotation.x += 0.18 
            
            camera.position.z = 15 + t*0.1;
            camera.position.x = t * 0.00625;
            camera.rotation.y = t * -0.00075;
        }

        window.onresize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        document.body.onscroll = moveCamera;
        moveCamera();

        animate()

    })
</script>

<section class = "relative">
    <canvas bind:this={canvas} id = "bg">

    </canvas>

    <section class = "text-white mr-auto ml-auto w-5/6">

  
        <section style = "margin: 150px 0;" class = "text-center">
          <h2 class = "relative text-5xl sm:text-9xl"><div>WELCOME TO</div>&#127812;#127812;</h2>
        </section>
        <section style = "margin-bottom:15px; margin-top:40px;" class = "MUSH_about shadow-md rounded backdrop-filter">
          <h2 class = "text-center text-5xl">📜 THE DEAL</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
  
        <section class="MUSH_about shadow-md rounded backdrop-filter w-full">
            <h2 class = "text-center text-5xl">&#128176;M U S H Stats&#127812;</h2>
            <div class = "MUSH_main_section">
                <div style="padding-right:15px;" class= "MUSH_stats">
                    <div>
                        <p>Market Cap</p>
                        <p>$31, 076,</p>
                    </div>
                    <div>
                        <p>Total Minted</p>
                        <p>$31, 076,</p>
                    </div>
                    <div>
                        <p>Total Burned</p>
                        <p>$31, 076,</p>
                    </div>
                    <div>
                        <p>Circulation Supply</p>
                        <p>$31, 076,</p>
                    </div>
                    <div>
                        <p>Maximun supply</p>
                        <p>$31, 076,</p>
                    </div>
                    <div>
                        <p>New MUSH/bloc</p>
                        <p>$31, 076,</p>
                    </div>
                </div>

                <div class= "MUSH_tvl">
                    <div>
                        <p>Total Value Locked (TVL)</p>
                        <p>$999,999,999.99</p>
                    </div>
                    <div>
                        <p>Farms & Pools:</p>
                        <p>$99,999,999.98.</p>
                    </div>
                    <div>
                        <p>Vaults</p>
                        <p>$99,999,999.98</p>
                    </div>
                </div>
            </div>
        </section>
  
    
    
    </section>
      
</section>

<style>

    .MUSH_about{
        padding:15px;
        --tw-backdrop-blur: blur(1px);
    }
    .MUSH_about h2{
        margin-bottom:10px
    }
    .MUSH_tvl, .MUSH_stats{
        margin:auto;
    }
    .MUSH_stats, .MUSH_tvl{
        width:100%
    }

    .MUSH_stats p, .MUSH_tvl p, .MUSH_about p{
        font-weight: 700;
    }
    .MUSH_stats div, .MUSH_tvl div, .MUSH_main_section{
        display:flex;
        justify-content: space-between;
    }

    @media(max-width:680px){
        .MUSH_info{
        width:550px;
        }
        .MUSH_main_section{
            display:block;
        }
    }
    .bg-white{
        background-color : transparent;
        border-radius: 5px;

    }
    #bg{
        position: fixed;
        left:0;
        top:0;
    }
    main {
        color: white;
        z-index: 99;
        width: 90%;
        
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
    }



</style>