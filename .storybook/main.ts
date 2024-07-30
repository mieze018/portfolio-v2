import type { StorybookConfig } from '@storybook/nextjs'
const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    'storybook-react-i18next',
    '@chromatic-com/storybook',
  ],
  docs: {},
  typescript: { check: false },
}
export default config
