<script context="module" lang="ts">
    export const prerender = false
    
    import { _ } from "svelte-i18n"
    import {setInit} from "$lib/i18n/init"
    
    export async function load({page}){
        const { lang } = page.params;
        setInit(lang)
        return {
            props:{lang}
        }
    }
    
</script>
<script lang="ts">
    import { onMount } from "svelte"
    import space from "../../../static/space.jpg"
    import floppa from "../../../static/floppa.jpg"
    import mush from "../../../static/mush.jpg"
    import lact from "../../../static/lactarius.jpg"
    import * as THREE from "three"
    export let lang
    let canvas;

    onMount(() => {

        
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        const renderer = new THREE.WebGLRenderer({
            canvas
        })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.position.setZ(30)

        function sineWave ( u, v ) {
            var x = u * 9 - 4.5;
            var y = v * 9 - 4.5;
            var z = Math.sin(u*Math.PI*2.0);
                        
            return new THREE.Vector3(x, y, z);
        }

        const geometry = new THREE.TorusGeometry(10, 1.9, 6, 50) /*new THREE.ParametricGeometry( sineWave, 25, 25 );*/
        
        const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
        const torus = new THREE.Mesh( geometry, material )
        scene.add(torus)

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
        scene.background = spaceTexture

        const floppaTexture = new THREE.TextureLoader().load(floppa)
        const lactTexture = new THREE.TextureLoader().load(lact)
        const mushTexture = new THREE.TextureLoader().load(mush)

        const lactarius = new THREE.Mesh(
            new THREE.OctahedronGeometry(10, 1),
            new THREE.MeshBasicMaterial({
                map: lactTexture
            })
        )

        const mushSquare = new THREE.Mesh(
            new THREE.BoxGeometry(9,9,9),
            new THREE.MeshBasicMaterial({
                map: mushTexture
            })
        )

        const floppaMoon = new THREE.Mesh(
            new THREE.SphereGeometry(8, 32, 32),
            new THREE.MeshStandardMaterial({
                map: floppaTexture
            })
        )

        scene.add(floppaMoon)
        mushSquare.position.set(20, 10, -20);
        lactarius.position.set(40, 10, -15);

        scene.add(mushSquare)
        scene.add(lactarius)
        function animate(){
            requestAnimationFrame(animate)
            torus.rotation.x += 0.01;
            floppaMoon.rotation.y += 0.02; 
            mushSquare.rotation.y -= 0.01
            mushSquare.rotation.x -= 0.01
            lactarius.rotation.y -= 0.01
            lactarius.rotation.x -= 0.01
            var time = Date.now() * 0.0005;
            mushSquare.position.x = Math.cos( time * 10 ) * 25;
            mushSquare.position.y = Math.cos( time * 7 ) * 18;
            mushSquare.position.z = Math.cos( time * 8 ) * 16;
            /*
            if(mushSquare.position.x > -30){
                mushSquare.position.x -=0.1
            }
            */

            renderer.render(scene, camera)
        }

        function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
        

            //camera.position.z = t * -0.01;
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

    <section class = "mr-auto ml-auto w-5/6">

  
        <section style = "margin: 150px 0;" class = "text-center">
          <h2 class = "relative text-5xl sm:text-9xl"><div>WELCOME TO</div>&#127812;ZYBER&#127812;</h2>
        </section>
        <section style = "margin-bottom:15px; margin-top:40px;" class = "MUSH_about shadow-md rounded backdrop-filter backdrop-blur">
          <h2 class = "text-center text-5xl">📜 ABOUT</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
  
        <section class="MUSH_about shadow-md rounded backdrop-filter backdrop-blur w-full">
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