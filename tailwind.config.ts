import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        penacova: "rgb(var(--penacova-red-rgb) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-mute": "rgb(var(--ink-mute-rgb) / <alpha-value>)",
        muted: "rgb(var(--gray-500-rgb) / <alpha-value>)",
        hairline: "rgb(var(--gray-200-rgb) / <alpha-value>)",
        tonal: "rgb(var(--gray-100-rgb) / <alpha-value>)",
      },
      maxWidth: {
        content: "var(--content-max)",
        reading: "var(--reading-max)",
      },
    },
  },
  plugins: [],
};
export default config;
