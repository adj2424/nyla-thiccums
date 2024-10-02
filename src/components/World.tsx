import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
// import { Time } from './Time';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
import { MovingGroup } from './MovingGroup';
import { state } from '../constants';
import SplitType from 'split-type';

export const World = () => {
	gsap.registerPlugin();
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const cameraRef = useRef() as any;
	const dayRef = useRef() as any;
	const scroll = useScroll();
	const { scene } = useThree();
	const [pageState, setPageState] = useState<state>(state.HERO);

	let days = 0;

	useEffect(() => {
		// remove this later
		setPageState(state.GALLERY);

		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});

		// update date every 1.8 seconds
		setInterval(() => {
			if (days !== Math.round(scroll.offset * 365)) {
				days = Math.round(scroll.offset * 365);
				updateDate();
			}
		}, 1800);

		scene.background = new Color(243 / 255, 195 / 255, 203 / 255).convertSRGBToLinear();
	}, []);

	useFrame(() => {
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		cameraRef.current.position.x += (parallaxX - cameraRef.current.position.x) * 0.2;
		cameraRef.current.position.y += (parallaxY - cameraRef.current.position.y) * 0.2;
	});

	const enter = () => {
		setPageState(state.GALLERY);
		gsap.to('.page', {
			yPercent: -110,
			duration: 1,
			ease: 'back.in(1.7)'
		});
	};

	const back = () => {
		setPageState(state.HERO);
		gsap.to('.page', {
			yPercent: 0,
			duration: 2,
			delay: 1,
			ease: 'power2.out'
		});
	};

	const updateDate = () => {
		let text = new SplitType(dayRef.current, { types: 'chars' });
		// cannot use gsap timeline fsr split type is sus
		gsap.fromTo(
			text.chars,
			{
				yPercent: 0
			},
			{
				yPercent: -100,
				ease: 'power2.inOut',
				duration: 0.6,
				stagger: 0.05,
				onComplete: () => {
					// split type is weird so we have to revert it and then change text
					text.revert();
					dayRef.current.innerHTML = days;
					text = new SplitType(dayRef.current, { types: 'chars' });
					gsap.fromTo(
						text.chars,
						{
							yPercent: 100
						},
						{
							yPercent: 0,
							ease: 'power2.inOut',
							duration: 0.6,
							stagger: 0.05
						}
					);
				}
			}
		);
	};

	return (
		<>
			<Html portal={{ current: scroll.fixed }} center position={[0, 0, 3]}>
				<div className="absolute left-[-50vw] top-[-50vh] w-screen h-screen">
					{/* <div className="page absolute z-[3] ">
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
					</div> */}
					<div className="w-full h-full flex flex-col items-center justify-between">
						<div className="w-full flex items-center justify-between mt-[1rem]">
							<button className="font-fuzzyBubbles font-bold text-[3rem] text-white ml-[4rem]" onClick={back}>
								HOME
							</button>
							<div className="flex items-end font-oswald font-medium text-2xl text-white mr-[4rem]">
								<div className="py-1 px-4">PICS</div>
								<button className="py-1 pl-4 mr-[18px]" onClick={() => {}}>
									LETTER
								</button>
							</div>
						</div>
						<div className="flex font-oswald font-medium align-baseline text-[6.5rem] text-[#E33529] mb-[3rem]">
							<div>DAY #</div>
							<div id="day" ref={dayRef} className="overflow-hidden text-justify">
								1
							</div>
							<div className="ml-[1.5rem]">OF BEING TOGETHER</div>
						</div>
					</div>
				</div>
			</Html>
			<MovingGroup pageState={pageState} />
			<PerspectiveCamera fov={35} ref={cameraRef} makeDefault position={[0, 0, 3]} />
		</>
	);
};

