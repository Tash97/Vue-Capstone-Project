/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      news: ["news", "cursive"],
      professional: ["professional", "cursive"],

    },
    extend: {
      keyframes: {
        slideWeather: {
          '0%': {
            transform: "translateX(0%)"
          },
          '100%': {
            transform: "translateX(-400%)",
          },
          
        }, 
      },
      animation: {
        'slider': 'slideWeather 1.5s forwards ease-in-out',

      },
    },
  },
  plugins: [],
}

