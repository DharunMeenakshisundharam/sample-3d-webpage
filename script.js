import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// group
const group=new THREE.Group()


/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// scale
mesh.scale.x=4
//rotation
mesh.rotation.z=4


/**
 * Sizes
 */
const sizes = {
    width: 1440,
    height: 1092
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 6
camera.position.y = -1.5
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// animation
const animation=()=>
{
    mesh.position.y-=0.02
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}
animation()