/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        RussianViolet: '#32174D',
        hoverColor: '#523968',
        buttonColor: '#32174D',
        hoverButtonColor: '#735d85',
        underlineHome: '#C77DFF',
        inputTextColor: '#240046'
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, #000099, #32174D, #cc0099)',
        'dark-gradient': 'linear-gradient(to right, #121212, #32174D, #240046)'
      },
    },
  },
  plugins: [],
}
