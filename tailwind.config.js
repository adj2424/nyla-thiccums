import scrollbarPlugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				fuzzyBubbles: ['Fuzzy Bubbles', 'sans-serif'],
				oswald: ['Oswald', 'sans-serif']
			}
		}
	},
	plugins: [scrollbarPlugin({ nocompatible: true, preferredStrategy: 'pseudoelements' })]
};

