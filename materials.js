import * as THREE from 'three'
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"





// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//objects

const materials = new THREE.MeshNormalMaterial()
materials.flatShading=true

const torus = new THREE.Mesh(new THREE.TorusGeometry,materials)
const plane = new THREE.Mesh(new THREE.PlaneGeometry,materials)
const circle = new THREE.Mesh(new THREE.SphereGeometry,materials)

scene.add(torus,plane,circle)

torus.position.x = 3
circle.position.x=-3



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
camera.position.z = 5
scene.add(camera)
// controls

const controls = new OrbitControls(camera,canvas)

//resize
window.addEventListener('resize',()=>
{
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    //update camera
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //update renderer size
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//fullscreen
window.addEventListener('dblclick',()=>
{
    const fullscreen = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreen)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }

})




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


// animation
const clock = new THREE.Clock()
const tick = ()=>
{
    const elapsedtime = clock.getElapsedTime()

    torus.rotation.x=2*elapsedtime
    plane.rotation.x=2*elapsedtime
    circle.rotation.x=2 *elapsedtime

    torus.rotation.y=2*elapsedtime
    plane.rotation.y=2*elapsedtime
    circle.rotation.y=2*elapsedtime
    renderer.render(scene, camera)
    controls.update()
    window.requestAnimationFrame(tick)
}
tick()