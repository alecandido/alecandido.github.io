import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit({
      adapter: adapter({ strict: true }),
      prerender: {
        handleHttpError: 'warn',
        entries: ['*']
      }
    })
  ]
});
