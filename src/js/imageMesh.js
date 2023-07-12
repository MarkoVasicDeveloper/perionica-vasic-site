import * as THREE from 'three';

import vertexShader from '../js/Shaders/vertexShader.glsl';
import fragmentShader from '../js/Shaders/fragmentShader.glsl';
import { rand } from '../misc/rand';
import { textures } from '../misc/textures';
import { imgCounter } from '..';

export function imageMesh (scene) {
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

        directions.setX(index, rand(-1000, -650));
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
  scene.add(mesh);

  return { material }
}