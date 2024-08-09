import { useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import MyCanvas from './components/Canvas';
import { gsap } from 'gsap';

gsap.registerPlugin();

function App() {
	const [colorIdx, setColorIdx] = useState(0);

	const top = useRef(null);
	const bot = useRef(null);

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
		<div className="">
			<div className="flex flex-col justify-between items-center absolute w-full h-full pointer-events-none z-[1]">
				<div ref={top} className="text-9xl mt-[5.5rem]">
					365 DAYS
				</div>
				<div ref={bot} className="text-9xl mb-[6rem]">
					TOGETHER
				</div>
			</div>

			<div className="fixed w-full h-screen">
				<MyCanvas setColorIdx={setColorIdx} />
			</div>
		</div>
	);
}

export default App;

