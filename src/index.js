import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import screen from '../src/img/screen.png';
import me from '../src/img/me.jpg';

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

const container = document.querySelector('.cliner');
const leftWiper = document.querySelector('.left');
const centerWiper = document.querySelector('.center');
const rightWiper = document.querySelector('.right');

const geometry = new THREE.PlaneGeometry(1, 1.2, 400, 300);
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
    
    glbtLoader.load(hammer, (glb) => {
        glb.scene.scale.set(0.08, 0.08, 0.08);
        glb.scene.position.set(mousePoints.x, mousePoints.y, 1.5);
        glb.scene.rotateX(1);
        scene.add(glb.scene);
    });
});

window.addEventListener('resize', () => onResize(camera, renderer));
const tl = gsap.timeline();
window.addEventListener('click', () => {
    tl.to(scene.children[2].position, {
        setZ: 0.5,
        duration: 0.01
    })
    .to(scene.children[2].rotation, {
        delay: 0.3,
        x: -1,
        duration: 0.1
    })
    .to(scene.children[2].rotation, {
        delay: 0.5,
        x: 1,
        duration: 0.5
    });

    if(material.uniforms.uTransition.value === 0 ) {
        tl.to(material.uniforms.uTransition, {
            duration: 2,
            value: 1,
            ease: "expo.in"
        })
        .to(material.uniforms.uXtransition, {
            duration: 2,
            value: 1,
            ease: "expo.in"
        }, '<=0.2')
        .to(container, {
            delay: 2,
            duration: 5,
            translateX: '-100vw'
        })

        return;
    }

    if(material.uniforms.uTransition.value === 1 ) {
        gsap.to(material.uniforms.uTransition, {
            duration: 1,
            value: 0
        })

        gsap.to(material.uniforms.uXtransition, {
            duration: 1,
            value: 0,
            ease: "expo.in"
        }, '<=1.5')
    }
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