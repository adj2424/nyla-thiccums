import Spline from '@splinetool/react-spline';

interface HeroProps {
	onMouseHover: (id: string) => void;
	onMouseAway: () => void;
	toGallery: () => void;
}

export const HeroPage = ({ onMouseHover, onMouseAway, toGallery }: HeroProps) => {
	return (
		<div className="page absolute z-[2]">
			<Spline className="absolute" scene="https://prod.spline.design/RdlIGAC2FgtRg8PR/scene.splinecode" />
			<div className="absolute bg-[#f3c3cb] w-[200px] h-[10%] right-0 bottom-0"></div>
			<div className="grid grid-cols-2 w-screen h-screen bg-[#f3c3cb]">
				<div className="flex items-center h-full col-span-2 text-[18rem] text-white ml-[15rem]">
					<div className=" font-fuzzyBubbles font-bold">I LOVE</div>
					<div
						className="relative font-oswald text-[3rem] ml-[15rem] z-[1] text-[#E33529] overflow-hidden"
						onMouseEnter={() => {
							onMouseHover('#enter');
						}}
						onMouseLeave={onMouseAway}
						onClick={toGallery}
					>
						<div id="enter">ENTER</div>
					</div>
				</div>
				<div className="flex items-center h-full font-oswald text-[3rem] ml-[15rem] text-[#E33529]">
					MY POOKIE BEAR 😻
				</div>
				<div className="flex items-center h-full font-fuzzyBubbles text-[18rem] font-bold text-white ml-[15rem]">
					YOU
				</div>
			</div>
		</div>
	);
};
