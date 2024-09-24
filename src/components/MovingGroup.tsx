import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';
import { Star } from './Star';

export const MovingGroup = props => {
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
		const stars = 40;
		for (let i = 0; i < stars; i++) {
			test.push(<Star key={i} idx={i} group={movingGroup} totalStars={stars} />);
		}
		setStars(test);
	}, []);

	useLayoutEffect(() => {
		timeline.to(movingGroup.current.position, {
			z: 130,
			duration: 20
		});
	}, []);

	useLayoutEffect(() => {
		if (!props.entering) {
			return;
		}
		gsap.to(movingGroup.current.scale, {
			x: 1,
			y: 1,
			z: 1,
			duration: 3,
			delay: 0.8,
			ease: 'power2.inOut'
		});
	}, [props.entering]);

	return (
		<>
			<group ref={movingGroup} scale={[0, 0, 0]}>
				{pictures}
				{stars}
			</group>
		</>
	);
};

