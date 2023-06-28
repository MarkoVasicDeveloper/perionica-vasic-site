varying vec2 vUv;
varying vec3 vPos;

uniform float uTime;
uniform float uTransition;
uniform float uXtransition;

attribute float direction;

void main() {
  vUv = uv;
  vPos = position;

  vPos.y = direction;

  vPos = mix(position, vPos, uTransition);

  gl_PointSize = 10.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.);
}