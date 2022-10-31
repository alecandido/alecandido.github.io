import skeletonPlugin from '@brainandbones/skeleton/tailwind/theme.cjs';

export const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}'
  ],

  theme: {
    extend: {}
  },

  plugins: [skeletonPlugin],

  darkMode: 'class'
};
