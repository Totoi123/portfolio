import './style.css'
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//canvas
const canvas = document.querySelector('#c1')
//scene
const scene = new THREE.Scene()


//group1
const group1 = new THREE.Group()

//geometries to go to group
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshStandardMaterial({ color: 0xcd2323 })
)

const planeGeometry = new THREE.PlaneGeometry(17,17)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x523f3c, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true;
plane.position.set(0,-0.2,0)
plane.rotation.x = Math.PI /2

mesh.castShadow = true
group1.add(mesh)

//add to scene
scene.add(group1, plane)


// ### group modification
group1.position.set(1.2,1,1)

group1.scale.set(1,0.2,2)

// group1.rotation.reorder('XYZ')
// group1.rotation.x = 0



// ### length vector of object wrt origin
// console.log(mesh.position.length())

// ### normalize reduces the distance vector wrt origin and makes it 1
//mesh.position.normalize()


//sizes variables
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//event listener to auto resize window
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

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000)
// camera.position.z = 3
camera.position.set(-1, 0.6, 6)

scene.add(camera)

camera.lookAt(group1.position)

// ### distance of object from camera
// console.log(mesh.position.distanceTo(camera.position))

//light
//not needed for MeshBasicMaterial
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-5,5,3);
pointLight.castShadow = true

scene.add(pointLight)


//helper
// const gridHelper = new THREE.GridHelper()
// scene.add(gridHelper)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true


//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


//animate + render
function animate() {
  requestAnimationFrame(animate);

  group1.rotation.x += 0.01;
  group1.rotation.y += 0.01;
  group1.rotation.z += 0.005;

  controls.enableDamping = true
  controls.update();

  //render
  renderer.render(scene, camera);
}

animate()