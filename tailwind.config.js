import scrollbarPlugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				fuzzyBubbles: ['Fuzzy Bubbles', 'sans-serif'],
				oswald: ['Oswald', 'sans-serif']
			},
			colors: {
				dark: '#263FCC', //203D99
				medium: '#FFEFCC', //#FFF1DA
				light: '#ffffff'
			}
		}
	},
	plugins: [scrollbarPlugin({ nocompatible: true, preferredStrategy: 'pseudoelements' })]
};
