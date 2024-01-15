import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/nextjs'
const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('storybook-react-i18next'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      builder: {
        useSWC: true, // Enables SWC support
      },
    },
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: false,
  },
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
