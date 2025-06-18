/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      colors: {
        cream: '#FFF5E6',
        lightBlue: '#E6F3FF',
        sage: '#CAD2C5',
        softblue: '#A2D2FF',
        darkgray: '#1A1A1A',
        lightpink: '#FFE4E1',
        lightblue: '#ADD8E6', // New light blue color for text
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};