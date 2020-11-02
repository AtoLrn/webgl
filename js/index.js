import * as THREE from "./three.js-master/build/three.module.js";

var camera, scene, renderer;
var boite;
let cylindre;
let cone;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 600;
camera.position.y = 100;

var texture = new THREE.TextureLoader().load("./../ThreeJS/téléchargement.jpg");

var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
var material = new THREE.MeshBasicMaterial({ map: texture });

boite = new THREE.Mesh(geometry, material);

geometry = new THREE.CylinderGeometry(150, 150, 300, 100);
cylindre = new THREE.Mesh(geometry, material);

geometry = new THREE.ConeGeometry(200, 150, 60);
cone = new THREE.Mesh(geometry, material);

let tour = new THREE.Group()
//scene.add(boite);
tour.add(cylindre);
tour.add(cone);

scene.add(tour)

cone.position.y = 300 - 75;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xeeeeee);
animate();

function animate() {
  requestAnimationFrame(animate);

  // tour.rotation.x += 0.005;
  // tour.rotation.y += 0.01;

  renderer.render(scene, camera);
}
