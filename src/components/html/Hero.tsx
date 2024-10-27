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
				scene="https://prod.spline.design/fFdWC3lEg-ElMvS3/scene.splinecode"
			/>
			<div className="absolute bg-medium w-[200px] h-[10%] right-0 bottom-0"></div>
			<div className="flex w-screen h-screen bg-medium">
				<div className="flex items-end w-[50%] font-fuzzyBubbles font-bold">
					<div className="ml-[5rem] text-[25rem] leading-none text-dark">NYLA</div>
				</div>
				<div className="flex flex-col items-center justify-center w-[50%] font-oswald text-dark">
					<div className="text-[4rem]"> THE BEST CAT</div>
					<div
						className="relative font-oswald text-[3rem] mt-[0.5rem] px-[1rem] z-[1] rounded-2xl border-dark bg-dark text-white overflow-hidden"
						onMouseEnter={() => {
							onMouseHover('#enter');
						}}
						onMouseLeave={onMouseAway}
						onClick={toGallery}
					>
						<div id="enter">ENTER</div>
					</div>
				</div>
			</div>
		</div>
	);
};
