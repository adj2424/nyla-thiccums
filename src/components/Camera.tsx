import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

export const Camera = () => {
	const ref = useRef() as any;
	const cursor = { x: 0, y: 0 };

	useEffect(() => {
		window.addEventListener('mousemove', e => {
			cursor.x = e.clientX / window.innerWidth - 0.5;
			cursor.y = e.clientY / window.innerHeight - 0.5;
		});
	}, []);

	useFrame(() => {
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		ref.current.position.x += (parallaxX - ref.current.position.x) * 0.2;
		ref.current.position.y += (parallaxY - ref.current.position.y) * 0.2;
	});

	return <PerspectiveCamera fov={30} ref={ref} makeDefault position={[0, 0, 3]} />;
};
