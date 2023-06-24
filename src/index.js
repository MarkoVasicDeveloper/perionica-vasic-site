import * as THREE from 'three';

import { Stage } from "./js/Stage";

import { onResize } from "./js/onResize";

const { camera, scene, renderer } = Stage();

window.addEventListener('resize', () => onResize(camera, renderer));

function animation() {
    
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame( animation );
}

animation();