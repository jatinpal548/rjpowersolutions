import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1A7A3C',
          orange: '#E07B2A',
          bg: '#FAF8F5',
          'green-light': '#E8F5EE',
        },
        solar: {
          orange: '#F05A28',
          'orange-dark': '#C4461B',
          'orange-tint': '#FEF2ED',
          blue: '#0A2540',
          'blue-dark': '#061626',
          'sky-blue': '#E6EFFF',
          dark: '#1E1E24',
          grey: '#F4F5F7',
          'grey-mid': '#64748B',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-solar': 'linear-gradient(135deg, #0A2540 0%, #1E40AF 50%, #F05A28 100%)',
        'gradient-hero': 'linear-gradient(to bottom right, rgba(10,37,64,0.85) 0%, rgba(10,37,64,0.6) 50%, rgba(240,90,40,0.4) 100%)',
        'gradient-cta': 'linear-gradient(135deg, #F05A28 0%, #C4461B 100%)',
        'gradient-blue': 'linear-gradient(135deg, #1E40AF 0%, #0A2540 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'solar': '0 4px 20px rgba(240,90,40,0.25)',
        'solar-lg': '0 8px 40px rgba(240,90,40,0.35)',
        'blue': '0 4px 20px rgba(10,37,64,0.25)',
        'blue-lg': '0 8px 40px rgba(10,37,64,0.35)',
        'card': '0 2px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
