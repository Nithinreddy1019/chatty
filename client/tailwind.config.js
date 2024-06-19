/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
  //   plugin(({ addBase, theme }) => {
  //     addBase({
  //         '.scrollbar': {
  //             overflowY: 'auto',
  //             scrollbarColor: `${theme('colors.blue.500')} `,
  //             scrollbarWidth: 'thin',
  //         },
  //         // '.scrollbar::-webkit-scrollbar': {
  //         //     height: '2px',
  //         //     width: '2px',
  //         // },
  //         // '.scrollbar::-webkit-scrollbar-thumb': {
  //         //     backgroundColor: theme('colors.blue.500'),
  //         // },
  //         // '.scrollbar::-webkit-scrollbar-track-piece': {
  //         //     backgroundColor: theme('colors.blue.300'),
  //         // },
  //     });
  // }),
  ],
}

