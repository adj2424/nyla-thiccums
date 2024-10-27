/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';
import { Star } from './Star';
import { state } from '../constants';
import { NUM_OF_PICS, NUM_OF_HTML_CARDS } from '../constants';

export const MovingGroup = ({ pageState }: any) => {
	const paths = [...Array(NUM_OF_PICS)].map((_, idx) => `${idx + 1}.jpg`);
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
			z: 2.5 * (NUM_OF_PICS + NUM_OF_HTML_CARDS) - 3.5,
			duration: 20
		});
	}, []);

	useLayoutEffect(() => {
		// hide everything
		if (pageState === state.HERO) {
			gsap.to(movingGroup.current.scale, {
				x: 0.001,
				y: 0.001,
				z: 0.001,
				duration: 0.6,
				ease: 'power1.inOut'
			});
		}
		// show everything
		else if (pageState === state.GALLERY) {
			gsap.to(movingGroup.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 2,
				ease: 'power2.inOut'
			});
		}
		// hide everything
		else if (pageState === state.ABOUT) {
			gsap.to(movingGroup.current.scale, {
				x: 0.001,
				y: 0.001,
				z: 0.001,
				duration: 1.2,
				ease: 'power2.inOut'
			});
		}
	}, [pageState]);

	return (
		<>
			<group ref={movingGroup} scale={[0, 0, 0]}>
				{pictures}
				{stars}
			</group>
		</>
	);
};
