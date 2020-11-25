import * as THREE from "./three.js-master/build/three.module.js";
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { GUI } from './three.js-master/examples/jsm/libs/dat.gui.module.js';
import {SVGLoader} from "./three.js-master/examples/jsm/loaders/SVGLoader.js";

var camera, scene, renderer;


scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  110000
);
camera.position.z = 2000;
camera.position.y = 200;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener( 'resize', onWindowResize, false );
renderer.setClearColor(0xeeeeee);

const params = {
  Torches: true,
};


const gui = new GUI();
gui.add(params, 'Torches').name('Activer torches')

const TorcheLight = []

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
const svgLoaded = [await loadFromSVG('./SVG/toit.svg', './textures/toit.jpg', 0.001, 0, 1728.5, 0, 1450, 0, 90, 0),
await loadFromSVG('./SVG/porte.svg', './textures/wall.jpg', 0.001, 0, 800, 0, 300, 0, 0, 0)
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

  const light = new THREE.AmbientLight( 0x404040, 0.8 ); // soft white light
  scene.add( light );

  const Trees = createTree(5)


  Trees.forEach((tree) => {
    scene.add(tree)
  })

  console.log(Trees[0])
  Trees[0].position.set(500, 0, 500)
  Trees[1].position.set(2500, 0, 1500)
  Trees[2].position.set(2000, 0, 1000)
  Trees[3].position.set(500, 0, 1800)
  Trees[4].position.set(3000, 0, 500)


  const Torches = []
  
  Torches.push(createTorche(15, 15, 50, TorcheLight), 
  createTorche(15, 15, 50, TorcheLight), 
  createTorche(15, 15, 50, TorcheLight), 
  createTorche(15, 15, 50, TorcheLight), 
  createTorche(15, 15, 50, TorcheLight))

  Torches[0].position.set(255,250,255)
  Torches[0].rotateY(THREE.Math.degToRad(45))

  Torches[1].position.set(140,250,1970)
  Torches[1].rotateY(THREE.Math.degToRad(45))

  Torches[2].position.set(3350,250,1970)
  Torches[2].rotateY(THREE.Math.degToRad(45))

  Torches[3].position.set(3200,250,280)
  Torches[3].rotateY(THREE.Math.degToRad(45))

  Torches[4].position.set(2510,250,1900)

  Torches.forEach((torche) => {
    scene.add(torche)
  })

  //scene.add(buildGround());
  scene.add(buildSkyBox());
}

function animate() {
  if (params.Torches) {
    TorcheLight.forEach((light) => {
      if (Math.random() > 0.5) {
        if (light.intensity > 1) {
          light.intensity = light.intensity - 0.1
        }
      } else {
        if (light.intensity < 5) {
          light.intensity = light.intensity + 0.1
        }
      }
      
    })
  } else {
    TorcheLight.forEach((light) => {
      light.intensity = 0
    })
  }
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
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
 
function buildSkyBox(){

  let materialArray = [];

  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_ft.jpg') }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_bk.jpg') }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_up.jpg') }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_dn.jpg') }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_rt.jpg') }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './textures/cocoa_lf.jpg') }));

  for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;

  let skyboxGeo = new THREE.BoxBufferGeometry( 100000, 100000, 100000);
  let ground = new THREE.Mesh(skyboxGeo, materialArray);

  ground.position.setY(3000);

  return ground;
}

const createTorche = (x, y, height, groupLight) => {
  const group = new THREE.Group()
  
  let torche = new THREE.BoxGeometry( x, height, y );
  const texture = getTexture("./textures/wall.jpg", 1)
  torche = new THREE.Mesh( torche, texture);

  torche.position.y = height/2

  const sphere = new THREE.SphereBufferGeometry( 8, 16, 8 );
  const spotLight = new THREE.PointLight( 0xfa9947 );
   spotLight.penumbra = 0.01;
   spotLight.decay = 2;
   spotLight.distance = 1000;
   spotLight.intensity = 4;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 128;
  spotLight.shadow.mapSize.height = 128;
  spotLight.shadow.camera.near = 0.5;
  spotLight.shadow.camera.far = 1000;
  spotLight.shadow.focus = 0.1;

  spotLight.position.set(0, height+10, 0)

  spotLight.add(new THREE.Mesh( sphere, new THREE.MeshPhongMaterial( { color: 0xfa9947 } ) ) )
  groupLight.push(spotLight)
  group.add( spotLight );

  group.add(torche);

  return group
}

