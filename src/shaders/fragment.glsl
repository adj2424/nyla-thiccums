uniform sampler2D u_texture;
varying vec2 vUv;

void main() {
  vec4 textureColor = texture(u_texture, vUv);  // Sample the texture color
  gl_FragColor = textureColor;
}
