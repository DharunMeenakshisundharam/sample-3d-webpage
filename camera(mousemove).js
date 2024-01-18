import * as THREE from 'three'

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
    cursor.x=-(event.clientX/sizes.width - 0.5)
    cursor.y =(event.clientY/sizes.width - 0.5)
 }
 )
/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)




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
    //const elapsedtime = clock.getElapsedTime()
    // update camera positon
    camera.position.x=cursor.x * 3
    camera.position.y=cursor.y * 3
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()