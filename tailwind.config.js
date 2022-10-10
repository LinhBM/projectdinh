const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#00CDB4',
        secondary: '#FF3B30',
        red: '#FF3B30',
        yellow: '#FFCC00',
        green: '#34C759',
        blue: '#007AFF',
        neutral: {
          100: '#272728',
          200: '#47474C',
          300: '#717278',
          400: '#8A8B93',
          500: '#B0B0B8',
        },
        bg1: '#000000',
        bg2: '#141414',
      },
      boxShadow: {
        sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.05)',
      },
      dropShadow: {
        '3xl': '0px 22px 50px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        fade: {
          '0%,': { opacity: 1 },
          '100%': {
            opacity: 0,
          },
        },
        show: {
          '0%,': { opacity: 0 },
          '100%': {
            opacity: 1,
          },
        },
        slideLeft: {
          from: {
            transform: 'translateX(-200%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        slideLeftOut: {
          from: {
            transform: 'translateX(0px)',
          },
          to: {
            transform: 'translateX(-200%)',
          },
        },
      },
      animation: {
        'fade-out': 'fade 1s linear 1 normal forwards',
        'fade-in': 'show 1s linear 1 normal forwards',
        'slide-left': 'slideLeft 0.5s ease-in 1 normal forwards',
        'slide-left-out': 'slideLeftOut 0.5s ease-out 1 normal forwards',
      },
    },
    container: {
      screens: {
        sm: '375px',
        md: '696px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1480px', // theo deign figma
      },
      padding: '1rem',
      center: true,
    },
  },
  plugins: [
    plugin(function ({ addVariant, addBase, addUtilities }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('first', '&:nth-child(1)')
      addVariant('second', '&:nth-child(2)')
      addVariant('third', '&:nth-child(3)')
      addUtilities({
        '.scrollbar-none-height': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
  ],
}
