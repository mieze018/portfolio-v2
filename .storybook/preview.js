import { decoratorsComponent } from './decorators'
import i18n from './i18next.js'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'ja',
  locales: {
    en: 'English',
    ja: '日本語',
  },
}

export const decorators = [decoratorsComponent]
