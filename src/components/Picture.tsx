import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Texture } from 'three';
import { gsap } from 'gsap';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

gsap.registerPlugin();

export interface Props {
	texture: Texture | any;
	position: [number, number, number];
	idx: number;
	group: any;
}

export const Picture = ({ texture, position, idx, group }: Props) => {
	const [aspectRatio, setAspectRatio] = useState(1);
	const random = Math.random() * 1000;
	const meshRef = useRef() as any;
	const borderMaterialRef = useRef() as any;
	const uniforms = useMemo(
		() => ({
			u_time: { value: 0 },
			u_texture: { value: texture },
			u_intensity: { value: 0.01 },
			u_opacity: { value: 1.0 }
		}),
		[texture]
	);

	useEffect(() => {
		setAspectRatio(texture.image.width / texture.image.height);
	}, [texture]);

	useFrame(state => {
		meshRef.current.material.uniforms.u_time.value = state.clock.getElapsedTime() + random;
		if (group.current.position.z + 6 < 2.5 * idx) {
			gsap.to(meshRef.current.material.uniforms.u_opacity, {
				value: 0,
				duration: 0.8
			});
			gsap.to(borderMaterialRef.current, {
				opacity: 0,
				duration: 0.8
			});
		} else {
			gsap.to(meshRef.current.material.uniforms.u_opacity, {
				value: 1,
				duration: 0.1,
				ease: 'power1.in'
			});
			gsap.to(borderMaterialRef.current, {
				opacity: 1,
				duration: 0.1,
				ease: 'power1.in'
			});
		}
	});

	return (
		<>
			<mesh ref={meshRef} position={position}>
				<planeGeometry args={[aspectRatio, 1, 16, 16]} />
				<shaderMaterial
					transparent={true}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={uniforms}
				/>
			</mesh>
			<mesh position={[position[0], position[1], position[2] - 0.01]}>
				<planeGeometry args={[aspectRatio + 0.2, 1 + 0.2, 1, 1]} />
				<meshBasicMaterial ref={borderMaterialRef} color="white" toneMapped={false} transparent={true} />
			</mesh>
		</>
	);
};

