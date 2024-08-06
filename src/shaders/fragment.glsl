uniform float u_time;
uniform float u_intensity;
uniform sampler2D u_texture;
varying vec2 vUv;

void main() {
	vec2 uv = vUv;
	vec4 color = texture2D(u_texture, uv);
	color.rgb = pow(color.rgb, vec3(1.0 / 2.2)); // Gamma correction
	gl_FragColor = color;
}