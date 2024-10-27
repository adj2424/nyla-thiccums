interface AboutProps {
	onMouseHover: (id: string | null) => void;
	onMouseAway: () => void;
	toGallery: () => void;
}

export const About = ({ onMouseHover, onMouseAway, toGallery }: AboutProps) => {
	return (
		<div
			id="about-container"
			className={`absolute items-center bottom-[-80%] w-[70rem] h-[80%] font-oswald font-medium bg-light text-dark overflow-auto mt-[10rem]
border-t-4 border-l-4 border-r-4 border-dark rounded-t-2xl
scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-dark`}
		>
			<div
				className="sticky top-0 float-right p-[1rem] text-[1.5rem] overflow-hidden"
				onClick={toGallery}
				onMouseEnter={() => {
					onMouseHover(null);
				}}
				onMouseLeave={onMouseAway}
			>
				<svg
					id="close"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={3}
					stroke="#203D99"
					className="size-8 "
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</div>
			<div className="px-[6rem] text-[3rem] mt-[4rem]">10/25/2024</div>
			<div className="px-[6rem] text-[3rem] mt-[4rem]">
				Nyla Thiccums is the fluffiest and cutest cat ever! She is a tabby cat who loves to roam around and explore new
				places. She was adopted at the Montgomery Animal Shelter in 2022 when she was 1 years old. She is full of life
				and excitement! With the sounds of her food being poured in her food bowl, she becomes relentless with her
				zoomies. Just make sure shes eating actual food and no toys! She spends her day looking for the coziest places
				to nap whether it would be an amazon package box, under the bed or any warm. She could stay there napping for
				over 18 hours. When she is awake, her favorite activities are looking innocent after knocking things off the
				table, admiring the lawn outside through the window and chasing red dots. With her intensive day, she loves to
				wind down by getting lots of head scratches and being held. Her fur is just too poofy :3
			</div>
			<div className="px-[6rem] text-[3rem] mt-[6rem] mb-[5rem] text-right">Meow 🐾</div>
		</div>
	);
};
