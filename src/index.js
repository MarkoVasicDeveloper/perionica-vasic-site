import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import screen from '../src/img/screen.png';
import pattern from '../src/img/grid.png';

import vertexShader from '../src/js/Shaders/vertexShader.glsl';
import fragmentShader from '../src/js/Shaders/fragmentShader.glsl';
import { gsap } from 'gsap';

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

scene.add(mesh)

window.addEventListener('resize', () => onResize(camera, renderer));
window.addEventListener('click', () => {
    if(material.uniforms.uTransition.value === 0 ) {
        gsap.to(material.uniforms.uTransition, {
            duration: 2,
            value: 1,
            ease: "expo.in"
        })
        gsap.to(material.uniforms.uXtransition, {
            duration: 1,
            value: 1
        })

        return;
    }

    if(material.uniforms.uTransition.value === 1 ) {
        gsap.to(material.uniforms.uTransition, {
        duration: 1,
        value: 0
    })}
})

function animation() {
    material.uniforms.uTime.value = time.getElapsedTime();
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();