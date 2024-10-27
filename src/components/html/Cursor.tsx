/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

interface CursorProps {
	cursorRef: any;
}

export const Cursor = ({ cursorRef }: CursorProps) => {
	const color = '#263FCC';
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
			<svg width="5rem" height="5rem" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M104.613 165C62.4895 136.517 97.2059 92.081 125 137.46"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M259 133.798C279.706 100.527 328.781 104.891 298.253 150"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M161.153 159C160.362 154.1 162.845 149.364 164 145"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M194 165C194.409 156.616 194.948 148.211 196 140"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M228 159C228 154.661 228 150.329 228 146"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M153 223C160.473 220.915 168.386 220.023 176 219"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M225 219C232.895 217.426 240.281 217.931 248 219"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M188 256.005C221.5 238.742 217.338 264.602 191.479 260.565"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M201 267C199.054 288.306 181.973 290.175 167 283.734"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M200.041 267C198.864 295.299 223.581 291.006 237 277.407"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M111 243C96.3264 238.228 80.8117 237.965 66 236"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M116 267C99.8675 270.808 83.7433 273.752 68 279"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M293 233C304.501 229.96 315.688 225.62 327 222"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M297 261C308.857 259.497 322.138 260.027 333 260.429"
					stroke={color}
					strokeWidth="16"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
			</svg>
		</div>
	);
};
