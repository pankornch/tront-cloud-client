module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				main: {
					"blue": "#2680fe",
					"blue-light": "#9DC6FF",
					"light": "#E6EEFF",
					"dark": "#324567",
					"dark-light": "#5A719D",
					"red": "#E84444",
					"green": "#2FCE2C"
				}
			}
		},
	},
	plugins: [],
	corePlugins: {
		container: false,
	},
	mode: 'jit',
}
