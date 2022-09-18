import { motion } from 'framer-motion'
import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

const sunk = keyframes`
  0% {opacity: 0;transform: translate(0, -3em);}
  1% {opacity: 0.618;transform: translate(0, -1em);}
  100% {opacity: 1;transform: translate(0, 0);}
`

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
  ${tw`sticky w-full m-auto z-10 mb-0 text-sm text-center min-h-[2em] 
      mt-golden23vh top-0
  `}
`
