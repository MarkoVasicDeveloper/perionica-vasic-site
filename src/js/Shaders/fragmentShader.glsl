varying vec2 vUv;
varying vec3 vPos;
varying vec2 vCoordinates;

uniform sampler2D texture1;

void main() {
  vec2 myUv = vec2(vCoordinates.x / 512., vCoordinates.y / 512.);
  vec4 image = texture2D(texture1, myUv);

  gl_FragColor = image;
}