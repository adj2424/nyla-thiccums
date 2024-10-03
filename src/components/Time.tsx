// import { useFrame } from '@react-three/fiber';
import { Html, useScroll } from '@react-three/drei';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useEffect, useLayoutEffect, useRef } from 'react';

// buggy LULW https://github.com/pmndrs/drei/pull/1126
export const Time = ({ position, colorIdx }: any) => {
	const ref = useRef() as any;
	const scrollData = useScroll();

	const top = useRef(null);
	const bot = useRef(null);

	useEffect(() => {
		console.log('hi');
	}, []);

	useLayoutEffect(() => {
		const colors: string[] = [
			'rgb(255,184,217)',
			'rgb(255,249,200)',
			'rgb(198,238,214)',
			'rgb(179,225,248)',
			'rgb(230,203,247)'
		];

		gsap.to(top.current, {
			color: colors[colorIdx],
			duration: 1,
			ease: 'power2.out'
		});
		gsap.to(bot.current, {
			color: colors[colorIdx],
			duration: 1,
			ease: 'power2.out'
		});
	}, [colorIdx]);

	return (
		<>
			<Html ref={ref} portal={{ current: scrollData.fixed }} center position={position}>
				<div className="w-screen h-screen flex flex-col items-center justify-between">
					<div className="text-9xl mt-[5.5rem]">365 DAYS</div>
					<div className="text-9xl mb-[6rem]">TOGETHER</div>
				</div>
			</Html>
		</>
	);
};
