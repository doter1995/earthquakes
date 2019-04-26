import WorldGroup from "./WordSegment";
import QuakeSource from "./QuakeSource";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import "three/examples/js/libs/stats.min.js";
import {
  Group, Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer
} from "three";
import EarthQuakes from "./EarthQuakes";

let renderer = new WebGLRenderer({antialias: true});
let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(400);
let radius: number = 200;

document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

//添加地球仪
let groupSphere = new Group();

let wordGroup = new WorldGroup(radius);
wordGroup.init();
scene.add(wordGroup);
// let qs = new QuakeSource(103.322,31.002,201);
// scene.add(qs);
let earthQuakes = new EarthQuakes()
scene.add(earthQuakes);
let stats = window.Stats();
document.body.appendChild(stats.dom);

let control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = true;

function animate() {
  requestAnimationFrame(animate);

  control.update();
  renderer.render(scene, camera);
  stats.update();
}

animate();
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})