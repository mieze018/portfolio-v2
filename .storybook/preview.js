import React from 'react'
import { GlobalStyle } from '../styles/global'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
const storybookDecorator = (storyFn) => (
  <>
    <GlobalStyle />
    {storyFn()}
  </>
)
export const decorators = [storybookDecorator]
