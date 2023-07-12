import * as THREE from 'three';

import t1 from '../img/cleaning.jpg';
import t2 from '../img/car-washing.jpg'
import t3 from '../img/deep-cleaning.webp';
import t4 from '../img/truck-washing.jpg';
import t5 from '../img/carpet-cleaning.jpg';

const textureLoader = new THREE.TextureLoader();

export const textures = [
  textureLoader.load(t1),
  textureLoader.load(t2),
  textureLoader.load(t3),
  textureLoader.load(t4),
  textureLoader.load(t5)
]