import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  features: { experimentalComponentsManifest: true },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-mcp',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (config) => {
    config.resolve ??= {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      libs: fileURLToPath(new URL('../libs', import.meta.url)),
      components: fileURLToPath(new URL('../components', import.meta.url)),
    }
    return config
  },
  staticDirs: ['../public'],
}
export default config