const createStairs = () => {
  let group = new THREE.Group()
  const texture = getTexture('./textures/crate.gif', 1)

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
  const mesh = new THREE.Mesh( geometrydoor , getTexture('./textures/porte.jpg', 1) );
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh
  
} 

const createWindow = () => {
  let group = new THREE.Group() 
  let geometrywindow = new THREE.BoxBufferGeometry( 100, 70, 1 );
  let windows = new THREE.Mesh( geometrywindow, getTexture('./textures/window.jpg', 1) );
  let x = 500;
  let y = 350;

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


  let box = new THREE.Mesh( geometry, getTexture('./textures/mur.jpg', 1));
  box.position.set(0,300,0)
  group.add(box)

  var geometryboxe = new THREE.BoxGeometry( 1400, 475, 30 );
  let roof1 = new THREE.Mesh( geometryboxe, getTexture('./textures/mur.jpg', 1) );
  roof1.position.set(0 , 700 , 175.5 - 350);
  roof1.rotateX(THREE.Math.degToRad(52));

  let roof2 = roof1.clone();
  roof2.position.set(0 , 700 , 540 - 350);

  roof2.rotateX(THREE.Math.degToRad(-104));
  
  let windows = createWindow()
  windows.position.set(0, 600 - 250, 350)

  let stairs = createStairs()
  stairs.position.set(100, 550, 375)

  let door = createDoor()
  door.position.set(-350, 430, 350)



  roof2.castShadow = true;
  roof2.receiveShadow = true;

  roof1.castShadow = true;
  roof1.receiveShadow = true;

  windows.castShadow = true;
  windows.receiveShadow = true;

  stairs.receiveShadow = true;
  stairs.castShadow = true;

  door.receiveShadow = true;
  door.castShadow = true;

  group.add(door)
  group.add(stairs)
  group.add(windows)
  group.add(roof1)
  group.add(roof2)
  return group
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

  return new THREE.MeshPhongMaterial( {map: loadedTexture, flatShading: true } )
}

function buildGround(){
  let GroundMaterial = getTexture('./textures/sol.jpg', 5);


  let GroundGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 10000);


  let ground = new THREE.Mesh(GroundGeometry, GroundMaterial);
  ground.receiveShadow = true;
  ground.material.side = THREE.DoubleSide;
  ground.position.set(0 ,0,0);
  ground.rotateX(THREE.Math.degToRad(90));
  return ground;
}

function createTronc(x, y, z, size, height){

  const textureT = new THREE.TextureLoader().load( './textures/tronc.jpg' ); //tronc

  //tronc
  const geometryT = new THREE.CylinderBufferGeometry( size, 50, height, 50 );
  const materialT = new THREE.MeshPhongMaterial( { map: textureT} );
  const tronc = new THREE.Mesh( geometryT, materialT );
  tronc.receiveShadow = true;
  tronc.castShadow = true;
  tronc.position.set(x,y,z);
  scene.add( tronc );

  return tronc;

}

function createGuirlande(x, y, z, nb, size){

  let materialG;
  const group = new THREE.Group()

  y = ( y - 500 ) / 4 ;

  for(let j = 0; j < nb ; j++){

      const geometryG = new THREE.TorusKnotBufferGeometry( size, 2, 400, 50, 7, 1 );

      var color = getRandomInt(nb);

      if( color <= (nb/3)){
          materialG = new THREE.MeshPhongMaterial( { color: 0xFF2D00, emissive:  0xFF2D00 } );
      } else if( color <= (nb/3 + nb/3)){
          materialG = new THREE.MeshPhongMaterial( { color: 0xffff00, emissive:  0xffff00 } );
      } else {
          materialG = new THREE.MeshPhongMaterial( { color: 0x46A7EA, emissive:  0x46A7EA } );
      }

      var guirlande = new THREE.Mesh( geometryG, materialG );
      guirlande.rotateX(THREE.Math.degToRad(90));

      guirlande.castShadow = true;

      guirlande.position.set(x,y,z);
      group.add( guirlande );


      y += 90;
      size -=20;


      if(j == nb - 1){
        const light = new THREE.PointLight( 0xffff00, 2, 200 );
        light.position.set( x, y, z );
        group.add( light );
      }
  }

  return group;
}
function createTree(number) {
  const Trees = []
  for(let i = 0; i<number; i++) {
    let tree = new THREE.Group();
    const branches = createbranch(0, 200, 0)
    branches.position.y = 120
    const tronc = createTronc(0, 25, 0, 50, 120)
    tronc.position.y = 60
    const guirlande = createGuirlande(0, 1200, 0, 6, 110)
    tree.add( branches );
    tree.add( tronc );
    tree.add( guirlande );
    Trees.push(tree)
  }
  return Trees
}

