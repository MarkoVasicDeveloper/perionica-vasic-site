import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import vertexShader from '../src/js/Shaders/vertexShader.glsl';
import fragmentShader from '../src/js/Shaders/fragmentShader.glsl';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import hammerObj from '../static/hammer.glb';
import hdr from '../static/env.hdr';

import { gsap } from 'gsap';
import { mousePoints, raycasterIntercept } from './js/raycaster/raycasterIntercept';
import { changeScreen, hammerTimeline } from './js/2d/animations/changeScreen/changeScreen';
import { text } from './misc/text';
import { generateText, removeText } from './misc/textFunction';
import { textures } from './misc/textures';

let time = new THREE.Clock();
let contentIndex = 0;
let imgCounter = 0;

const { camera, scene, renderer } = Stage();

const titleContainer = document.getElementById('title');
const subtitleContainer = document.getElementById('subtitle');
const pageContentContainer = document.getElementById('pageContent');

const glbtLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

rgbeLoader.load(hdr, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    
    glbtLoader.load(hammerObj, (glb) => {
        glb.scene.scale.set(30, 30, 30);
        glb.scene.position.set(mousePoints.x, mousePoints.y, 20);
        glb.scene.rotateX(1);
        scene.add(glb.scene);
    });
});

const geometry = new THREE.BufferGeometry();

  let points = 512 * 384;

  let positions = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  let coordinates = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
  let directions = new THREE.BufferAttribute(new Float32Array(points), 1);
  let directionsX = new THREE.BufferAttribute(new Float32Array(points), 1);
  let speed = new THREE.BufferAttribute(new Float32Array(points), 1);

  let index = 0;
  for (let i = 0; i < 512; i++) {
      let posX = i;
      for (let j = 0; j < 384; j++) {
        positions.setXYZ(index, posX * 2, (j - 256) * 2, -100);
        coordinates.setXYZ(index, i, j * 1.3, -100);

        directions.setX(index, rand(-1000, -550));
        directionsX.setX(index, rand(-10, 10));
        speed.setX(index, rand(0.1, 100));
        index++
      }
  };

  geometry.setAttribute('position', positions);
  geometry.setAttribute('aCoordinates', coordinates);
  geometry.setAttribute('direction', directions);
  geometry.setAttribute('directionX', directionsX);
  geometry.setAttribute('aSpeed', speed);

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        texture1: { type: 't', value: textures[imgCounter]},
        uTime: { type: 'f', value: 0 },
        uTransition: { type: 'f', value: 0},
        uXtransition: { type: 'f', value: 0}
    }
});
const mesh = new THREE.Points(geometry, material);

function rand (a, b) {
  return a + (b - a) * Math.random();
}

scene.add(mesh);

window.addEventListener('resize', () => onResize(camera, renderer));


generateText([titleContainer, subtitleContainer, pageContentContainer], 0);

const letters = document.getElementsByClassName('letter');

window.addEventListener('click', () => {
    [...letters].forEach(letter => {
        gsap.to(letter, {
            delay: 1.5,
            duration: Math.random(),
            y: window.innerHeight - letter.getBoundingClientRect().bottom,
            x: rand(-10, 10),
            rotate: rand(0, 360)
        })
    });

    changeScreen(scene, material);
    setTimeout(() => {
        imgCounter++;
        contentIndex += 3;
        if(contentIndex > text.length - 1) {
            contentIndex = 0;
            imgCounter = 0;
        };
        
        removeText([titleContainer, subtitleContainer, pageContentContainer]);
        generateText([titleContainer, subtitleContainer, pageContentContainer], contentIndex);
    }, 10000);
});

window.addEventListener('mousemove', (event) => {
    raycasterIntercept(event, camera);
    if(scene.children[2]) {
        scene.children[2].position.set(mousePoints.x, mousePoints.y, 20);
    }
});

function animation() {
    
    material.uniforms.uTime.value = time.getElapsedTime();
    material.uniforms.texture1.value = textures[imgCounter];
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();