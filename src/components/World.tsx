import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
import { Time } from './Time';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
import { MovingGroup } from './MovingGroup';

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
		[243 / 255, 195 / 255, 203 / 255], // test
		// [255 / 255, 184 / 255, 217 / 255], // FFB8D9
		[255 / 255, 249 / 255, 200 / 255], // FFF9C8
		[198 / 255, 238 / 255, 214 / 255], // C6EED6
		[179 / 255, 225 / 255, 248 / 255], // B3E1F8
		[230 / 255, 203 / 255, 247 / 255] // E6CBF7
	];
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [colorIdx, setColorIdx] = useState(0);
	const cameraRef = useRef() as any;
	const dirLightRef = useRef() as any;
	const headerRef = useRef(null);
	const footerRef = useRef(null);
	const scroll = useScroll();
	const { scene } = useThree();
	const [currentBgColor] = useState({ r: bgColors[0][0], g: bgColors[0][1], b: bgColors[0][2] });
	const [entering, setEntering] = useState(false);

	useEffect(() => {
		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});
		scene.background = new Color(currentBgColor.r, currentBgColor.g, currentBgColor.b).convertSRGBToLinear();
	}, []);

	useEffect(() => {
		// gsap.to(currentBgColor, {
		// 	r: bgColors[colorIdx][0],
		// 	g: bgColors[colorIdx][1],
		// 	b: bgColors[colorIdx][2],
		// 	duration: 2,
		// 	ease: 'power2.out',
		// 	onUpdate: () => {
		// 		scene.background = new Color(currentBgColor.r, currentBgColor.g, currentBgColor.b).convertSRGBToLinear();
		// 	}
		// });
		// gsap.to(headerRef.current, {
		// 	color: stringColors[colorIdx],
		// 	duration: 2,
		// 	ease: 'power2.out'
		// });
		// gsap.to(footerRef.current, {
		// 	color: stringColors[colorIdx],
		// 	duration: 2,
		// 	ease: 'power2.out'
		// });
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

	const enter = () => {
		setEntering(true);
		gsap.to('.page', {
			yPercent: -100,
			duration: 1,
			ease: 'back.in(1.7)'
		});
	};

	return (
		<>
			<Html portal={{ current: scroll.fixed }} center position={[0, 0, 3]}>
				<div className="absolute left-[-50vw] top-[-50vh]">
					<div className="page absolute z-[3] ">
						<Spline className="absolute" scene="https://prod.spline.design/RdlIGAC2FgtRg8PR/scene.splinecode" />
						<div className="grid grid-cols-2 w-screen h-screen bg-[#f3c3cb]">
							<div className="flex items-center h-full font-fuzzyBubbles col-span-2 text-[18rem] font-bold text-white ml-[15rem]">
								<div>I LOVE</div>
								<button className="relative text-[3rem] ml-[15rem] z-[1] text-[#E33529]" onClick={enter}>
									ENTER
								</button>
							</div>

							<div className="flex items-center h-full font-fuzzyBubbles text-[3rem] ml-[15rem] text-[#E33529]">
								my pookie bear
							</div>

							<div className="flex items-center h-full font-fuzzyBubbles text-[18rem] font-bold text-white ml-[15rem]">
								YOU
							</div>
						</div>
					</div>
					{/* <div className="page absolute bg-[#E33529] w-screen h-screen z-[2]"></div>
					<div className="page absolute bg-white w-screen h-screen z-[1]"></div> */}
				</div>

				{/* <div className="w-screen h-screen flex flex-col items-center justify-between">
					<div className="font-fuzzyBubbles font-bold text-8xl text-[#E33529] mt-[3.5rem]">A LOOK BACK</div>
					<div className="font-fuzzyBubbles font-bold text-8xl text-[#E33529] mb-[4rem]">365 DAYS TOGETHER</div>
				</div> */}
			</Html>

			<MovingGroup entering={entering} />

			<PerspectiveCamera fov={35} ref={cameraRef} makeDefault position={[0, 0, 3]} />
		</>
	);
};

