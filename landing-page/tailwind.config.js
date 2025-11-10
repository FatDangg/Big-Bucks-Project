/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f4dee',
          dark: '#1536a8',
        },
        secondary: '#0f172a',
      },
    },
  },
  plugins: [],
}
