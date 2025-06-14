import type { Preview } from '@storybook/nextjs'
import { decoratorsComponent } from './decorators'
import i18n from './i18next.js'
import '../styles/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    i18n,
    locale: 'ja',
    locales: {
      en: 'English',
      ja: '日本語',
    },
  },
}

export default preview
export const decorators = [decoratorsComponent]
