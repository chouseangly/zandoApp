/** @type {import('tailwindcss').Config} */
const config = {
  // This tells Tailwind to use the 'dark' class to toggle dark mode
  darkMode: 'class', 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;