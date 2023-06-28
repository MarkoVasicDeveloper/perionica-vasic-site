import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
export const mousePoints = new THREE.Vector2();

export function raycasterIntercept (event, camera) {
  const test = new THREE.Mesh(
        new THREE.PlaneGeometry(2000,2000),
        new THREE.MeshBasicMaterial()
    )

    const clientX = event.clientX || event.changedTouches[0].clientX;
    const clientY = event.clientY || event.changedTouches[0].clientY;

    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects([test]);

    mousePoints.x = intersects[0].point?.x;
    mousePoints.y = intersects[0].point?.y;
}