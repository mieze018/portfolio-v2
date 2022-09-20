import { createGlobalStyle } from 'styled-components'
import tw from "twin.macro";

export const styles = {
  eng: tw`leading-snug tracking-wider`,
  jpn: tw`text-sm leading-relaxed tracking-wide`,
}

export const GlobalStyle = createGlobalStyle<{ userAgent: string | null }>`
  body {
    ${props => (props.userAgent === 'Android' ? tw`text-sm` : tw`text-base`)}
  }
`
