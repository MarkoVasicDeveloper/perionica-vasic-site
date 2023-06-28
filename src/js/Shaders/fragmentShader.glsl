varying vec2 vUv;
varying vec3 vPos;

uniform sampler2D texture1;

void main() {
  vec4 image = texture2D(texture1, vUv);

  gl_FragColor = image;
}