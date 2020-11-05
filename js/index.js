import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import {SVGLoader} from "./three.js-master/examples/jsm/loaders/SVGLoader.js";

var camera, scene, renderer;


scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 2000;
camera.position.y = 200;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener( 'resize', onWindowResize, false );
renderer.setClearColor(0xeeeeee);
const texture = new THREE.TextureLoader().load("./../textures/téléchargement.jpg");

init();
animate();

async function init () {
  

  let Murs = []
  let Tower = []
  
  Tower.push(createTower(350 ,1000,350))
  Tower.push(createTower(180,600,250))
  Tower.push(BigTower())
  Tower.push(createTower(180,600,250))
  Murs.push(createWall(100,2000,600, 20, 50))
  Murs.push(createWall(100,1000,600, 10, 50))
  Murs.push(createWall(100,2000,600, 20, 50))
  Murs.push(createWall(100,3000,600, 40, 50))
  Murs.push(createWall(100,1000,600, 10, 50))
  
  let tour = new THREE.Group()
  
  Murs.forEach((elem) => {
    tour.add(elem);
  })
  

  
  const GreatDoor = new THREE.Group()
const svgLoaded = [await loadFromSVG('./../SVG/toit.svg', './../textures/toit.jpg', 0.001, 0, 1728.5, 0, 1450, 0, 90, 0),
await loadFromSVG('./../SVG/porte.svg', './../textures/wall.jpg', 0.001, 0, 800, 0, 300, 0, 0, 0)
]

const home = createHome()
home.position.set(1000 + 700, 0, 350)
svgLoaded.forEach((tower) => {
  GreatDoor.add(tower)
})
  GreatDoor.scale.y = 0.70
  GreatDoor.position.set(1800, 0, 2000)
  scene.add(GreatDoor)


  // build the gate's towers

  Tower.push(createTower(250 ,1000,350))
  Tower.push(createTower(250 ,1000,350))
  Tower.forEach((tower) => {
    scene.add(tower)
  })
  scene.add(tour)
  scene.add(home)
  
  Murs[0].position.set(0, 300, 2000 / 2 + 170 / 2)
  Murs[1].position.set(500, 300, 2000 + 180/2)
  Murs[1].rotateY(THREE.Math.degToRad(90))
  
  Murs[2].position.set(3500, 300, 2000/2 + 170/2)
  Murs[2].rotateY(THREE.Math.degToRad(180))
  
  Murs[3].position.set(3500/2, 300, 0)
  Murs[3].rotateY(THREE.Math.degToRad(-90))
  
  Murs[4].position.set(3500 - 1000/2, 300, 2000 + 180/2)
  Murs[4].rotateY(THREE.Math.degToRad(90))
  
  Tower[1].position.z = 2000 + 180/2;
  Tower[2].position.setX(3500)
  Tower[3].position.setX(3500)
  Tower[3].position.setZ(2000 + 180/2)

  Tower[4].position.set(1200, 0, 2200)
  Tower[5].position.set(2400, 0, 2200)

  scene.add(buildGround());
}



// texturee = new THREE.TextureLoader().load( 'textures/pierre.jpg' ); //mur
// textureWindows = new THREE.TextureLoader().load( 'textures/window.jpg' ); //fenetres
// textureWall = new THREE.TextureLoader().load( 'textures/wall.jpg' ); //mur maison
// var toit = new THREE.TextureLoader().load( 'textures/toit.jpg' ); // toit
// var escalier = new THREE.TextureLoader().load( 'textures/escalier.jpg' ); //escalier
// var tdoor = new THREE.TextureLoader().load( 'textures/porte.jpg' ); //porte


/*
   ______          __          _            __   ____                 __  _
  /_  __/__  _____/ /_  ____  (_)________ _/ /  / __/_  ______  _____/ /_(_)___  ____  _____
   / / / _ \/ ___/ __ \/ __ \/ / ___/ __ `/ /  / /_/ / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  / / /  __/ /__/ / / / / / / / /__/ /_/ / /  / __/ /_/ / / / / /__/ /_/ / /_/ / / / (__  )
 /_/  \___/\___/_/ /_/_/ /_/_/\___/\__,_/_/  /_/  \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
 */
