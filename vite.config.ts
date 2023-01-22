import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer');

const manifest: Partial<ManifestOptions> = {
  short_name: 'Minesweeper',
  name: 'Minesweeper Game',
  scope: '/minesweeper/',
  start_url: '/minesweeper/',
  icons: [
    {
      src: 'android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'maskable-icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
  theme_color: '#008080',
  background_color: '#008080',
  display: 'standalone',
  shortcuts: [
    {
      name: 'Beginner',
      description: 'Play beginner level',
      url: '/minesweeper/?difficulty=beginner',
    },
    {
      name: 'Intermediate',
      description: 'Play intermediate level',
      url: '/minesweeper/?difficulty=intermediate',
    },
    {
      name: 'Expert',
      description: 'Play expert level',
      url: '/minesweeper/?difficulty=expert',
    },
  ] as ManifestOptions['shortcuts'],
};

export default defineConfig({
  base: '/minesweeper/',
  plugins: [
    react(),
    vanillaExtractPlugin(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest,
    }),
  ],
  server: {
    host: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
