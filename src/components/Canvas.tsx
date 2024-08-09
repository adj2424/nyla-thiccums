import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PictureGroup } from './PictureGroup';
import { World } from './World';

gsap.registerPlugin(ScrollTrigger);

const MyCanvas = ({ setColorIdx }: any) => {
	return (
		<>
			{/* <p className="absolute w-full bg-slate-50 z-[5] text-xl">
				<span className="mix-blend-difference">HIIIIIIIIIIII</span>
			</p> */}

			<Canvas>
				<ScrollControls pages={25} damping={0.5}>
					<PictureGroup />
					<World setColorIdx={setColorIdx} />
					{/* <Time /> */}
				</ScrollControls>
			</Canvas>
		</>
	);
};

export default MyCanvas;
