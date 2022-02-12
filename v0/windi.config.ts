import { defineConfig } from "windicss/helpers";
import typography from "windicss/plugin/typography";

const screens = {
	"<xs": { max: "360px" },
	xs: "360px",
	"<sm": { max: "450px" },
	sm: "450px",
	"<md": { max: "680px" },
	md: "680px",
	"<lg": { max: "950px" },
	lg: "950px",
	"<xl": { max: "1440px" },
	xl: "1440px",
	"<2xl": { max: "1600px" },
	"2xl": "1600px",
};

// see https://cssgradient.io/
// borders
const cBorder1 = "border-gray-500";
// gradients
const cGradient1 = "#ada78e";
const cGradient2 = "#b8b5ad";

export default defineConfig({
	darkMode: `class`,
	// https://windicss.org/posts/v30.html#attributify-mode
	attributify: true,

	plugins: [typography()],
	theme: {
		screens,
		extend: {},
	},
	// https://windicss.org/features/shortcuts.html
	shortcuts: {
		// text
		"wsc-red-text": "text-red-200",
		"wsc-red-bg": "bg-red-700",
		"wsc-green-text": "text-green-200",
		"wsc-green-bg": "bg-green-700",

		// borders
		"wsc-thin-borders": `border-1 ${cBorder1} rounded-lg`,

		// buttons
		"wsc-btn-padding": "px-3 py-2",

		// gradients
		"wsc-text-from": `text-[${cGradient1}]`,
		"wsc-text-to": `text-[${cGradient2}]`,
		"wsc-gradient-r-bg": `bg-gradient-to-r from-[${cGradient1}] to-[${cGradient2}]`,
		"wsc-gradient-r-text": `bg-clip-text text-transparent bg-gradient-to-r from-[${cGradient1}] to-[${cGradient2}]`,
		"wsc-gradient-l-bg": `bg-gradient-to-l from-[${cGradient2}] to-[${cGradient1}]`,
		"wsc-gradient-l-text": `bg-clip-text text-transparent bg-gradient-to-r from-[${cGradient2}] to-[${cGradient1}]`,
		"wsc-border-from": `border-[${cGradient1}]`,
		"wsc-border-to": `border-[${cGradient2}]`,

		// transitions
		"wsc-transition-all": "transition-all duration-300 ease-in-out",
	},
});
