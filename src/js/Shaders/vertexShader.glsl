varying vec2 vUv;
varying vec3 vPos;
varying vec2 vCoordinates;

uniform float uTransition;
uniform float uXtransition;

attribute float direction;
attribute float directionX;
attribute vec3 aCoordinates;
attribute float aSpeed;

void main() {
  vUv = uv;
  vPos = position;

  vPos.y = direction;
  vPos.x += directionX * uXtransition * aSpeed;

  vPos = mix(position, vPos, uTransition);

  vCoordinates = aCoordinates.xy;

  vec4 mvPosition = modelViewMatrix * vec4(vPos, 1.);
  gl_PointSize = 3500. * (1. / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}