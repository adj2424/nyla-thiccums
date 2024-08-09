import { useFrame } from '@react-three/fiber';
import { Html, ScrollControls, useScroll } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useRef } from 'react';

export const Time = () => {
	const scrollData = useScroll();

	// buggy LULW https://github.com/pmndrs/drei/pull/1126
	useFrame(() => {});

	return (
		<>
			<Html className="" portal={{ current: scrollData.fixed }}>
				<div>
					<h1 className="text-white text-xl mix-blend-difference bg-slate-200">hiiiiiiiiiii</h1>
				</div>
			</Html>
		</>
	);
};
