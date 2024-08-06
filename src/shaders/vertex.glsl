uniform float u_time;
uniform float u_intensity;
varying vec2 vUv;
void main() {
	vUv = uv;
	 // Apply a wave effect to the vertex positions
	vec3 deformedPosition = position;

	// Combine uv.x and uv.y to create a diagonal wave
	float wave1 = sin((uv.x + uv.y) * 5.0 + u_time) * u_intensity;
	float wave2 = cos((uv.x + uv.y) * 3.0 + u_time) * u_intensity;

	deformedPosition.y += wave1;
	deformedPosition.x += wave2;

    
	gl_Position = projectionMatrix * modelViewMatrix * vec4(deformedPosition, 1.0);
}