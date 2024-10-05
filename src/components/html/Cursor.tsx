/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

interface CursorProps {
	cursorRef: any;
}

export const Cursor = ({ cursorRef }: CursorProps) => {
	const cursorSizeRef = useRef() as any;
	useEffect(() => {
		if (cursorSizeRef.current?.width === undefined) {
			cursorSizeRef.current = cursorRef.current.getBoundingClientRect();
		}
		window.addEventListener('mousemove', e => {
			cursorRef.current.style.left = `${e.clientX - cursorSizeRef.current.width / 2}px`; // Set left position
			cursorRef.current.style.top = `${e.clientY - cursorSizeRef.current.height / 2}px`; // Set top position
		});

		window.addEventListener('mousedown', () => {
			cursorRef.current.style.transform = 'scale(0.5)';
		});
		window.addEventListener('mouseup', () => {
			cursorRef.current.style.transform = 'scale(1)';
		});
	}, []);

	return (
		<div
			id="cursor"
			className="absolute z-[3] pointer-events-none top-[5rem] left-[5rem] transition ease-in-out duration-500"
			ref={cursorRef}
		>
			<svg width="4rem" height="4rem" viewBox="0 0 24.00 24.00" fill="none">
				<path
					d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
					stroke="#E33529"
					strokeWidth="1.25"
				></path>
			</svg>
		</div>
	);
};