function createbranch(y){
  //textures
  const textureB = new THREE.TextureLoader().load( './textures/branch.jpg' ); 
  //branches de l'arbre
  var materialB = new THREE.MeshPhongMaterial( { map: textureB, dithering: true} );

  const group = new THREE.Group()

  let radius = 200;
  let height = 200;

  for(let i = 0; i < 10 ; i++){

      y += 100;
      height -= 15;

      const geometryB = new THREE.ConeBufferGeometry( radius, height, 15 );
      var branch = new THREE.Mesh( geometryB, materialB );
      branch.castShadow = true;
      branch.receiveShadow = true;

      branch.position.set(0,y/2,0);
      group.add(branch);

      radius -= 20;

  }
  return group
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createWall(largeur, longeur, hauteur, nbCrenaux, hauteurCreneaux) {

  const tailleCreneaux = longeur / nbCrenaux

  const texture = getTexture("./textures/wall.jpg", 1)
  let mur = new THREE.Group()
  let geometry = new THREE.BoxBufferGeometry(largeur/3, hauteurCreneaux, tailleCreneaux);
  for (let i = 0; i<nbCrenaux; i++){
    
    let creneaux = new THREE.Mesh(geometry, texture)
    creneaux.receiveShadow = true;
    creneaux.castShadow = true;
    creneaux.position.set(-largeur/3 , hauteur / 2 + hauteurCreneaux / 2, (tailleCreneaux * i) - longeur / 2)
    i++
    mur.add(creneaux)
  }
  geometry = new THREE.BoxBufferGeometry(largeur, hauteur, longeur);

  const murbase = new THREE.Mesh(geometry, texture)
  murbase.receiveShadow = true;
  murbase.castShadow = true;

  mur.add(murbase)

  return mur
}

function BigTower(){
  let Bigtower_level_1_Geometry = new THREE.CylinderBufferGeometry(400, 400, 1600, 60);
  let Bigtower_level_2_Geometry = new THREE.CylinderBufferGeometry(600, 400, 200, 60);
  let Bigtower_level_3_Geometry = new THREE.CylinderBufferGeometry(600, 600, 500, 60);
  let Bigtower_level_4_Geometry = new THREE.CylinderBufferGeometry(200, 600, 250, 60);
  let Bigtower_level_5_Geometry=  new THREE.ConeBufferGeometry(200, 200, 60);

  
  let Bigtower_level_1 = new THREE.Mesh(Bigtower_level_1_Geometry, getTexture("./textures/wall.jpg", 1));
  let Bigtower_level_2 = new THREE.Mesh(Bigtower_level_2_Geometry, getTexture("./textures/crate.gif", 1));
  let Bigtower_level_3 = new THREE.Mesh(Bigtower_level_3_Geometry, getTexture("./textures/toit.jpg", 2));
  let Bigtower_level_4 = new THREE.Mesh(Bigtower_level_4_Geometry, getTexture("./textures/toit.jpg", 2));
  let Bigtower_level_5 = new THREE.Mesh(Bigtower_level_5_Geometry, getTexture("./textures/wall.jpg", 1));

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
  

  let geometry = new THREE.CylinderGeometry(largeur, largeur, hauteurCylindre, 60);
  let cylindre = new THREE.Mesh(geometry, getTexture("./textures/wall.jpg", 1));

  geometry = new THREE.ConeGeometry(largeur, hauteurCone, 60);
  let cone = new THREE.Mesh(geometry, getTexture("./textures/toit.jpg", 1));

  cylindre.position.y = hauteurCylindre/2;
  cone.position.y = hauteurCylindre + hauteurCone/2 ;

  let group = new THREE.Group()

  cylindre.receiveShadow = true;
  cylindre.castShadow = true;

  cone.receiveShadow = true;
  cone.castShadow = true;

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
              obj.receiveShadow = true;
              obj.castShadow = true;
            

              resolve(obj);

          }
      );
  })
  return await promise;
}

var controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 10000;