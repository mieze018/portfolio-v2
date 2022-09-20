import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init)
    return css`
      top: 0; /* 上部のボケを隠すため少し上に上げる */
      ${tw`h-g-23vh duration-[10s,1s,10s]`}
      filter: blur(4px) brightness(1.05);
    `
  if (scrollStates.sunk)
    return css`
      top: -4vh;
      height: calc(4vh + 7em);
      filter: blur(10px) brightness(1.1);
      transition-duration: 10000ms, 1000ms, 10000ms;
    `
  if (scrollStates.sinking)
    return css`
      top: -1vh;
      ${tw`h-g-14vh`}
      filter: blur(1px) brightness(1.01);
      transition-duration: 10000ms, 1000ms, 8000ms;
    `
  return tw``
}
const wave = keyframes`
  0% {transform: matrix(1, 0, 0, 1, 0, 0);}  /* 読み込み時 */
  2% {transform: matrix(1, 0, 0, 0.8, 0, 0);}/* 最初の3秒ほどでここまで沈む */
  10% { transform: matrix(1, 0.02, 0, 0.6, 0, 0);}/* 少し戻る */
  30% {transform: matrix(1, 0.03, 0, 0.8, 0, 0);}/* 少し沈む・水平に  */
  50% {transform: matrix(1, 0.03, 0, 0.7, 0, 0);}/* その後30秒ほどかけて浮き上がる */
  100% {transform: matrix(1, 0.03, 0, 1, 0, 0);}` /* 残り126秒かけて水平に元に戻る */

export const WaterSurface = styled.div`
  ${tw`fixed top-0 z-10 w-full bg-scroll bg-no-repeat h-g-23vh`}
  background-image:url('img/surface.webp');
  filter: blur(0) brightness(1);
  background-size: 120% 100%;
  transition-duration: 10000ms;
  transform-origin: right top;
  transition-property: filter, top, height;
  animation: ${wave} 180s 0s ease-out forwards;
  ${() => scrollAnimation(useScrollState())}
`
