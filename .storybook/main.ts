import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-react-i18next',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
}
export default config
