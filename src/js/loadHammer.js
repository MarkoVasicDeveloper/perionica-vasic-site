import * as THREE from 'three';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import hammerObj from '../../static/hammer.glb';
import hdr from '../../static/env.hdr';
import { mousePoints } from './raycaster/raycasterIntercept';

const glbtLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

export function loadHammer (scene) {
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
}