import Spline from '@splinetool/react-spline';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
// import { Time } from './Time';
import { gsap } from 'gsap';
import { MovingGroup } from './MovingGroup';
import { state } from '../constants';
import SplitType from 'split-type';

const MyHtml = () => {
	const dayRef = useRef() as any;
	const cursorRef = useRef() as any;
	const [hasHovered, setHasHovered] = useState(false);

	const cursorSizeRef = useRef() as any;
	let days = 0;

	useEffect(() => {
		if (cursorSizeRef.current?.width === undefined) {
			cursorSizeRef.current = cursorRef.current.getBoundingClientRect();
		}
		window.addEventListener('mousemove', e => {
			cursorRef.current.style.left = `${e.clientX - cursorSizeRef.current.width / 2}px`; // Set left position
			cursorRef.current.style.top = `${e.clientY - cursorSizeRef.current.height / 2}px`; // Set top position
		});

		window.addEventListener('mousedown', () => {
			cursorRef.current.style.transform = 'scale(0.5)';
		});
		window.addEventListener('mouseup', () => {
			cursorRef.current.style.transform = 'scale(1)';
		});
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

	const onMouseHover = (id: string) => {
		if (hasHovered) {
			return;
		}
		cursorRef.current.style.transform = 'scale(2)';
		gsap
			.timeline()
			.fromTo(
				id,
				{ yPercent: 0 },
				{
					yPercent: -90,
					ease: 'power2.inOut',
					duration: 0.4
				}
			)
			.fromTo(
				id,
				{
					yPercent: 90
				},
				{
					yPercent: 0,
					ease: 'power2.inOut',
					duration: 0.4
				}
			)
			.add(() => {
				setHasHovered(true);
			});
	};

	const onMouseAway = () => {
		setHasHovered(false);
		cursorRef.current.style.transform = 'scale(1)';
	};

	const toGallery = () => {
		setPageState(state.GALLERY);
		// move hero page up
		gsap.to('.page', {
			yPercent: -110,
			duration: 1,
			ease: 'back.in(1.7)'
		});
		// show day description
		gsap.fromTo(
			'#day-desc',
			{
				yPercent: 100
			},
			{
				yPercent: 0,
				ease: 'power2.inOut',
				duration: 1,
				delay: 1.5
			}
		);
		// hide letter
		gsap.to('#letter-container', {
			yPercent: 0,
			ease: 'power2.inOut',
			duration: 1
		});
	};

	const toHero = () => {
		setPageState(state.HERO);
		// show hero page
		gsap.to('.page', {
			yPercent: 0,
			duration: 2,
			delay: 1,
			ease: 'power2.out'
		});
		// hide day description
		gsap.to('#day-desc', {
			yPercent: -100,
			ease: 'power2.inOut',
			duration: 0.8
		});
	};

	const toLetter = () => {
		setPageState(state.LETTER);
		// hide date description
		gsap.to('#day-desc', {
			yPercent: -100,
			ease: 'power2.inOut',
			duration: 0.6,
			stagger: 0.05
		});
		// show letter
		gsap.to('#letter-container', {
			yPercent: -100,
			ease: 'power2.inOut',
			duration: 1
		});
	};

	return (
		<div className="relative w-screen h-screen">
			<div
				id="cursor"
				className="absolute z-[3] pointer-events-none top-[5rem] left-[5rem] transition ease-in-out duration-500"
				ref={cursorRef}
			>
				<svg width="5rem" height="5rem" viewBox="0 0 24.00 24.00" fill="none">
					<path
						d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
						stroke="#E33529"
						strokeWidth="1"
					></path>
				</svg>
			</div>
			<div className="page absolute z-[2]">
				<Spline className="absolute" scene="https://prod.spline.design/RdlIGAC2FgtRg8PR/scene.splinecode" />
				<div className="grid grid-cols-2 w-screen h-screen bg-[#f3c3cb]">
					<div className="flex items-center h-full col-span-2 text-[18rem] text-white ml-[15rem]">
						<div className=" font-fuzzyBubbles font-bold">I LOVE</div>
						<button
							className="relative font-oswald text-[3rem] ml-[15rem] z-[1] text-[#E33529] overflow-hidden"
							onMouseEnter={() => {
								onMouseHover('#enter');
							}}
							onMouseLeave={onMouseAway}
							onClick={toGallery}
						>
							<div id="enter">ENTER</div>
						</button>
					</div>
					<div className="flex items-center h-full font-oswald text-[3rem] ml-[15rem] text-[#E33529]">
						MY POOKIE BEAR 😻
					</div>
					<div className="flex items-center h-full font-fuzzyBubbles text-[18rem] font-bold text-white ml-[15rem]">
						YOU
					</div>
				</div>
			</div>
			<div className="w-full flex justify-center">
				<div className="w-full flex items-center justify-between mt-[1rem] overflow-hidden">
					<button
						className="font-fuzzyBubbles font-bold text-[3rem] text-white ml-[4rem]"
						onMouseEnter={() => {
							onMouseHover('#home');
						}}
						onMouseLeave={onMouseAway}
						onClick={toHero}
					>
						<div id="home">HOME</div>
					</button>
					<div className="flex items-end font-oswald font-medium text-[2rem] text-white mr-[4rem] overflow-hidden ">
						<button
							className="py-1 px-3 mr-[2rem]"
							onMouseEnter={() => {
								onMouseHover('#pics');
							}}
							onMouseLeave={onMouseAway}
							onClick={() => {
								window.open(
									'https://www.dropbox.com/scl/fo/qvdcxcxkw6c55ul2yf6tt/AFcvG-aUwLjxDrQAm2y32a4?rlkey=q7rl5v81wgfpqibcakp90yo7l&st=5wx23bbq&dl=0',
									'_blank'
								);
							}}
						>
							<div id="pics">PICS</div>
						</button>
						<button
							className="py-1 px-3 mr-[14px]"
							onMouseEnter={() => {
								onMouseHover('#letter');
							}}
							onMouseLeave={onMouseAway}
							onClick={toLetter}
						>
							<div id="letter">LETTER</div>
						</button>
					</div>
				</div>
				<div className="absolute overflow-hidden bottom-[3rem]">
					<div id="day-desc" className="flex font-oswald font-medium align-baseline text-[6.5rem] text-[#E33529] ">
						<div>DAY #</div>
						<div ref={dayRef} className="overflow-hidden">
							1
						</div>
						<div className="ml-[1.5rem]">OF BEING TOGETHER</div>
					</div>
				</div>
				<div
					id="letter-container"
					className={`absolute items-center bottom-[-45rem] w-[70rem] h-[45rem] font-oswald font-medium bg-white text-[#f3c3cb] overflow-auto mt-[10rem]
        border-t-4 border-l-4 border-r-4 border-[#E33529] rounded-t-2xl
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#E33529]`}
				>
					<button
						className="sticky top-0 float-right p-[1rem] text-[1.5rem] overflow-hidden"
						onClick={toGallery}
						onMouseEnter={() => {
							onMouseHover('');
						}}
						onMouseLeave={onMouseAway}
					>
						<svg
							id="close"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={3}
							stroke="#E33529"
							className="size-8 "
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
					<div className="px-[6rem] text-[2.5rem] mt-[5rem]">10/15/2024</div>
					<div className="px-[6rem] text-[2.5rem] mt-[5rem]">Happy One Year Anniversary Trinity 💝</div>
					<div className="px-[6rem] text-[2.5rem] mt-[5rem]">
						As you can see this letter is quite different than the others I made for you. I have dedicated this to
						create a special letter for my special girlfriend. A year ago, I like to think to myself wondering what the
						future would hold for me and never would I thought that I would be with a beautiful and loving girlfriend
						named Trinity. My year with you has been truly magical and I will never forget all the memories we have made
						together. When we first started dating, I didn't know what I was getting into but I knew I just had to be
						with you. Showing me the Deco rooftop made me feel like the most special person ever, the view of the city
						skyline was almost as breathtaking as you. Whenever I am with you, you have always taken care of me with a
						level of care that I don't even give to myself. When I fell ill with you in Richmond, your yummy meals
						tastes like no other. When I knock on your apartment door and see you in person after a long break, your
						soft touch feels like no other. When I listen to you yap about anything, you make make me laugh like no
						other. When we cuddle on your tiny inescapable twin XL bed and I squeeze your buccal fat pads, it feels like
						no other. You truly are someone so special to me and I am forever grateful for everything. Not only are you
						super duper caring, but you are also someone I can be vulnerable with and rely on. Your chef lessons been
						super fun teaching me new ways to create dishes. Sharing a successful meal that we made together are always
						so amazing, our teamwork is unparalleled. Though I still think tomatoes and eggs is the most op meal ever.
						Throughout our relationship your hard work doesn't go unnoticed, I am so proud of us making it to one year.
						All relationships has ups and downs and I know we can do it together. Your kindness, affection and warmth is
						truly a gift. I can't appreciate enough for everything that you have done for me. Your love is beautiful.
						Happy one year anniversary!
					</div>
					<div className="px-[6rem] text-[2.5rem] mt-[5rem] text-right">With all my heart 💖</div>
					<div className="px-[6rem] text-[2.5rem] mt-[1rem] mb-[5rem] text-right">Alan Jiang</div>
				</div>
			</div>
		</div>
	);
};

export default MyHtml;
