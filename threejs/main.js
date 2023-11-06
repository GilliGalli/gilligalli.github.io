import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)

const boxGeo = new THREE.BoxGeometry( 0.8, 1, 0.8 );
const material = new THREE.MeshLambertMaterial({color:0xff0000});
const cube = new THREE.Mesh( boxGeo, material );
cube.castShadow = true;
cube.position.y -= 0.4

const circleGeo = new THREE.SphereGeometry(0.5);
const circleMaterial = new THREE.MeshLambertMaterial({color:0xfcba03});
const circle = new THREE.Mesh(circleGeo, circleMaterial);
circle.castShadow = true;
circle.position.y += 0.5;

const tossiTexture = new THREE.TextureLoader().load('tossi.png')
// það var erfiðara en ég hefði haldið að texture mappa rétt
const coneGeo = new THREE.ConeGeometry(0.35, 1, 128);
const coneMaterial = new THREE.MeshStandardMaterial({map:tossiTexture, shininess:0, wireframe:false});
const cone = new THREE.Mesh(coneGeo, coneMaterial);
cone.castShadow = true;
cone.rotation.y = 3
cone.position.y += 1.45;

const group = new THREE.Group();

group.add(cube);
group.add(circle);
group.add(cone);

const planeGeo = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({color:0x0000ff});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.material.side = THREE.DoubleSide;
plane.receiveShadow = true;
plane.position.y -= 1
plane.rotation.x = Math.PI / 2;
scene.add(plane);
group.castShadow = true;
group.position.y -= 0.09
scene.add( group );

const ljos = new THREE.DirectionalLight(0xffffff, 5);
const helper = new THREE.DirectionalLightHelper( ljos, 2 );
ljos.castShadow = true;
ljos.position.set(5, 5, 15)
ljos.rotation.x += 1
ljos.shadow.mapSize.width = 1024;
ljos.shadow.mapSize.height = 1024;

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
/* scene.add( helper ); */


ljos.shadow.mapSize.width = 512; // default
ljos.shadow.mapSize.height = 512; // default
ljos.shadow.camera.near = 0.1;
ljos.shadow.camera.far = 1000;

const hjelper = new THREE.CameraHelper( ljos.shadow.camera );
/* scene.add( hjelper ); */

scene.add(ljos);

addEventListener("resize", (event) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var tala = 0;
var tala2 = 100;

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    group.rotation.x += 0.035;
    group.rotation.z += 0.035;
   /*  let talan = tala2.toString()[tala2.toString().length - 3]
    if(tala%2==0) {
        group.position.y += 5;
    }else {
        group.position.y -= 5;
    }if (talan%2==0) {
        group.scale.x += 1;
    }else {
        group.scale.x -= 1;
    }console.log(talan)
    tala++
    tala2++; 
    þetta hérna stöff er rusl*/
    renderer.render(scene, camera);
}
animate();