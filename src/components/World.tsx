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
		// setPageState(state.GALLERY);
		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});
		scene.background = new Color(243 / 255, 195 / 255, 203 / 255).convertSRGBToLinear();
	}, []);

	useEffect(() => {
		// update date every 1.8 seconds
		const interval = setInterval(() => {
			if (days !== Math.round(scroll.offset * 365) && pageState === state.GALLERY) {
				days = Math.round(scroll.offset * 365);
				updateDate();
			}
		}, 1800);
		return () => {
			clearInterval(interval);
		};
	}, [pageState]);

	useFrame(() => {
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		cameraRef.current.position.x += (parallaxX - cameraRef.current.position.x) * 0.2;
		cameraRef.current.position.y += (parallaxY - cameraRef.current.position.y) * 0.2;
	});

	const updateDate = () => {
		let text = new SplitType(dayRef.current, { types: 'chars' });
		// cannot use gsap timeline fsr split type is sus
		gsap.fromTo(
			text.chars,
			{
				yPercent: 0
			},
			{
				yPercent: -85,
				ease: 'power2.inOut',
				duration: 0.4,
				stagger: 0.85,
				onComplete: () => {
					// split type is weird so we have to revert it and then change text
					text.revert();
					dayRef.current.innerHTML = days;
					text = new SplitType(dayRef.current, { types: 'chars' });
					gsap.fromTo(
						text.chars,
						{
							yPercent: 75
						},
						{
							yPercent: 0,
							ease: 'power2.inOut',
							duration: 0.4,
							stagger: 0.85
						}
					);
				}
			}
		);
	};

	const toGallery = () => {
		setPageState(state.GALLERY);
		gsap.to('.page', {
			yPercent: -110,
			duration: 1,
			ease: 'back.in(1.7)'
		});
	};

	const toHero = () => {
		setPageState(state.HERO);
		gsap.to('.page', {
			yPercent: 0,
			duration: 2,
			delay: 1,
			ease: 'power2.out'
		});
		// const desc = new SplitType('#day-desc', { types: 'words' });
		// gsap.to(desc.words, {
		// 	yPercent: -100,
		// 	ease: 'power2.inOut',
		// 	duration: 0.6,
		// 	stagger: 0.05
		// });
	};

	const toLetter = () => {
		setPageState(state.LETTER);
		const desc = new SplitType('#day-desc', { types: 'words' });
		gsap.to(desc.words, {
			yPercent: -100,
			ease: 'power2.inOut',
			duration: 0.6,
			stagger: 0.05
		});
	};

	return (
		<>
			<Html portal={{ current: scroll.fixed }} center position={[0, 0, 3]}>
				<div className="absolute left-[-50vw] top-[-50vh] w-screen h-screen">
					<div className="page absolute z-[3] ">
						<Spline className="absolute" scene="https://prod.spline.design/RdlIGAC2FgtRg8PR/scene.splinecode" />
						<div className="grid grid-cols-2 w-screen h-screen bg-[#f3c3cb]">
							<div className="flex items-center h-full font-fuzzyBubbles col-span-2 text-[18rem] font-bold text-white ml-[15rem]">
								<div>I LOVE</div>
								<button className="relative text-[3rem] ml-[15rem] z-[1] text-[#E33529]" onClick={toGallery}>
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
					<div className="w-full h-full flex flex-col items-center justify-between">
						<div className="w-full flex items-center justify-between mt-[1rem]">
							<button className="font-fuzzyBubbles font-bold text-[3rem] text-white ml-[4rem]" onClick={toHero}>
								HOME
							</button>
							<div className="flex items-end font-oswald font-medium text-[2rem] text-white mr-[4rem]">
								<div className="py-1 px-4">PICS</div>
								<button className="py-1 pl-4 mr-[18px]" onClick={toLetter}>
									LETTER
								</button>
							</div>
						</div>

						<div
							id="day-desc"
							className="flex font-oswald font-medium align-baseline text-[6.5rem] text-[#E33529] mb-[3rem] overflow-hidden "
						>
							<div>DAY #</div>
							<div ref={dayRef} className="overflow-hidden">
								1
							</div>
							<div className="ml-[1.5rem]">OF BEING TOGETHER</div>
						</div>

						<div className="absolute items-center bottom-0 w-[70rem] h-[45rem] font-oswald font-medium bg-white text-[#f3c3cb] overflow-auto mt-[10rem]">
							<div className="sticky top-0 text-right p-[1rem]">X</div>
							<div className="px-[6rem] text-[2.5rem] mt-[5rem]">10/15/2024</div>
							<div className="px-[6rem] text-[2.5rem] mt-[5rem]">Happy One Year Anniversary Trinity 💝</div>
							<div className="px-[6rem] text-[2.5rem] mt-[5rem]">
								As you can see this letter is quite different than the others I made for you. I have dedicated this to
								create a special letter for my special girlfriend. A year ago, I like to think to myself wondering what
								the future would hold for me and never would I thought that I would be with a beautiful and loving
								girlfriend named Trinity. My year with you has been truly magical and I will never forget all the
								memories we have made together. When we first started dating, I didn't know what I was getting into but
								I knew I just had to be with you. Showing me the Deco rooftop made me feel like the most special person
								ever, the view of the city skyline was almost as breathtaking as you. Whenever I am with you, you have
								always taken care of me with a level of care that I don't even give to myself. When I fell ill with you
								in Richmond, your yummy meals tastes like no other. When I knock on your apartment door and see you in
								person after a long break, your soft touch feels like no other. When I listen to you yap about anything,
								you make make me laugh like no other. When we cuddle on your tiny inescapable twin XL bed and I squeeze
								your buccal fat pads, it feels like no other. You truly are someone so special to me and I am forever
								grateful for everything. Not only are you super duper caring, but you are also someone I can be
								vulnerable with and rely on. Your chef lessons been super fun teaching me new ways to create dishes.
								Sharing a successful meal that we made together are always so amazing, our teamwork is unparalleled.
								Though I still think tomatoes and eggs is the most op meal ever. Throughout our relationship your hard
								work doesn't go unnoticed, I am so proud of us making it to one year. All relationships has ups and
								downs and I know we can do it together. Your kindness, affection and warmth is truly a gift. I can't
								appreciate enough for everything that you have done for me. Your love is beautiful. Happy one year
								anniversary!
							</div>
							<div className="px-[6rem] text-[2.5rem] mt-[5rem] text-right">With all my heart 💖</div>
							<div className="px-[6rem] text-[2.5rem] mt-[1rem] mb-[5rem] text-right">Alan Jiang</div>
						</div>
					</div>
				</div>
			</Html>
			<MovingGroup pageState={pageState} />
			<PerspectiveCamera fov={35} ref={cameraRef} makeDefault position={[0, 0, 3]} />
		</>
	);
};

