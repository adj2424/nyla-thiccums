import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';

export const PictureGroup = () => {
	const paths = [...Array(52)].map((_, idx) => `${idx + 1}.jpg`);
	const textures = useLoader(TextureLoader, paths);
	const pictureGroup = useRef() as any;
	const scroll = useScroll();
	const [timeline] = useState(gsap.timeline());
	const [pictures, setPictures] = useState<JSX.Element[]>();

	useFrame(() => {
		timeline.seek(scroll.offset * timeline.duration());
	});

	useEffect(() => {
		const ret = textures.map((texture, idx) => {
			const position: [number, number, number] = [0, (Math.random() - 0.5) * 0.5, -idx * 2.5];
			idx % 2 !== 0 ? (position[0] = 1) : (position[0] = -1);
			return <Picture key={idx} position={position} texture={texture} idx={idx} group={pictureGroup} />;
		});
		setPictures(ret);
	}, []);

	useLayoutEffect(() => {
		timeline.to(pictureGroup.current.position, {
			z: 130,
			duration: 20
		});
	}, []);

	return (
		<>
			<group ref={pictureGroup}>{pictures}</group>
		</>
	);
};

