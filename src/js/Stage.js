import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function Stage () {
  // const camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, -1, 20 );
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerWidth, 0.1, 3000);
  const scene = new THREE.Scene();

  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  var controls = new OrbitControls( camera, renderer.domElement );
  
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.set(0, 0, 1000);
  controls.update();

  renderer.autoClear = false;
  renderer.setClearColor(new THREE.Color('#000'));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.clearDepth();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(camera)

  return {camera, scene, renderer }
}