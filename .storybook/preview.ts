import type { Preview } from '@storybook/react'
import { decoratorsComponent } from './decorators'
import i18n from './i18next.js'

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
