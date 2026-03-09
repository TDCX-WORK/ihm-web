/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#f5f2ec',
        ink: '#111111',
        accent: '#E8180C',
        muted: '#888888',
        border: '#d8d4cc',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fall: {
          '0%': { transform: 'translateY(-120px) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'translateY(10px) rotate(5deg)', opacity: '1' },
          '80%': { transform: 'translateY(-6px) rotate(-2deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '1' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        fall: 'fall 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        floatY: 'floatY 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
