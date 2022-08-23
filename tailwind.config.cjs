/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			height: {
				"128": "32rem",
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
