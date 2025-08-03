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
        sans: ['var(--font-source-code-pro)', 'Source Code Pro', 'monospace'],
        'source-code-pro': ['var(--font-source-code-pro)', 'Source Code Pro', 'monospace'],
        mono: ['var(--font-source-code-pro)', 'Source Code Pro', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#dc2626', // Red
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
};

export default config;
