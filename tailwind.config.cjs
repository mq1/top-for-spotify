/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#22c55e',
					secondary: '#f59e0b',
					accent: '#1FB2A6',
					neutral: '#191D24',
					'base-100': '#2A303C',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272'
				}
			}
		]
	}
};
