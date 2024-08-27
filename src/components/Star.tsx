import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { gsap } from 'gsap';

export interface Props {
	idx: number;
	group: any;
	totalStars: number;
}

export const Star = ({ idx, group, totalStars }: Props) => {
	const starRef = useRef() as any;
	const randScale = 1 + Math.random() * 0.5;
	const skip = 60;
	const offset = 25;

	const getRandXCoord = () => {
		return (Math.random() - 0.5) * 18;
	};
	const getRandYCoord = () => {
		return (Math.random() - 0.5) * 15;
	};

	useFrame(state => {
		// scroll down means group position is increasing value
		const time = state.clock.getElapsedTime() + randScale * 10000;

		// if stars are past camera, send stars back
		if (group.current.position.z - skip + offset > -starRef.current.position.z) {
			gsap.fromTo(
				starRef.current.material,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 1,
					ease: 'power1.out'
				}
			);
			starRef.current.position.z = -group.current.position.z - skip + offset + Math.random() * 8;
			starRef.current.position.x = getRandXCoord();
			starRef.current.position.y = getRandYCoord();
		}
		// if stars too far back, send stars in front of camera
		else if (group.current.position.z + skip - offset < -starRef.current.position.z) {
			console.log('opacity changed');
			gsap.timeline().to(starRef.current.material, {
				opacity: 0,
				duration: 0.8,
				onComplete: () => {
					starRef.current.position.z = -group.current.position.z + skip - offset;
					starRef.current.material.opacity = 1;
				}
			});
		}

		starRef.current.position.x += Math.cos(time * 0.3) * 0.0002;
		starRef.current.position.y += Math.cos(time * 0.65) * 0.0006;
	});
	return (
		<>
			<mesh
				ref={starRef}
				scale={[randScale, randScale, 1]}
				position={[getRandXCoord(), getRandYCoord(), (skip / totalStars) * -idx + offset]}
			>
				<planeGeometry args={[0.21 + Math.random() * 0.07, 0.21 + Math.random() * 0.07, 1, 1]} />
				<meshBasicMaterial color="white" toneMapped={false} transparent={true} />
			</mesh>
		</>
	);
};
