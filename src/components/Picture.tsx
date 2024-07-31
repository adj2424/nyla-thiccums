import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, SRGBColorSpace, MeshBasicMaterial, Vector2, MathUtils } from 'three';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
// import vertexShader from '../shaders/vertex.glsl';
// import fragmentShader from '../shaders/fragment.glsl';

export const Picture = ({ ...props }) => {
	const map = useLoader(TextureLoader, 'test.jpg');
	const [uniforms, setUniforms] = useState<any>(null);
	const materialRef = useRef() as any;
	const mouseLerped = { x: 0, y: 0 };

	map.colorSpace = SRGBColorSpace;

	const cursor = { x: 0, y: 0 };
	useEffect(() => {
		const loader = new THREE.TextureLoader();
		loader.load('test.jpg', loadedTexture => {
			loadedTexture.colorSpace = SRGBColorSpace;
			setUniforms({
				uTexture: { value: loadedTexture },
				uMouse: { value: new Vector2(0, 0) }
			});
		});

		window.addEventListener('mousemove', e => {
			cursor.x = (2 * e.clientX) / window.innerWidth - 1;
			cursor.y = (-2 * e.clientY) / window.innerHeight + 1;
			mouseLerped.x = THREE.MathUtils.lerp(mouseLerped.x, cursor.x, 0.1);
			mouseLerped.y = THREE.MathUtils.lerp(mouseLerped.y, cursor.y, 0.1);
			materialRef.current.uniforms.uMouse.value.x = mouseLerped.x;
			materialRef.current.uniforms.uMouse.value.y = mouseLerped.y;
		});
	}, []);

	// const mouseLerped = useRef({ x: 0, y: 0 });

	// useFrame((state, delta) => {
	// 	const mouse = state.mouse;
	// 	mouseLerped.x = THREE.MathUtils.lerp(mouseLerped.x, mouse.x, 0.1);
	// 	mouseLerped.y = THREE.MathUtils.lerp(mouseLerped.y, mouse.y, 0.1);
	// 	console.log(mouse.x, mouse.y);
	// 	materialRef.current.uniforms.uMouse.value.x = mouseLerped.x;
	// 	materialRef.current.uniforms.uMouse.value.y = mouseLerped.y;
	// });

	const vertex = `uniform float time;
uniform vec2 uMouse;

varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	float dist = distance(circlePosition, uv);
	return 1. - smoothstep(0.0, radius, dist);
}

float elevation(float radius, float intensity) {
	float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
	return circleShape * intensity;
}

void main() {
	vec3 newPosition = position;
	newPosition.z += elevation(0.2, .7);

	csm_Position = newPosition;
	vUv = uv;
}`;

	const frag = `uniform sampler2D uTexture;
uniform vec2 uMouse;
varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
	float dist = distance(circlePosition, uv);
	return 1. - smoothstep(0.0, radius, dist);
}

void main() {
	vec4 finalTexture = texture2D(uTexture, vUv);
	csm_DiffuseColor = finalTexture;
}`;
	return (
		<>
			<mesh position={[0, 0, 0]}>
				<planeGeometry />
				<CustomShaderMaterial
					ref={materialRef}
					baseMaterial={MeshBasicMaterial}
					vertexShader={vertex}
					fragmentShader={frag}
					uniforms={uniforms}
					toneMapped={false}
					silent
				/>
			</mesh>
			{/* <mesh position={props.position}>
				<planeGeometry />
				<meshBasicMaterial map={map} toneMapped={false} />
			</mesh> */}
		</>
	);
};

