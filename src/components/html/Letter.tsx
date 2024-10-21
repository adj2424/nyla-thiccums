interface LetterProps {
	onMouseHover: (id: string | null) => void;
	onMouseAway: () => void;
	toGallery: () => void;
}

const Letter = ({ onMouseHover, onMouseAway, toGallery }: LetterProps) => {
	return (
		<div
			id="letter-container"
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
			<div className="px-[6rem] text-[2.5rem] mt-[5rem]">10/15/2024</div>
			<div className="px-[6rem] text-[2.5rem] mt-[5rem]">Happy One Year Anniversary Trinity 💝</div>
			<div className="px-[6rem] text-[2.5rem] mt-[5rem]">
				As you can see this letter is quite different than the others I made for you. I have dedicated this to create a
				special letter for my special girlfriend. A year ago, I like to think to myself wondering what the future would
				hold for me and never would I thought that I would be with a beautiful and loving girlfriend named Trinity. My
				year with you has been truly magical and I will never forget all the memories we have made together. When we
				first started dating, I didn't know what I was getting into but I knew I just had to be with you. Showing me the
				Deco rooftop made me feel like the most special person ever, the view of the city skyline was almost as
				breathtaking as you. Whenever I am with you, you have always taken care of me with a level of care that I don't
				even give to myself. When I fell ill with you in Richmond, your yummy meals tastes like no other. When I knock
				on your apartment door and see you in person after a long break, your soft touch feels like no other. When I
				listen to you yap about anything, you make make me laugh like no other. When we cuddle on your tiny inescapable
				twin XL bed and I squeeze your buccal fat pads, it feels like no other. You truly are someone so special to me
				and I am forever grateful for everything. Not only are you super duper caring, but you are also someone I can be
				vulnerable with and rely on. Your chef lessons been super fun teaching me new ways to create dishes. Sharing a
				successful meal that we made together are always so amazing, our teamwork is unparalleled. Though I still think
				tomatoes and eggs is the most op meal ever. Throughout our relationship your hard work doesn't go unnoticed, I
				am so proud of us making it to one year. All relationships has ups and downs and I know we can do it together.
				Your kindness, affection and warmth is truly a gift. I can't appreciate enough for everything that you have done
				for me. Your love is beautiful. Happy one year anniversary!
			</div>
			<div className="px-[6rem] text-[2.5rem] mt-[5rem] text-right">With all my heart 💖</div>
			<div className="px-[6rem] text-[2.5rem] mt-[1rem] mb-[5rem] text-right">Alan Jiang</div>
		</div>
	);
};

export default Letter;
