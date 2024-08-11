import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
import { Time } from './Time';
import { gsap } from 'gsap';

gsap.registerPlugin();

export const World = () => {
	gsap.registerPlugin();
	const stringColors: string[] = [
		'rgb(236 72 153)',
		'rgb(255,173,0)',
		'rgb(0,135,62)',
		'rgb(15,82,186)',
		'rgb(144,99,205)'
	];
	const bgColors: number[][] | any = [
		[246 / 255, 187 / 255, 207 / 255], // test
		// [255 / 255, 184 / 255, 217 / 255], // FFB8D9
		[255 / 255, 249 / 255, 200 / 255], // FFF9C8
		[198 / 255, 238 / 255, 214 / 255], // C6EED6
		[179 / 255, 225 / 255, 248 / 255], // B3E1F8
		[230 / 255, 203 / 255, 247 / 255] // E6CBF7
	];
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [colorIdx, setColorIdx] = useState(0);
	const cameraRef = useRef() as any;
	const headerRef = useRef(null);
	const footerRef = useRef(null);
	const scroll = useScroll();
	const { scene } = useThree();
	const [currentBgColor] = useState({ r: bgColors[0][0], g: bgColors[0][1], b: bgColors[0][2] });

	useEffect(() => {
		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});
		scene.background = new Color(currentBgColor.r, currentBgColor.g, currentBgColor.b).convertSRGBToLinear();
	}, []);

	useEffect(() => {
		gsap.to(currentBgColor, {
			r: bgColors[colorIdx][0],
			g: bgColors[colorIdx][1],
			b: bgColors[colorIdx][2],
			duration: 2,
			ease: 'power2.out',
			onUpdate: () => {
				scene.background = new Color(currentBgColor.r, currentBgColor.g, currentBgColor.b).convertSRGBToLinear();
			}
		});

		gsap.to(headerRef.current, {
			color: stringColors[colorIdx],
			duration: 2,
			ease: 'power2.out'
		});
		gsap.to(footerRef.current, {
			color: stringColors[colorIdx],
			duration: 2,
			ease: 'power2.out'
		});
	}, [colorIdx]);

	useFrame(() => {
		if (colorIdx !== Math.floor(bgColors.length * scroll.offset)) {
			setColorIdx(Math.floor(bgColors.length * scroll.offset));
		}
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		cameraRef.current.position.x += (parallaxX - cameraRef.current.position.x) * 0.2;
		cameraRef.current.position.y += (parallaxY - cameraRef.current.position.y) * 0.2;
	});

	return (
		<>
			<Html portal={{ current: scroll.fixed }} center position={[0, 0, 3]}>
				<div className="w-screen h-screen flex flex-col items-center justify-between">
					{/* <div ref={headerRef} className="font-neuton font-semibold text-9xl mt-[3.5rem]">
						A Look Back
					</div>
					<div ref={footerRef} className="font-neuton font-semibold text-9xl mb-[4rem]">
						365 Days Together
					</div> */}
					<div className="font-neuton font-semibold text-9xl text-[#FF1900] mt-[3.5rem]">A Look Back</div>
					<div className="font-neuton font-semibold text-9xl text-[#FF1900] mb-[4rem]">365 Days Together</div>
				</div>
			</Html>
			<PerspectiveCamera fov={32} ref={cameraRef} makeDefault position={[0, 0, 3]} />
		</>
	);
};

