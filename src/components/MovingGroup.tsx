import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';

export const MovingGroup = () => {
	const paths = [...Array(52)].map((_, idx) => `${idx + 1}.jpg`);
	const textures = useLoader(TextureLoader, paths);
	const movingGroup = useRef() as any;
	const scroll = useScroll();
	const [timeline] = useState(gsap.timeline());
	const [pictures, setPictures] = useState<JSX.Element[]>();
	const [stars, setStars] = useState<any>();

	useFrame(() => {
		timeline.seek(scroll.offset * timeline.duration());
	});

	useEffect(() => {
		const ret = textures.map((texture, idx) => {
			const position: [number, number, number] = [0, (Math.random() - 0.5) * 0.5, -idx * 2.5];
			idx % 2 !== 0 ? (position[0] = 1) : (position[0] = -1);
			return <Picture key={idx} position={position} texture={texture} idx={idx} group={movingGroup} />;
		});
		setPictures(ret);
		const test = [];
		for (let i = 0; i < 100; i++) {
			test.push(
				<mesh key={i} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, -i * 2.5]}>
					<sphereGeometry args={[0.1, 24, 24]} />
					<meshPhysicalMaterial
						color="white"
						roughness={0.6}
						metalness={0.7}
						clearcoat={0.2}
						clearcoatRoughness={1}
						emissiveIntensity={0}
						toneMapped={false}
					/>
				</mesh>
			);
		}
		setStars(test);
	}, []);

	useLayoutEffect(() => {
		timeline.to(movingGroup.current.position, {
			z: 130,
			duration: 20
		});
	}, []);

	return (
		<>
			<group ref={movingGroup}>
				{pictures}
				{stars}
			</group>
		</>
	);
};

