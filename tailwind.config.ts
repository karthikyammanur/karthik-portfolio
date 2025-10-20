import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-tomorrow)', 'Tomorrow', 'sans-serif'],
        'tomorrow': ['var(--font-tomorrow)', 'Tomorrow', 'sans-serif'],
        mono: ['var(--font-tomorrow)', 'Tomorrow', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#ff0000', // Neon Red
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc7c7',
          300: '#ff9999',
          400: '#ff6666',
          500: '#ff3333',
          600: '#ff0000',
          700: '#cc0000',
          800: '#990000',
          900: '#660000',
        },
        neon: {
          red: '#ff0000',
          'red-light': '#ff3333',
          'red-dark': '#cc0000',
          'red-glow': 'rgba(255, 0, 0, 0.5)',
        },
        surface: {
          dark: '#0a0a0a',
          darker: '#111111',
          glass: 'rgba(10, 10, 10, 0.7)',
        },
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3)',
        'neon-strong': '0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4)',
        'neon-subtle': '0 0 10px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.2)',
        'glass': '0 0 20px rgba(255, 0, 0, 0.2), 0 0 40px rgba(255, 0, 0, 0.1)',
      },
      textShadow: {
        'neon': '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
        'neon-subtle': '0 0 5px #ff0000, 0 0 10px #ff0000',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
