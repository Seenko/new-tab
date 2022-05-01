import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'PUBLIC_',
  plugins: [vue(), svgLoader({ svgo: false })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true
  }
});
