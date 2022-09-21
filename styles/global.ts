import { createGlobalStyle } from 'styled-components'
import tw from "twin.macro";

export const styles = {
  eng: tw`leading-snug tracking-wider`,
  jpn: tw`text-sm leading-relaxed tracking-wide`,
}

export const GlobalStyle = createGlobalStyle<{ userAgent: string | null }>`
  html {
    /* @apply scroll-smooth; //ページ移管時にスムーズにスクロールして欲しくない */
    ${tw`font-serif leading-normal tracking-wider bg-fixed text-primary accent-main bg-body`}
    ${tw`scrollbar-thin scrollbar-thumb-main/10`}
    text-size-adjust: 100%;
    text-shadow: 0 1px 0 rgb(255 255 255 / 38%), 0 2px 0 rgb(var(--color-main) / 16%);
  }
  body {
    ${props => (props.userAgent === 'Android' ? tw`text-sm` : tw`text-base`)}
  }
`
