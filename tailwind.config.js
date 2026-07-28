/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Forest green — primary brand colour
        brand: {
          50:  '#f0faf4',
          100: '#d9f2e4',
          200: '#b2e4c8',
          300: '#79ceaa',
          400: '#3eb888',
          500: '#1d9d6f',
          600: '#148058',
          700: '#106648',
          800: '#10513b',
          900: '#0e4431',
          950: '#07261c',
        },
        // Deep teal — accent
        accent: {
          50:  '#f0fbfa',
          100: '#ccf4f1',
          200: '#9ae9e3',
          300: '#60d6d0',
          400: '#2fb8b3',
          500: '#199b97',
          600: '#147c7a',
          700: '#136363',
          800: '#134f50',
          900: '#124244',
          950: '#042829',
        },
        // Warm ink — text / neutral (cream-biased greys)
        ink: {
          50:  '#f9f7f4',   // page background — warm cream
          100: '#f2efe9',   // card background
          200: '#e4dfd5',
          300: '#cdc4b5',
          400: '#a89f8d',
          500: '#857a68',
          600: '#6b6053',
          700: '#534a3e',
          800: '#3a3328',   // body text
          900: '#1f1b14',   // headings
        },
        // Gold — highlight / scholarship
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Deep navy — hero / dark sections
        navy: {
          700: '#1a2744',
          800: '#141d35',
          900: '#0d1526',
          950: '#08101e',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(31,27,20,0.06), 0 1px 2px rgba(31,27,20,0.04)',
        'card-hover': '0 12px 32px -8px rgba(31,27,20,0.16), 0 4px 12px -4px rgba(31,27,20,0.08)',
        glow: '0 0 0 4px rgba(29,157,111,0.14)',
        'green-glow': '0 8px 24px -4px rgba(29,157,111,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'dot-cream': 'radial-gradient(circle, #cdc4b5 1px, transparent 1px)',
        'dot-navy': 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out',
        'fade-up':   'fadeUp 0.5s ease-out',
        'slide-down':'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
