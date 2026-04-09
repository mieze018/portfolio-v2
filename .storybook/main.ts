import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/nextjs-vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../pages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  features: {
    experimentalComponentsManifest: true,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-mcp',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      // Why: @storybook/nextjs-vite の NextImage がローカル Storybook で object として
      // 解決されるケースがあり、Post story などが描画不能になる。
      // Vitest の storybook project と同じ軽量 img モックへ寄せて、実運用と VRT を安定させる。
      'next/image': path.resolve(dirname, './mocks/next-image.tsx'),
    }

    return config
  },
  staticDirs: ['../public'],
}
export default config
