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
        sage: {
          50: "#f4f7f2",
          100: "#e5ede2",
          200: "#ccdbc6",
          300: "#a6c09e",
          400: "#7a9f71",
          500: "#5a8252",
          600: "#476840",
          700: "#395335",
          800: "#2f432b",
          900: "#263724",
        },
        cream: "#F8F6F1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
