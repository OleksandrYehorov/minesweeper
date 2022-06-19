import { defineConfig } from 'vitest/config';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

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
  ] as unknown as [],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['./src/__tests__/*'],
  },
});
