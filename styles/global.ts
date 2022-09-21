import { createGlobalStyle } from 'styled-components'
import tw from "twin.macro";

export const styles = {
  eng: tw`leading-snug tracking-wider`,
  jpn: tw`text-sm leading-relaxed tracking-wide`,
}

export const GlobalStyle = createGlobalStyle<{ userAgent: string | null }>`
  html {
    /* @apply scroll-smooth; //ページ移管時にスムーズにスクロールして欲しくない */
    ${tw`font-serif leading-normal tracking-wider text-primary accent-main`}//テキスト
    ${tw`scrollbar-thin scrollbar-thumb-main/20`}//スクロールバー
    ${tw`touch-pan-y`}//スクロールバー
    text-size-adjust: 100%;
    text-shadow: 0 1px 0 rgb(255 255 255 / 38%), 0 2px 0 rgb(var(--color-main) / 16%);
    touch-action: pan-y; 
    &::before{
      content: "";
    ${tw`fixed inset-0 w-screen h-screen bg-fixed bg-body -z-1`}
    touch-action: none; 
    }
  }
  body {
    ${props => (props.userAgent === 'Android' ? tw`text-sm` : tw`text-base`)}
  }
`
