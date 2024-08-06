import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { SRGBColorSpace, Texture } from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

export interface Props {
	texture: Texture;
	position: [number, number, number];
}

export const Picture = ({ texture, position }: Props) => {
	const [aspectRatio, setAspectRatio] = useState(1);
	const materialRef = useRef() as any;
	const uniforms = useMemo(
		() => ({
			u_time: { value: 0.0 },
			u_texture: { value: texture },
			u_intensity: { value: 0.01 }
		}),
		[texture]
	);

	useEffect(() => {
		texture.colorSpace = SRGBColorSpace;
		setAspectRatio(texture.image.width / texture.image.height);
	}, [texture]);

	useFrame(state => {
		materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
	});

	return (
		<>
			<mesh position={position}>
				<planeGeometry args={[aspectRatio, 1, 32, 32]} />
				<shaderMaterial
					ref={materialRef}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={uniforms}
				/>
			</mesh>
		</>
	);
};

