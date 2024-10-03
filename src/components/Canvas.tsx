import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { MovingGroup } from './MovingGroup';
import { World } from './World';
// import { Time } from './Time';

gsap.registerPlugin(ScrollTrigger);

const MyCanvas = () => {
	return (
		<>
			{/* <p className="absolute w-full bg-slate-50 z-[5] text-xl">
				<span className="mix-blend-difference">HIIIIIIIIIIII</span>
			</p> */}

			<Canvas>
				<ScrollControls pages={28} damping={0.5}>
					<World />
				</ScrollControls>
			</Canvas>
		</>
	);
};

export default MyCanvas;
