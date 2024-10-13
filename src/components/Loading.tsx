import { useEffect } from 'react';

export const Loading = () => {
	/**
	 * Recursive loading screen
	 */
	useEffect(() => {
		load(0);
	});

	// use timeline seek maybe with percent?
	function load(count: number) {
		// finished loading and play enter animation
		if (count >= 100) {
			// const header = document.getElementById('header-name')!;
			// const font = window.getComputedStyle(header).fontSize;
			// const { top, left } = header.getBoundingClientRect();
			// gsap.to('#load-name', {
			// 	fontSize: font,
			// 	top: top,
			// 	left: left,
			// 	duration: 1.5,
			// 	ease: 'power2.out',
			// 	delay: 0.5
			// });

			// // wait for .5 seconds
			// setTimeout(() => {
			// 	let loadingPercent = new SplitType('#loading', { types: 'chars' });
			// 	gsap
			// 		.timeline()
			// 		.to(loadingPercent!.chars, {
			// 			yPercent: -200,
			// 			stagger: 0.15,
			// 			duration: 0.5,
			// 			delay: 0.5
			// 		})
			// 		.to('.loader-container', {
			// 			opacity: 0,
			// 			duration: 0.5,
			// 			delay: 0.1,
			// 			ease: 'power2.out'
			// 		})
			// 		.add(() => {
			// 			document.querySelector('.loader-container')?.remove();
			// 		});
			// }, 500);
			return;
		}
		const d = Math.random();
		count += d > 0.95 ? Math.ceil(Math.sqrt(d) * 25) : 1;
		if (count > 100) {
			count = 100;
		}
		// const loading = document.getElementById('loading')!;
		// loading.innerHTML = `${count}%`;
		// let scalePercent = (count * 82) / 100;
		// document.getElementById('loading')!.style.right = 82 - scalePercent + '%';
		console.log(count);
		setTimeout(load, 40, count);
	}

	return (
		<>
			<div className="flex flex-col justify-between items-center absolute w-full h-full pointer-events-none z-[1] ">
				loading page
			</div>
		</>
	);
};
