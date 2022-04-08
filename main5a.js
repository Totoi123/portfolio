import './style.css'
import * as THREE from 'three';
//import gsap from 'gsap'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//Cursor coordinates
const cursor = {
    x: 0,
    y: 0
}

//sizes variables
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('mousemove', function (event)
{
    //to get (0,0) at object origin
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

//canvas
const canvas = document.querySelector('#c1')
//scene
const scene = new THREE.Scene()

//geometry from scratch - vertices
const geometry = new THREE.BufferGeometry()
//square with 1 subdivision
/* const vertices = new Float32Array( [
	-1, -1,  1,
	 1, -1,  1,
	 1,  1,  1,

	 1,  1,  1,
	-1,  1,  1,
	-1, -1,  1
] ) */

//randomly generated triangle
/* const vertices = new Float32Array( [
	Math.random(), Math.random(), Math.random(),
    Math.random(), Math.random(), Math.random(),
    Math.random(), Math.random(), Math.random()
] ) */

//'count' numbers of random triangles
const count = 400
const vertices = new Float32Array(count * 3 * 3)
// * 3 *3 because will need that many entries for 'count' numbers of triangle
for(let i = 0; i< count * 3 * 3; i++)
{
    vertices[i] = (Math.random() - 0.5) * 12
}

// adding vertices to geometry attribute
// itemSize = 3 because there are 3 values (components) per vertex
const positionsAttribute = new THREE.BufferAttribute( vertices, 3 )
geometry.setAttribute( 'position', positionsAttribute )


//material
const material = new THREE.MeshBasicMaterial({ 
    color: 0xcd0000,
    wireframe: true
})

//change material color with Eventlistener
window.addEventListener("click", randomColor)

function randomColor() {
    // var newColor = 'rgb(' + rando(255) + ',' + rando(255) + ',' + rando(255) + ')'
    material.color.setHex( Math.random() * 0xffffff );
}

//mesh
const mesh = new THREE.Mesh(geometry, material)

//group1
const group1 = new THREE.Group()
group1.add(mesh)
scene.add(group1)

// ### group modification
group1.position.set(0,2,0)

// group1.scale.set(1,1.2,2)

// group1.rotation.reorder('XYZ')
// group1.rotation.x = 0.0


// ### length vector of object wrt origin
// console.log(mesh.position.length())

// ### normalize reduces the distance vector wrt origin and makes it 1
//mesh.position.normalize()


//Window Resize Event Listener to Auto-resize
window.addEventListener('resize', function()
{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Perspective camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.5, 1000)

//Othographic camera
//const camera = new THREE.OrthographicCamera(-1*aspectR, 1*aspectR, 1, -1, 0.1, 100)
// camera.position.z = 3
camera.position.set(-1,2,5)

scene.add(camera)

// camera.lookAt(group1.position)

// ### distance of object from camera
// console.log(mesh.position.distanceTo(camera.position))

//light
//not needed for MeshBasicMaterial
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-5,5,3);

scene.add(pointLight)


//helper
/* const gridHelper = new THREE.GridHelper()
scene.add(gridHelper) */

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//CONTROLS
//const controls = new OrbitControls(camera, renderer.domElement)
const controls = new OrbitControls(camera, canvas)

//clock line 1 -- setting object clock and starting it
const clock = new THREE.Clock()

//gsap animation
// gsap.to(group1.position, { duration: 1, delay: 1, z: -2})

//animate + render
function dance() {
    
    //clock line 2
    const elapsedTime = clock.getElapsedTime()

    // using seconds elapsed to move object makes sure
    //  that movement is uniform in all client systems

    // group1.rotation.x += 0.01
    // group1.rotation.x = elapsedTime
    // group1.rotation.y = elapsedTime
    // group1.rotation.z += 0.005
    // group1.rotation.z = elapsedTime

    //update camera with EVENT LISTENER
    //camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4
    //camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 4
    //invert y for three.js
    //camera.position.y = cursor.y * -1 * 5
    // camera.lookAt(new THREE.Vector3())
    // camera.lookAt(0,0,0)
    camera.lookAt(group1.position)

    requestAnimationFrame(dance)
    
    controls.enableDamping = true
    controls.update()

    //render
    renderer.render(scene, camera)
}

dance()