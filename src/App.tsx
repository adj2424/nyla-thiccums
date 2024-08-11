import { useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import MyCanvas from './components/Canvas';
import { gsap } from 'gsap';

gsap.registerPlugin();

function App() {
	return (
		<div className="">
			{/* <div className="flex flex-col justify-between items-center absolute w-full h-full pointer-events-none z-[1]">
				<div ref={top} className="text-9xl mt-[5.5rem]">
					365 DAYS
				</div>
				<div ref={bot} className="text-9xl mb-[6rem]">
					TOGETHER
				</div>
			</div> */}

			<div className="fixed w-full h-screen">
				<MyCanvas />
			</div>
		</div>
	);
}

export default App;

