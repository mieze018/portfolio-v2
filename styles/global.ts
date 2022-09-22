import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

import type { UserAgent } from 'next-useragent'

export const styles = {
  eng: tw`leading-snug tracking-wider`,
  jpn: tw`text-sm leading-relaxed tracking-wide`,
}

export const GlobalStyle = createGlobalStyle<{ ua?: UserAgent | null }>`
  html {
  }
  body {
    /* @apply scroll-smooth; //ページ移管時にスムーズにスクロールして欲しくない */
    ${tw`font-serif leading-normal tracking-wider text-primary accent-main/60 caret-main/60`}//テキスト
    text-size-adjust: 100%;
    text-shadow: 0 1px 0 rgb(255 255 255 / 38%), 0 2px 0 rgb(var(--color-main) / 16%);
    ${(props) => (props.ua?.isDesktop ? tw`text-base` : tw`text-sm`)}
    &::before{
      content: "";
    ${tw`fixed inset-0 block w-full h-full min-h-screen bg-body -z-1`}//背景
    }
  }
    ::selection {
      ${tw`bg-main/30 text-primary`}//選択範囲
}
`
