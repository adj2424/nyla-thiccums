import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { gsap } from 'gsap';
import { Picture } from './Picture';

export const PictureGroup = () => {
	const pictures = useRef() as any;
	const tl = gsap.timeline();
	const scroll = useScroll();

	useFrame(() => {
		tl.seek(scroll.offset * tl.duration());
	});

	useLayoutEffect(() => {
		tl.to(pictures.current.position, {
			z: 100,
			duration: 2
		});
	}, []);

	return (
		<>
			<group ref={pictures}>
				<Picture position={[(Math.random() - 0.5) * 5, Math.random() - 0.5, -10]} />
				{/* <Picture position={[(Math.random() - 0.5) * 5, Math.random() - 0.5, -10]} /> */}
			</group>
		</>
	);
};
