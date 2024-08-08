import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html, useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';

export const PictureGroup = () => {
	const ref = useRef() as any;
	const paths = [...Array(5)].map((_, idx) => `${idx + 1}.jpg`);
	const textures = useLoader(TextureLoader, paths);
	const pictureGroup = useRef() as any;
	const scroll = useScroll();
	const [timeline] = useState(gsap.timeline());
	const [pictures, setPictures] = useState<JSX.Element[]>();
	const scrollData = useScroll();

	useFrame(() => {
		timeline.seek(scroll.offset * timeline.duration());
		console.log(ref.current);
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

	// buggy LULW https://github.com/pmndrs/drei/pull/1126

	return (
		<>
			<Html className="bg-red-600" transform portal={{ current: scrollData.fixed }}>
				<div className="">hiiiiiiiiiii</div>
			</Html>
			<group ref={pictureGroup}>{pictures}</group>
		</>
	);
};

