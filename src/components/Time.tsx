import { Canvas, useFrame } from '@react-three/fiber';
import { Html, ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Camera } from './Camera';
import { PictureGroup } from './PictureGroup';
import { useRef } from 'react';

export const Time = () => {
	const ref = useRef() as any;

	useFrame(() => {});

	return <></>;
};
