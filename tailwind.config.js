/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B71CA',
        secondary: '#9FA6B2',
        success: '#14A44D',
        danger: '#DC4C64',
        warning: '#E4A11B',
        info: '#54B4D3',
        light: '#FBFBFB',
        dark: '#332D2D',
        custom: 'var(--custom-bg-color)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.primary': { 
          'background-color': '#3B71CA', 
          color: 'white' 
        },
        '.secondary': { 
          'background-color': '#9FA6B2', 
          color: 'black' 
        },
        '.success': { 
          'background-color': '#14A44D', 
          color: 'white' 
        },
        '.danger': { 
          'background-color': '#DC4C64', 
          color: 'white' 
        },
        '.warning': { 
          'background-color': '#E4A11B', 
          color: 'white' 
        },
        '.info': { 
          'background-color': '#54B4D3', 
          color: 'white' 
        },
        '.light': { 
          'background-color': '#FBFBFB', 
          color: 'black' 
        },
        '.dark': { 
          'background-color': '#332D2D', 
          color: 'white' 
        },
        '.custom': { 
          'background-color': 'var(--custom-bg-color)', 
          color: 'var(--custom-text-color)' 
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
