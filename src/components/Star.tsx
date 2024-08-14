import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface Props {
	idx: number;
}

export const Star = ({ idx, group }): any => {
	const starRef = useRef() as any;
	const randScale = 1 + Math.random() * 0.5;
	const skip = 30;

	const getRandXCoord = () => {
		return (Math.random() - 0.5) * 22;
	};
	const getRandYCoord = () => {
		return (Math.random() - 0.5) * 18;
	};

	useFrame(state => {
		const time = state.clock.getElapsedTime() + randScale * 10000;
		// past camera send stars back
		if (group.current.position.z - 2 > -starRef.current.position.z) {
			console.log('before camera', group.current.position.z, 'star ', -starRef.current.position.z);
			starRef.current.position.z = -(group.current.position.z + skip);
			starRef.current.position.x = getRandXCoord();
			starRef.current.position.y = getRandYCoord();
			console.log('after camera', group.current.position.z, 'star ', -starRef.current.position.z);
		}
		// stars too far send stars forward to camera
		else if (group.current.position.z + skip < -starRef.current.position.z) {
			console.log(group.current.position.z, -starRef.current.position.z);
			starRef.current.position.z = -group.current.position.z;
			starRef.current.position.x = getRandXCoord();
			starRef.current.position.y = getRandYCoord();
		}
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
		starRef.current.position.x += Math.cos(time * 0.3) * 0.0002;
		starRef.current.position.y += Math.cos(time * 0.6) * 0.0006;
	});
	// [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, 130 * Math.random() - 180];
	return (
		<>
			<mesh
				ref={starRef}
				scale={[randScale, randScale, 1]}
				position={[getRandXCoord(), getRandYCoord(), (-skip / 30) * idx]}
			>
				<planeGeometry args={[0.2 + Math.random() * 0.07, 0.2 + Math.random() * 0.07, 1, 1]} />
				<meshBasicMaterial color="white" toneMapped={false} opacity={1} transparent={true} />
			</mesh>
		</>
	);
};
