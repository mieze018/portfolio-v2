import { decoratorsComponent } from './decorators'
import { addParameters } from '@storybook/react'
import { withI18n } from 'storybook-addon-i18n'
addDecorator(withI18n)
addParameters({
  i18n: {
    provider: I18nProviderWrapper,
    providerProps: {
      i18n,
    },
    supportedLocales,
  },
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [decoratorsComponent]
