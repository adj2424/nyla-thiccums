import { Canvas, useThree } from '@react-three/fiber';
import { Html, ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Camera } from './Camera';
import { PictureGroup } from './PictureGroup';
import { Time } from './Time';

import '../test.css';

gsap.registerPlugin(ScrollTrigger);

const MyCanvas = () => {
	return (
		<>
			{/* <p className="absolute w-full bg-slate-50 z-[5] text-xl">
				<span className="mix-blend-difference">HIIIIIIIIIIII</span>
			</p> */}
			<Canvas className="">
				<Camera />
				<ScrollControls pages={25} damping={0.5}>
					<PictureGroup />
					<Time />
				</ScrollControls>
			</Canvas>
		</>
	);
};

export default MyCanvas;
