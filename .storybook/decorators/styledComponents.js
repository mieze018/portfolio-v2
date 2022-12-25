import React from 'react'
import { GlobalStyle } from '../../styles/global'

export const styledComponentsDecorator = (storyFn) => (
  <>
    <GlobalStyle />
    {storyFn()}
  </>
)
