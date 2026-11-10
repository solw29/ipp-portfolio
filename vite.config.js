import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  base: process.env.PORTFOLIO_BASE || '/',
  build: { rollupOptions: { input: {
    home: resolve('index.html'),
    scopion: resolve('projects/scopion/index.html'),
    shopping: resolve('projects/shopping-qa/index.html'),
    anomaly: resolve('projects/anomaly-detection/index.html'),
    housing: resolve('projects/housing-price/index.html'),
  } } }
});
