import React from 'react'
import { GlobalStyle } from '../styles/global'
export const decoratorsComponent = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
)
