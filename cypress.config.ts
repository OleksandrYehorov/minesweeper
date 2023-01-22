import { defineConfig } from 'cypress';
import { mergeConfig, UserConfig as ViteConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    viewportWidth: 1280,
    viewportHeight: 720,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: mergeConfig(viteConfig, { mode: 'test' } as ViteConfig),
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
