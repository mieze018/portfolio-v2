import { motion } from 'framer-motion'
import { styled } from 'stailwc'

/** 使ってないけどFramer Motionに翻訳前 */
// const sunk = keyframes`
//   0% {opacity: 0;transform: translate(0, -3em);}
//   1% {opacity: 0.618;transform: translate(0, -1em);}
//   100% {opacity: 1;transform: translate(0, 0);}
// `

export const Floater = styled(motion.header).attrs({
  animate: { opacity: [0, 0.618, 1], translateY: [-84, -16, 0] },
  transition: {
    delay: 0.3,
    duration: 3,
    ease: 'easeInOut',
    times: [0, 0.03, 1],
  },
})`
  ${tw`text-sm text-center w-full m-auto
  z-10 mb-0 min-h-[2em] 
  sticky mt-g-23vh top-0 opacity-0
  `}
`
