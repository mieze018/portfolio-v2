import { motion } from 'framer-motion'
import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

const sunk = keyframes`
  0% {opacity: 0;transform: translate(0, -3em);}
  1% {opacity: 0.618;transform: translate(0, -1em);}
  100% {opacity: 1;transform: translate(0, 0);}
`

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init)
    return css`
      ${tw`
      opacity-0 
      top-golden23vh
      brightness-100
      blur-0
      `}/* animation-name: ${sunk};
      animation-duration: 10s;
      animation-timing-function: ease-in-out;
      animation-delay: 0.3s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: forwards;
      animation-play-state: running;
      animation-timeline: ; */
    `
  if (scrollStates.sinking)
    return css`
      ${tw`
      top-[-4em] 
      brightness-110 
      blur-[6px]
      `}
    `
  if (scrollStates.sunk)
    return css`
      ${tw`top-[-4em] 
      brightness-100 
      blur-1px`}
    `
  return tw``
}
export const Floater = styled(motion.header).attrs({
  animate: { opacity: [0, 0.618, 1], translateY: [-300, -100, 0] },
  transition: {
    delay: 0.3,
    duration: 10,
    ease: 'easeInOut',
    times: [0, 0.01, 1],
  },
})<{
  $scrollStates: scrollStatesType
}>`
  ${tw`fixed w-full m-auto z-10 mb-0 text-sm text-center min-h-[2em]
  `}
  transition-property: opacity, filter, top;
  /* transition-duration: 1s, 1s, 0.2s; */

  ${({ $scrollStates }) => scrollAnimation($scrollStates)}
`
