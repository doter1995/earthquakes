import * as THREE from "three";

let renderer = new THREE.WebGLRenderer({antialias:true});
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.z -= 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();