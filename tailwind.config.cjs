const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}'
  ],

  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6)/
    }
  ],

  theme: {
    extend: {}
  },

  plugins: [require('@brainandbones/skeleton/tailwind/theme.cjs')],

  darkMode: 'class'
};

module.exports = config;
