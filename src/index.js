import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

import { gsap } from 'gsap';
import { mousePoints, raycasterIntercept } from './js/raycaster/raycasterIntercept';
import { changeScreen } from './js/2d/animations/changeScreen/changeScreen';
import { text } from './misc/text';
import { generateText, removeText } from './misc/textFunction';
import { textures } from './misc/textures';
import { loadHammer } from './js/loadHammer';
import { imageMesh } from './js/imageMesh';
import { rand } from './misc/rand';
import { screenOrientation } from './js/screenOrientation';

let time = new THREE.Clock();
let contentIndex = 0;
export let imgCounter = 0;

const { camera, scene, renderer } = Stage();

const titleContainer = document.getElementById('title');
const subtitleContainer = document.getElementById('subtitle');
const contentTitle = document.getElementById('contentTitle');
const pageContentContainer = document.getElementById('pageContent');

const label = document.querySelector('label');
const loadingContent = document.querySelector('.loadingContent');

loadHammer(scene);

const { material } = imageMesh(scene);

generateText([titleContainer, subtitleContainer,contentTitle, pageContentContainer], 0);
const letters = document.getElementsByClassName('letter');

screen.orientation.addEventListener('change', () => screenOrientation(loadingContent, label));

window.addEventListener('resize', () => onResize(camera, renderer));

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
        contentIndex += 4;
        if(contentIndex > text.length - 1) {
            contentIndex = 0;
            imgCounter = 0;
        };
        
        removeText([titleContainer, subtitleContainer, contentTitle, pageContentContainer]);
        generateText([titleContainer, subtitleContainer, contentTitle, pageContentContainer], contentIndex);
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