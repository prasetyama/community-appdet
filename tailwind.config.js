/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
    colors: {
      fibrGreen: '#0fb286',
      fibrNavy: '#032539'
    },
  },
  plugins: []
};
