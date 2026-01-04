/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/assets/**/*.{css}',
    './src/styles/**/*.{css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg,#011A4B,#00594C 55%,#FFD23F)',
      },
      colors: {
        'brand-blue': '#011A4B',
        'brand-green': '#00594C',
        'brand-yellow': '#FFD23F',
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-slow': 'gradient-shift 12s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(.2,.9,.3,1) both',
      },
    },
  },
  safelist: [
    'text-center',
    'bg-black',
    'text-white',
    'font-orbitron',
    'font-inter',
    'animate-fade-in',
    'hover:scale-105',
    'glass-header',
    'glass-footer',
    'menu-item',
    'footer-link',
    'footer-section',
    'footer-heading',
    'footer-logo',
    'footer-social',
    'footer-legal',
  ],
  plugins: [],
}
