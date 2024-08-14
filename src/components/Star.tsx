import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface Props {
	idx: number;
}

export const Star = ({ idx, group }): any => {
	const starRef = useRef() as any;
	const randX = Math.random() * 5;
	const randY = Math.random() * 5;
	const randScale = 1 + Math.random() * 0.5;

	useFrame(state => {
		// if (group.current.position.z + 60 < 2.5 * idx) {
		// 	gsap.to(starRef.current.material, {
		// 		opacity: 0,
		// 		duration: 0.7,
		// 		ease: 'expoScale(0.5,7,none)'
		// 	});
		// } else {
		// 	gsap.to(starRef.current.material, {
		// 		opacity: 1,
		// 		duration: 0.7,
		// 		ease: 'expoScale(0.5,7,none)'
		// 	});
		// }
		// starRef.current.position.x += Math.cos(state.clock.getElapsedTime() * 0.35 + randY) * 0.0004;
		// starRef.current.position.y += Math.cos(state.clock.getElapsedTime() * 0.4 + randX) * 0.00065;
	});
	return (
		<>
			<mesh
				ref={starRef}
				scale={[randScale, randScale, 1]}
				position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, -idx * 2.5]}
			>
				<planeGeometry args={[0.2 + Math.random() * 0.06, 0.2 + Math.random() * 0.06, 1, 1]} />
				<meshBasicMaterial color="white" toneMapped={false} opacity={1} transparent={true} />
			</mesh>
		</>
	);
};
