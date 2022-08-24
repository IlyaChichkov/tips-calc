/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      sans: ['Space Mono', 'monospace']
    },
    screens: {
      sm: '375px',
      md: '700px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors:{
        'cyan-700': '#00494DFF',
        'cyan-600': '#0C686D',
        'cyan-500': '#29B19F',
        'cyan-400': '#4a686b',
        'cyan-300': '#7F9C9FFF',
        'cyan-200': '#C5E4E7FF',
        'cyan-100': '#edf5f5',
        'white': '#FFFFFFFF',
      },
    },
  },
  plugins: [],
}