const createStairs = () => {
  let group = new THREE.Group()
  const texture = getTexture('./../textures/crate.gif', 1)

  let x= - 200;
  let hauteur = -1100;

  for(let i = 1; i <13 ; i++){

      x+= 50;

      hauteur += 30;

      if( i==12){

        x+=50;

        var geometryc = new THREE.BoxGeometry( 150, 30*i, 50 );
        var boxeclone = new THREE.Mesh( geometryc, texture);

        boxeclone.position.set(-x,hauteur/2,0);
        group.add(boxeclone);
      }else {

        var geometryc = new THREE.BoxGeometry( 50, 30*i, 50 );
        var boxeclone = new THREE.Mesh( geometryc, texture);

        boxeclone.position.set(-x,hauteur/2,0);
        group.add(boxeclone);
      }
  }

  return group
}

const createDoor = () => {
  var geometrydoor = new THREE.BoxBufferGeometry( 100, 120, 1 );
  return new THREE.Mesh( geometrydoor , getTexture('./../textures/porte.jpg', 1) );
  
} 

const createWindow = () => {
  let group = new THREE.Group() 
  let geometrywindow = new THREE.BoxBufferGeometry( 100, 70, 1 );
  let windows = new THREE.Mesh( geometrywindow, getTexture('./../textures/window.jpg', 1) );
  let x = 500;
  let y = 350;
  let z = 702;

  for(let i = 0; i < 2; i++){

      y -= 250;

      for (let j = 3; j > i; j--) {


        let tClone = windows.clone();
        tClone.position.set(x, y, 0);

        group.add(tClone);

        x -= 500;

      }

      x = 500;
  }

  return group
}


function createHome () {
  let group = new THREE.Group() 
  const geometry = new THREE.BoxGeometry( 1400, 600, 700 );


  let box = new THREE.Mesh( geometry, getTexture('./../textures/mur.jpg', 1));
  box.position.set(0,300,0)
  group.add(box)

  var geometryboxe = new THREE.BoxGeometry( 1400, 475, 30 );
  let roof1 = new THREE.Mesh( geometryboxe, getTexture('./../textures/mur.jpg', 1) );
  roof1.position.set(0 , 700 , 175.5 - 350);
  roof1.rotateX(THREE.Math.degToRad(52));

  let roof2 = roof1.clone();
  roof2.position.set(0 , 700 , 540 - 350);

  roof2.rotateX(THREE.Math.degToRad(-104));
  
  let windows = createWindow()
  windows.position.set(0, 600 - 250, 350)

  let stairs = createStairs()
  stairs.position.set(100, 550, 350)

  let door = createDoor()
  door.position.set(-350, 430, 350)

  group.add(door)
  group.add(stairs)
  group.add(windows)
  group.add(roof1)
  group.add(roof2)
  return group
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function getTexture(path, ratio){
  let loadedTexture = new THREE.TextureLoader().load( path );
  loadedTexture.wrapS = loadedTexture.wrapT = THREE.RepeatWrapping;
  loadedTexture.repeat.set( ratio, ratio );

  return new THREE.MeshBasicMaterial( {map: loadedTexture } )
}

function buildGround(){
  let GroundMaterial = getTexture('./../textures/sol.jpg', 1);


  let GroundGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 10000);


  let ground = new THREE.Mesh(GroundGeometry, GroundMaterial);
  ground.material.side = THREE.DoubleSide;
  ground.position.set(0 ,0,0);
  ground.rotateX(THREE.Math.degToRad(90));
  return ground;
}


function createWall(largeur, longeur, hauteur, nbCrenaux, hauteurCreneaux) {

  const tailleCreneaux = longeur / nbCrenaux

  const texture = getTexture("./../textures/wall.jpg", 1)
  let mur = new THREE.Group()
  let geometry = new THREE.BoxBufferGeometry(largeur/3, hauteurCreneaux, tailleCreneaux);
  for (let i = 0; i<nbCrenaux; i++){
    
    let creneaux = new THREE.Mesh(geometry, texture)
    creneaux.position.set(-largeur/3 , hauteur / 2 + hauteurCreneaux / 2, (tailleCreneaux * i) - longeur / 2)
    i++
    mur.add(creneaux)
  }
  geometry = new THREE.BoxBufferGeometry(largeur, hauteur, longeur);

  mur.add(new THREE.Mesh(geometry, texture))
  return mur
}

