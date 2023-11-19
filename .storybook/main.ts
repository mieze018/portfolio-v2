import type { StorybookConfig } from '@storybook/nextjs'
const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // 'storybook-addon-swc',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    'storybook-react-i18next',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: true,
    // TODO: ローカルでだけ立ち上がらないので一旦無効化している。SBのアップデート後に再度試す
    reactDocgen: false,
  },
}
export default config
