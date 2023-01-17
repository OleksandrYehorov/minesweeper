import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    viewportWidth: 1280,
    viewportHeight: 720,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        ...viteConfig,
        mode: 'test',
      },
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
