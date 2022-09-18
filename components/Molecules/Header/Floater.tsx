import { motion } from 'framer-motion'
import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

const sunk = keyframes`
  0% {opacity: 0;transform: translate(0, -3em);}
  1% {opacity: 0.618;transform: translate(0, -1em);}
  100% {opacity: 1;transform: translate(0, 0);}
`
const fadeIn = keyframes`0% {opacity: 0;}100% {opacity: 1;}`
const fadeOut = keyframes`0% {opacity: 1;}100% {opacity: 0;}`
const fadeOutIn = keyframes`
0% { opacity: 1; }
50% {opacity: 0;}
100% {opacity: 1;}
  `

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init)
    return css`
      /* ${tw`opacity-100 duration-[2s,2s,2s,10s]`}
      animation: ${fadeIn} 3ms 0s ease-in-out forwards; */
    `
  if (scrollStates.sinking)
    return css`
      ${tw`top-[-2em] blur-[6px]`}
      animation: ${sunk} 3s 0s ease-in-out reverse both;
    `
  if (scrollStates.sunk)
    return css`
      ${tw`top-[-2em] blur-1px opacity-100`}
      animation: ${fadeOutIn} 3ms 0.3s ease-in-out forwards;
    `
  return tw``
}
export const Floater = styled(motion.div)<{ $scrollStates: scrollStatesType }>`
  ${tw`fixed w-full m-auto opacity-0 top-golden23vh`}
  transition-property: opacity, filter, top, height;
  transition-duration: 1s, 1s, 1.2s, 10s;
  animation: ${sunk} 10s 0.3s ease-in-out forwards;
  ${({ $scrollStates }) => scrollAnimation($scrollStates)}
`
