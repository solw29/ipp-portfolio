import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { allProjects } from './src/data.ts';
// Share the same project collection as HTML generation and navigation.
export default defineConfig({
  base: process.env.PORTFOLIO_BASE || '/',
  build: { rollupOptions: { input: {
    home: resolve('index.html'),
    ...Object.fromEntries(allProjects.map(p=>[p.slug,resolve(`projects/${p.slug}/index.html`)])),
  } } }
});
