import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import { Picture } from './Picture';
import { Star } from './Star';
import { state } from '../constants';
import { CustomEase } from 'gsap/CustomEase';

export const MovingGroup = ({ pageState }) => {
	gsap.registerPlugin(CustomEase);
	const numberOfPictures = 58;
	const paths = [...Array(numberOfPictures)].map((_, idx) => `${idx + 1}.jpg`);
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
			z: 2.5 * numberOfPictures - 3.5,
			duration: 20
		});
	}, []);

	useLayoutEffect(() => {
		if (pageState === state.HERO) {
			gsap.to(movingGroup.current.scale, {
				x: 0.0,
				y: 0.0,
				z: 0.0,
				duration: 1.2,
				ease: CustomEase.create(
					'custom',
					'M0,0 C0,0 0.04,-0.097 0.134,-0.099 0.171,-0.1 0.223,-0.077 0.269,0 0.321,0.088 0.329,0.1 0.389,0.258 0.442,0.401 0.461,0.523 0.513,0.652 0.561,0.771 0.592,0.834 0.673,0.912 0.737,0.974 0.769,0.979 0.861,1 0.939,1.017 1,1 1,1 '
				)
			});
		}
		//
		else if (pageState === state.GALLERY) {
			gsap.to(movingGroup.current.scale, {
				x: 1,
				y: 1,
				z: 1,
				duration: 3.5,
				delay: 0.8,
				ease: 'power2.inOut'
			});
		}
		//
		else if (pageState === state.LETTER) {
			gsap.to(movingGroup.current.scale, {
				x: 0.0,
				y: 0.0,
				z: 0.0,
				duration: 1.2,
				ease: CustomEase.create(
					'custom',
					'M0,0 C0,0 0.04,-0.097 0.134,-0.099 0.171,-0.1 0.223,-0.077 0.269,0 0.321,0.088 0.329,0.1 0.389,0.258 0.442,0.401 0.461,0.523 0.513,0.652 0.561,0.771 0.592,0.834 0.673,0.912 0.737,0.974 0.769,0.979 0.861,1 0.939,1.017 1,1 1,1 '
				)
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

