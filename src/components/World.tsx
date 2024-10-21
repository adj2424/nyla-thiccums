/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { Color } from 'three';
import { MovingGroup } from './MovingGroup';
import { state } from '../constants';
import { MyHtml } from './html/Html';

interface WorldProps {
	setIsSplineComplete: (arg: boolean) => void;
}

export const World = ({ setIsSplineComplete }: WorldProps) => {
	const [cursor, setCursor] = useState({ x: 0, y: 0 });
	const [pageState, setPageState] = useState<state>(state.HERO);
	const cameraRef = useRef() as any;
	const scroll = useScroll();
	const { scene } = useThree();

	useEffect(() => {
		window.addEventListener('mousemove', e => {
			setCursor({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
		});
		scene.background = new Color(255 / 255, 241 / 255, 218 / 255).convertSRGBToLinear();
	}, []);

	useFrame(() => {
		const parallaxX = cursor.x;
		const parallaxY = -cursor.y;
		cameraRef.current.position.x += (parallaxX - cameraRef.current.position.x) * 0.2;
		cameraRef.current.position.y += (parallaxY - cameraRef.current.position.y) * 0.2;
	});

	return (
		<>
			<Html portal={{ current: scroll.fixed }} center position={[0, 0, 3]}>
				<MyHtml
					pageState={pageState}
					setPageState={setPageState}
					scroll={scroll}
					setIsSplineComplete={setIsSplineComplete}
				/>
			</Html>
			<MovingGroup pageState={pageState} />
			<PerspectiveCamera fov={35} ref={cameraRef} makeDefault position={[0, 0, 3]} />
		</>
	);
};
