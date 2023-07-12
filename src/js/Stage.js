import * as THREE from 'three';

export function Stage () {
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerWidth, 0.1, 3000);
  const scene = new THREE.Scene();

  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, 1000);

  renderer.autoClear = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.clearDepth();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(camera)

  return {camera, scene, renderer }
}