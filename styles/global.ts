import { createGlobalStyle } from 'styled-components'
import tw from "twin.macro";

export const styles = {
  eng: tw`leading-snug tracking-wider`,
  jpn: tw`text-sm leading-relaxed tracking-wide`,
}

export const GlobalStyle = createGlobalStyle<{ userAgent: string | null }>`
  html {
  }
  body {
    /* @apply scroll-smooth; //ページ移管時にスムーズにスクロールして欲しくない */
    ${tw`font-serif leading-normal tracking-wider text-primary accent-main`}//テキスト
    text-size-adjust: 100%;
    text-shadow: 0 1px 0 rgb(255 255 255 / 38%), 0 2px 0 rgb(var(--color-main) / 16%);
    ${props => (props.userAgent === 'Android' ? tw`text-sm` : tw`text-base`)}
    ${tw`scrollbar-thin scrollbar-thumb-main/20`}//スクロールバー
    &::after{
      content: "";
    ${tw`fixed inset-0 block w-full h-full min-h-screen bg-body -z-1`}//背景
    }
  }
`
