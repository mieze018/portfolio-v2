import { createGlobalStyle } from 'styled-components'
import tw from 'twin.macro'

// const styles = {
//   eng: tw`leading-snug tracking-wider`,
//   jpn: tw`text-sm leading-relaxed tracking-wide`,
// }

export const GlobalStyle = createGlobalStyle`
  html {
  }
  body {
    /* @apply scroll-smooth; //ページ移管時にスムーズにスクロールして欲しくない */
    ${tw`font-serif text-sm leading-normal tracking-wider text-primary accent-main/60 caret-main/60 md:text-base`}//テキスト
    text-size-adjust: 100%;
    text-shadow: 0 1px 0 rgb(255 255 255 / 38%), 0 2px 0 rgb(var(--color-main) / 16%);
    &::before{
      content: "";
    ${tw`fixed inset-0 block w-full h-full min-h-screen bg-body -z-1`}//背景
    }
  }
    ::selection {
      ${tw`bg-main/30 text-primary`}//選択範囲
}
`
