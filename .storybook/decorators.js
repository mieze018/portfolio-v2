import React from 'react'
import { GlobalStyle } from '../styles/global'
import { RecoilRoot } from 'recoil'

export const decoratorsComponent = (Story) => (
  <RecoilRoot>
    <GlobalStyle />
    <Story />
  </RecoilRoot>
)
