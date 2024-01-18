import * as THREE from 'three'
import{OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from 'dat.gui'
import gsap from 'gsap'

//color
const parameter = {
    color:0xff0000,
    spin:()=>
    {
        gsap.to(mesh.rotation,{duration:1,y:mesh.rotation.y+10})
    }
}

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
/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color : parameter.color})
const mesh = new THREE.Mesh(geometry, material)
mesh.visible=false
scene.add(mesh)




//debug
const gui = new dat.GUI()
gui.addColor(parameter,'color').onChange(()=>
{
    mesh.material.color.set(parameter.color)
})
gui.add(mesh.position,'x',-3,3,0.01).name("elevation")
gui.add(mesh.position,'y',-3,3,0.01)
gui.add(mesh.position,'z',-3,3,0.01)
gui.add(mesh,'visible')
gui.add(material,'wireframe')
gui.add(parameter,'spin')




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
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()