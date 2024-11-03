// tailwind.config.js
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E54065', 
        backgrnd: '#F4F5F9',
        bordar: '#CFD2DC',
        textt: '#636363',
        filter_btn: '#E1E4EA',
        read_bg: '#F2F2F2',
      },
    },
  },
  plugins: [
    typography, // Add the typography plugin here
  ],
};

export default config;