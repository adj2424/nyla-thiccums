import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
import { gsap } from 'gsap';

gsap.registerPlugin();

export const World = ({ setColorIdx: setColorIdx }: any) => {
	const cameraRef = useRef() as any;
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const scroll = useScroll();
	const { scene } = useThree();

	const colors: number[][] | any = [
		[255 / 255, 184 / 255, 217 / 255], // FFB8D9
		[255 / 255, 249 / 255, 200 / 255], // FFF9C8
		[198 / 255, 238 / 255, 214 / 255], // C6EED6
		[179 / 255, 225 / 255, 248 / 255], // B3E1F8
		[230 / 255, 203 / 255, 247 / 255] // E6CBF7
	];
	let colorIdx = 0;

	useEffect(() => {
		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});
		scene.background = new Color(colors[colorIdx][0], colors[colorIdx][1], colors[colorIdx][2]);
	}, []);

	useFrame(() => {
		const calc = Math.floor(colors.length * scroll.offset);
		console.log('calc', calc, 'idx', colorIdx);
		if (colorIdx !== calc) {
			colorIdx = Math.floor(colors.length * scroll.offset);
			setColorIdx(colorIdx);
			gsap.to(scene.background, {
				r: colors[colorIdx][0],
				g: colors[colorIdx][1],
				b: colors[colorIdx][2],
				duration: 1,
				ease: 'power2.out'
			});
		}
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		cameraRef.current.position.x += (parallaxX - cameraRef.current.position.x) * 0.2;
		cameraRef.current.position.y += (parallaxY - cameraRef.current.position.y) * 0.2;
	});

	return <PerspectiveCamera fov={35} ref={cameraRef} makeDefault position={[0, 0, 3]} />;
};
