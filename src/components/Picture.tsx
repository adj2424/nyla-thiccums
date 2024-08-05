import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, SRGBColorSpace, MeshBasicMaterial, Vector2, MathUtils } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

export const Picture = ({ ...props }) => {
	const [texture] = useLoader(TextureLoader, ['test.jpg']);
	const map = useLoader(TextureLoader, 'test.jpg');
	const materialRef = useRef() as any;

	texture.colorSpace = SRGBColorSpace;

	// useEffect(() => {
	// 	const loader = new THREE.TextureLoader();
	// 	loader.load('test.jpg', loadedTexture => {
	// 		loadedTexture.colorSpace = SRGBColorSpace;
	// 		setUniforms({
	// 			uTexture: { value: loadedTexture },
	// 			uMouse: { value: new Vector2(0, 0) }
	// 		});
	// 	});
	const text = useLoader(TextureLoader, 'test.jpg');
	const uniforms = useMemo(
		() => ({
			u_time: {
				value: 0.0
			},
			u_texture: { value: texture }
		}),
		[]
	);

	// const mouseLerped = useRef({ x: 0, y: 0 });

	useFrame(state => {
		materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
	});

	return (
		<>
			{/* <mesh position={[0, 0, 0]}>
				<planeGeometry />
				<CustomShaderMaterial
					ref={materialRef}
					vertexShader={vertex}
					fragmentShader={frag}
					uniforms={uniforms}
					toneMapped={false}
					baseMaterial={MeshBasicMaterial}
				/>
			</mesh> */}
			<mesh position={[0, 0, 0]} scale={1.5}>
				<planeGeometry args={[1, 1, 32, 32]} />
				<shaderMaterial
					ref={materialRef}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={uniforms}
					toneMapped={true}
				/>
			</mesh>
			{/* <mesh position={props.position}>
				<planeGeometry />
				<meshBasicMaterial map={map} toneMapped={false} />
			</mesh> */}
		</>
	);
};