function BigTower(){
  var material = new THREE.MeshBasicMaterial({ map: texture });

  let Bigtower_level_1_Geometry = new THREE.CylinderBufferGeometry(400, 400, 1600, 60);
  let Bigtower_level_2_Geometry = new THREE.CylinderBufferGeometry(600, 400, 200, 60);
  let Bigtower_level_3_Geometry = new THREE.CylinderBufferGeometry(600, 600, 500, 60);
  let Bigtower_level_4_Geometry = new THREE.CylinderBufferGeometry(200, 600, 250, 60);
  let Bigtower_level_5_Geometry=  new THREE.ConeBufferGeometry(200, 200, 60);

  
  let Bigtower_level_1 = new THREE.Mesh(Bigtower_level_1_Geometry, getTexture("./../textures/wall.jpg", 1));
  let Bigtower_level_2 = new THREE.Mesh(Bigtower_level_2_Geometry, getTexture("./../textures/crate.gif", 1));
  let Bigtower_level_3 = new THREE.Mesh(Bigtower_level_3_Geometry, getTexture("./../textures/toit.jpg", 2));
  let Bigtower_level_4 = new THREE.Mesh(Bigtower_level_4_Geometry, getTexture("./../textures/toit.jpg", 2));
  let Bigtower_level_5 = new THREE.Mesh(Bigtower_level_5_Geometry, getTexture("./../textures/wall.jpg", 1));

  Bigtower_level_1.position.setY(800);
  Bigtower_level_2.position.setY(2100-400);
  Bigtower_level_3.position.setY(2450-400);
  Bigtower_level_4.position.setY(2825-400);
  Bigtower_level_5.position.setY(3050-400);

  let towerPattern = new THREE.Group();
  towerPattern.add(Bigtower_level_1);
  towerPattern.add(Bigtower_level_2);
  towerPattern.add(Bigtower_level_3);
  towerPattern.add(Bigtower_level_4);
  towerPattern.add(Bigtower_level_5);
  towerPattern.position.set(0, 0, 0);

  return towerPattern
}
function createTower(largeur, hauteurCylindre, hauteurCone) {
  

  let geometry = new THREE.CylinderGeometry(largeur, largeur, hauteurCylindre, 100);
  let cylindre = new THREE.Mesh(geometry, getTexture("./../textures/wall.jpg", 1));

  geometry = new THREE.ConeGeometry(largeur, hauteurCone, 60);
  let cone = new THREE.Mesh(geometry, getTexture("./../textures/toit.jpg", 1));

  cylindre.position.y = hauteurCylindre/2;
  cone.position.y = hauteurCylindre + hauteurCone/2 ;

  let group = new THREE.Group()

  group.add(cylindre);
  group.add(cone);

  return group;
}

async function loadFromSVG(path, texture, ratio, x, y, z, depth, rotX, rotY, rotZ){

  const promise = new Promise((resolve, _reject) => {
      // load a SVG resource
      const svgLoader = new SVGLoader();
      svgLoader.load(path,
          // called when the resource is loaded
          function ( data ) {

              const paths = data.paths;

              let shapes = [];

              for ( let i = 0; i < paths.length; i ++ ) {

                  Array.prototype.push.apply( shapes, paths[ i ].toShapes(true) );

              }

              let extrusionSettings = {
                  depth: depth
              };

              let doorGeometry = new THREE.ExtrudeBufferGeometry( shapes, extrusionSettings );
              doorGeometry.center();

              let obj = new THREE.Mesh( doorGeometry, getTexture(texture, ratio) );
              obj.scale.y *= - 1;
              obj.position.set(x, y, z);
              obj.rotateX(THREE.Math.degToRad(rotX));
              obj.rotateY(THREE.Math.degToRad(rotY));
              obj.rotateZ(THREE.Math.degToRad(rotZ));

              resolve(obj);

          }
      );
  })
  return await promise;
}

var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 50;
controls.maxDistance = 10000;