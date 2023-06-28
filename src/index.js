import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import screen from '../src/img/screen.png';
import pattern from '../src/img/grid.png';

import vertexShader from '../src/js/Shaders/vertexShader.glsl';
import fragmentShader from '../src/js/Shaders/fragmentShader.glsl';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import hammer from '../static/hammer.glb';
import hdr from '../static/env.hdr';

import { gsap } from 'gsap';
import { mousePoints, raycasterIntercept } from './js/raycaster/raycasterIntercept';

let time = new THREE.Clock();

const { camera, scene, renderer } = Stage();

const geometry = new THREE.PlaneGeometry(2, 2, 700, 400);
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

const glassGeometry = new THREE.PlaneGeometry(2, 2);
const glassMaterial = new THREE.MeshStandardMaterial({transparent: true, map: new THREE.TextureLoader().load(pattern)});
const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
glassMesh.position.setX(-2);

const positionAttribute = geometry.getAttribute('position');

let directions = [];

function rand (a, b) {
  return a + (b - a) * Math.random();
}

for (let i = 0; i < positionAttribute.count; i++) {
    directions.push(rand(-1.5, -0.9));
};

geometry.setAttribute('direction', new THREE.Float32BufferAttribute(directions, 1));

scene.add(glassMesh);

scene.add(mesh);

const glbtLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

rgbeLoader.load(hdr, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    
    glbtLoader.load(hammer, (glb) => {
        const model = glb.scene
        glb.scene.scale.set(0.07, 0.07, 0.07);
        glb.scene.position.set(mousePoints.x, mousePoints.y, 1.5);
        glb.scene.rotateX(1);
        scene.add(glb.scene);
    });
})


window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('click', () => {
    gsap.to(scene.children[3].position, {
        setZ: 0.5,
        duration: 0.01
    });

    gsap.to(scene.children[3].rotation, {
        delay: 0.3,
        x: -1,
        duration: 0.2
    });

    gsap.to(scene.children[3].rotation, {
        delay: 0.5,
        x: 1,
        duration: 0.5
    });

    if(material.uniforms.uTransition.value === 0 ) {
        gsap.to(material.uniforms.uTransition, {
            duration: 2,
            value: 1,
            ease: "expo.in"
        })

        return;
    }

    if(material.uniforms.uTransition.value === 1 ) {
        gsap.to(material.uniforms.uTransition, {
        duration: 1,
        value: 0
    })}
});

window.addEventListener('mousemove', (event) => {
    raycasterIntercept(event, camera);
    if(scene.children[3]) {
        scene.children[3].position.set(mousePoints.x, mousePoints.y, 1.5);
    }
});

function animation() {
    
    material.uniforms.uTime.value = time.getElapsedTime();
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();