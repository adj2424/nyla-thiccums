/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { state } from '../../constants';
import SplitType from 'split-type';
import { ScrollControlsState } from '@react-three/drei';
import { Cursor } from './Cursor';
import { HeroPage } from './Hero';
import Letter from './Letter';
import '../../css/html.css';

interface MyHtmlProps {
	pageState: any;
	setPageState: (state: state) => void;
	scroll: ScrollControlsState;
}

const MyHtml = ({ pageState, setPageState, scroll }: MyHtmlProps) => {
	const audioRef = useRef() as any;
	const dayRef = useRef() as any;
	const cursorRef = useRef() as any;
	const [initialEntry, setInitialEntry] = useState(true);
	const [hasHovered, setHasHovered] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [audioIcon, setAudioIcon] = useState<any>();
	let days = 0;

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

	useEffect(() => {
		//playing audio
		if (isMuted === false) {
			audioRef.current.play();
			gsap
				.timeline()
				.fromTo(
					'#audio',
					{ yPercent: 0 },
					{
						yPercent: -100,
						ease: 'power2.inOut',
						duration: 0.35
					}
				)
				.add(() => {
					setAudioIcon(
						<svg className="h-[2.5rem]" viewBox="0 0 24 24" fill="currentColor">
							<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
							<path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
						</svg>
					);
				})
				.fromTo(
					'#audio',
					{ yPercent: 100 },
					{
						yPercent: 0,
						ease: 'power2.inOut',
						duration: 0.35
					}
				);
		}
		// muting audio
		else {
			audioRef.current.pause();
			gsap
				.timeline()
				.fromTo(
					'#audio',
					{ yPercent: 0 },
					{
						yPercent: -100,
						ease: 'power2.inOut',
						duration: 0.35
					}
				)
				.add(() => {
					setAudioIcon(
						<svg className="h-[2.5rem]" viewBox="0 0 24 24" fill="currentColor">
							<path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
						</svg>
					);
				})
				.fromTo(
					'#audio',
					{ yPercent: 100 },
					{
						yPercent: 0,
						ease: 'power2.inOut',
						duration: 0.35
					}
				);
		}
	}, [isMuted]);

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
				stagger: 0.1,
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
							stagger: 0.1
						}
					);
				}
			}
		);
	};

	const onMouseHover = (id: string | null) => {
		if (hasHovered) {
			return;
		}
		cursorRef.current.style.transform = 'scale(2)';
		// cursorRef.current.style.cursor = 'none';
		if (id === null) {
			setHasHovered(true);
			return;
		}
		gsap
			.timeline()
			.fromTo(
				id,
				{ yPercent: 0 },
				{
					yPercent: -90,
					ease: 'power2.inOut',
					duration: 0.35
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
					duration: 0.35
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

	const changeAudio = () => {
		setIsMuted(!isMuted);
	};

	const toGallery = () => {
		if (initialEntry) {
			// play audio here because transition from hero page to gallery cannot auto play cringe
			setIsMuted(false);
			setInitialEntry(false);
		}
		setPageState(state.GALLERY);
		// move hero page up
		gsap.to('.page', {
			yPercent: -110,
			duration: 1,
			ease: 'power2.inOut'
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
		<div className="relative w-screen h-screen cursor-none">
			<Cursor cursorRef={cursorRef}></Cursor>
			<audio loop ref={audioRef}>
				<source src="doodle.mp3" type="audio/mpeg" />
				Your browser does not support the audio tag.
			</audio>
			<HeroPage onMouseHover={onMouseHover} onMouseAway={onMouseAway} toGallery={toGallery}></HeroPage>
			<div className="w-full flex justify-center">
				<div className="w-full flex items-center justify-between mt-[1rem] overflow-hidden">
					<div
						className="font-fuzzyBubbles font-bold text-[3rem] text-white ml-[4rem]"
						onMouseEnter={() => {
							onMouseHover('#home');
						}}
						onMouseLeave={onMouseAway}
						onClick={toHero}
					>
						<div id="home">HOME</div>
					</div>
					<div className="flex items-center font-oswald font-medium text-[2rem] text-white mr-[3rem] overflow-hidden ">
						<div
							className="py-1 mr-[3rem]"
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
						</div>
						<div
							className="p-1 mr-[3rem]"
							onMouseEnter={() => {
								onMouseHover('#letter');
							}}
							onMouseLeave={onMouseAway}
							onClick={toLetter}
						>
							<div id="letter">LETTER</div>
						</div>
						<div
							className="p-1 mr-[14px] overflow-hidden"
							onClick={changeAudio}
							onMouseEnter={() => {
								onMouseHover(null);
							}}
							onMouseLeave={onMouseAway}
						>
							<div id="audio">{audioIcon}</div>
						</div>
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
				<Letter onMouseHover={onMouseHover} onMouseAway={onMouseAway} toGallery={toGallery}></Letter>
			</div>
		</div>
	);
};

export default MyHtml;