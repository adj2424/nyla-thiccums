import { useEffect, useState } from 'react';
import './App.css';
import { ScrollControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { World } from './components/World';
import { Loading } from './components/Loading';

function App() {
	const [isSplineComplete, setIsSplineComplete] = useState(false);
	const [isLoadersComplete, setIsLoadersComplete] = useState(false);
	const { active } = useProgress();
	// context provider doesn't work fsr with r3f????????
	// https://github.com/pmndrs/react-three-fiber/issues/262 - too lazy to fix

	useEffect(() => {
		if (active === false) {
			setIsLoadersComplete(true);
		}
	}, [active]);

	return (
		<>
			<Loading isComplete={isLoadersComplete && isSplineComplete} />
			<div className="fixed w-full h-screen">
				<Canvas>
					<ScrollControls pages={28} damping={0.5}>
						<World setIsSplineComplete={setIsSplineComplete} />
					</ScrollControls>
				</Canvas>
			</div>
		</>
	);
}

export default App;

