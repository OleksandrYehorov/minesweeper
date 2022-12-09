import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    viewportWidth: 1280,
    viewportHeight: 720,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        mode: 'test',
      },
    },
    video: false,
  },
});
