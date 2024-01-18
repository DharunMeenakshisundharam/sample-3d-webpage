import * as THREE from 'three'
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import{FontLoader} from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//mousemove
const cursor={
    x:0,
    y:0
 }

 window.addEventListener('mousemove',(event)=>
 {
    cursor.x=(event.clientX/sizes.width - 0.5)
    cursor.y =-(event.clientY/sizes.width - 0.5)
 }
 )


 //texture
 const textureloader = new THREE.TextureLoader()
 const texture = textureloader.load('1.png')
 


/**
 * fonts
 */
const loader = new FontLoader();

loader.load('helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( 'Hey Dharun', {
		font: font,
		size: 0.5,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
	} );
    const textture = new THREE.MeshNormalMaterial()
    const textum = new THREE.Mesh(geometry,textture)
    scene.add(textum)
} );
for(let i=0;i<100;i++)
{
    const materials = new THREE.MeshMatcapMaterial({matcap:texture})
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,20.45),materials)
    torus.position.x = (Math.random()-0.5)*10
    torus.position.y = (Math.random()-0.5)*10
    torus.position.z = (Math.random()-0.5)*10
    torus.rotation.x = (Math.random())*Math.PI
    torus.rotation.y = (Math.random())*Math.PI

    const scale = Math.random()
    torus.scale.set(scale,scale,scale)

    scene.add(torus)
}


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
// controls

const controls = new OrbitControls(camera,canvas)




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// animation
const clock = new THREE.Clock()
const tick = ()=>
{
    const elapsedtime = clock.getElapsedTime()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()