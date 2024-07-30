import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Camera } from './Camera';
import { PictureGroup } from './PictureGroup';

gsap.registerPlugin(ScrollTrigger);

const MyCanvas = () => {
	return (
		<>
			<Canvas>
				<Camera />
				<ambientLight intensity={1} />
				<ScrollControls pages={16} damping={0.5}>
					<PictureGroup />
				</ScrollControls>
			</Canvas>
		</>
	);
};

export default MyCanvas;
