import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

interface HeroProps {
	onMouseHover: (id: string) => void;
	onMouseAway: () => void;
	toGallery: () => void;
	setIsSplineComplete: (arg: boolean) => void;
}

export const HeroPage = ({ onMouseHover, onMouseAway, toGallery, setIsSplineComplete }: HeroProps) => {
	const [scale, setScale] = useState(1);
	useEffect(() => {
		const width = window.innerWidth;
		if (width < 900) {
			setScale(Number((width / 900).toFixed(2)));
		}
	}, []);

	return (
		<div className="page absolute z-[2]">
			<Spline
				style={{ transform: `scale(${scale})` }}
				className="absolute"
				onLoad={() => {
					setIsSplineComplete(true);
				}}
				scene="https://prod.spline.design/RdlIGAC2FgtRg8PR/scene.splinecode"
			/>
			<div className="absolute bg-medium w-[200px] h-[10%] right-0 bottom-0"></div>
			<div className="grid grid-cols-2 w-screen h-screen bg-medium">
				<div className="flex items-center h-full col-span-2 text-[18rem] text-light">
					<div style={{ flexGrow: 1 }} className="flex items-center justify-center font-fuzzyBubbles font-bold">
						I LOVE
					</div>
					<div
						style={{ flexGrow: 1 }}
						className="relative font-oswald text-[3rem] z-[1] text-dark overflow-hidden"
						onMouseEnter={() => {
							onMouseHover('#enter');
						}}
						onMouseLeave={onMouseAway}
						onClick={toGallery}
					>
						<div id="enter">ENTER</div>
					</div>
				</div>
				<div className="flex items-center justify-center h-full font-oswald text-[3rem] text-dark">
					MY POOKIE BEAR 😻
				</div>
				<div className="flex items-center justify-center h-full font-fuzzyBubbles text-[18rem] font-bold text-light">
					YOU
				</div>
			</div>
		</div>
	);
};
