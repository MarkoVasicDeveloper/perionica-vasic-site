import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import screen from '../src/img/screen.png';

import vertexShader from '../src/js/Shaders/vertexShader.glsl';
import fragmentShader from '../src/js/Shaders/fragmentShader.glsl';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import hammerObj from '../static/hammer.glb';
import hdr from '../static/env.hdr';

import { gsap } from 'gsap';
import { mousePoints, raycasterIntercept } from './js/raycaster/raycasterIntercept';
import { changeScreen } from './js/2d/animations/changeScreen/changeScreen';

let time = new THREE.Clock();

const { camera, scene, renderer } = Stage();

const geometry = new THREE.PlaneGeometry(1.2, 1, 400, 200);
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        texture1: { type: 't', value: new THREE.TextureLoader().load(screen)},
        uTime: { type: 'f', value: 0 },
        uTransition: { type: 'f', value: 0},
        uXtransition: { type: 'f', value: 0}
    }
});
const mesh = new THREE.Points(geometry, material);

const positionAttribute = geometry.getAttribute('position');

let directions = [];
let directionsX = [];

function rand (a, b) {
  return a + (b - a) * Math.random();
}

for (let i = 0; i < positionAttribute.count; i++) {
    directions.push(rand(-1.5, -0.9));
    directionsX.push(rand(-1, 1));
};

geometry.setAttribute('direction', new THREE.Float32BufferAttribute(directions, 1));
geometry.setAttribute('directionX', new THREE.Float32BufferAttribute(directionsX, 1));

scene.add(mesh);

const glbtLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

rgbeLoader.load(hdr, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    
    glbtLoader.load(hammerObj, (glb) => {
        glb.scene.scale.set(0.08, 0.08, 0.08);
        glb.scene.position.set(mousePoints.x, mousePoints.y, 1.5);
        glb.scene.rotateX(1);
        scene.add(glb.scene);
    });
});

window.addEventListener('resize', () => onResize(camera, renderer));

window.addEventListener('click', () => {
    changeScreen(scene, material)
    
});

window.addEventListener('mousemove', (event) => {
    raycasterIntercept(event, camera);
    if(scene.children[2]) {
        scene.children[2].position.set(mousePoints.x, mousePoints.y, 1.5);
    }
});

function animation() {
    
    material.uniforms.uTime.value = time.getElapsedTime();
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();