import { memo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

gsap.registerPlugin();

// issue with only using ref is that use state in parent is causing rerender breaking things
// using memo to prevent rerender from parent but also means component is not being rerendered so we use a new ref on the div to change the dom value
export const Loading = memo(() => {
	const countRef = useRef(0);
	const countDisplayRef = useRef(null) as any;
	const distanceRef = useRef(0);
	const timeline = useRef(gsap.timeline()).current;

	/**
	 * Recursive loading screen
	 */
	useEffect(() => {
		const endPosition = countDisplayRef.current.getBoundingClientRect().right;

		distanceRef.current = (window.innerWidth - endPosition) * 0.88;

		// timeline.to(countDisplayRef.current, {
		// 	x: distanceRef.current,
		// 	duration: 10
		// });

		load();
	}, []);

	// use timeline seek maybe with percent?
	const load = () => {
		// finished loading and play enter animation
		if (countRef.current >= 100) {
			return;
		}
		const d = Math.random();
		countRef.current += d > 0.95 ? Math.ceil(Math.sqrt(d) * 25) : 1;

		if (countRef.current > 100) {
			countRef.current = 100;
		}
		console.log(countRef.current, d, distanceRef.current);
		countDisplayRef.current.textContent = `${countRef.current}%`;
		gsap.to(countDisplayRef.current, {
			x: (distanceRef.current * countRef.current) / 100,
			duration: 1
		});
		setTimeout(load, 200);
	};

	return (
		<>
			<div className="flex items-center justify-center absolute w-full h-full pointer-events-none z-[1] bg-white opacity-0">
				<div id="loading" className="text-[8rem]">
					✨LOADING✨
				</div>
				<div ref={countDisplayRef} className="absolute bottom-0 left-[1rem] text-[8rem]">
					0%
				</div>
			</div>
		</>
	);
});
