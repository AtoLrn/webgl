import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

var camera, scene, renderer;
var boite;
let cylindre;
let cone;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 2000;
camera.position.y = 200;

var texture = new THREE.TextureLoader().load("./../texture/téléchargement.jpg");

let Murs = []


var geometry = new THREE.BoxBufferGeometry(100, 300, 2000);
var material = new THREE.MeshBasicMaterial({ map: texture })
let mur = new THREE.Mesh(geometry, material)

Murs.push(mur)

geometry = new THREE.BoxBufferGeometry(100, 300, 1000);
mur = new THREE.Mesh(geometry, material)
Murs.push(mur)

let tour = new THREE.Group()

Murs.forEach((elem) => {
  tour.add(elem);
})


let toure = createTower(150,500,150)
let toure2 = createTower(120,400,150)



tour.add(toure);
tour.add(toure2)

scene.add(tour)

Murs[0].position.set(0, 150, 2000 / 2 + 170 / 2)


Murs[1].position.set(500, 150, 2000 + 120/2)
Murs[1].rotateY(THREE.Math.degToRad(90))


toure2.position.z = 2000 + 120/2;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xeeeeee);
animate();






function animate() {
  requestAnimationFrame(animate);

  //  tour.rotation.x += 0.005;
  //  tour.rotation.y += 0.01;

  renderer.render(scene, camera);
}


function createTower(largeur, hauteurCylindre, hauteurCone) {
  var texture = new THREE.TextureLoader().load("./../texture/téléchargement.jpg");
  var material = new THREE.MeshBasicMaterial({ map: texture });

  let geometry = new THREE.CylinderGeometry(largeur, largeur, hauteurCylindre, 100);
  let cylindre = new THREE.Mesh(geometry, material);

  geometry = new THREE.ConeGeometry(largeur, hauteurCone, 60);
  let cone = new THREE.Mesh(geometry, material);

  cylindre.position.y = hauteurCylindre/2;
  cone.position.y = hauteurCylindre + hauteurCone/2 ;

  let group = new THREE.Group()

  group.add(cylindre);
  group.add(cone);

  return group;
}

var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 50;
controls.maxDistance = 10000;