import { motion } from 'framer-motion'
import { keyframes } from 'styled-components'
import tw, { css } from 'twin.macro'

const sunkShort = keyframes`
  0% {
    transform: translate(0, -1em);
  }
  100% {
    transform: translate(0, 0);
  }
`

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      key="ContentsWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      // variants={variants} // Pass the variant object into Framer Motion
      // initial="hidden" // Set the initial state to variants.hidden
      // animate="enter" // Animated state to variants.enter
      // exit="exit" // Exit state (used later) to variants.exit
      // transition={{ type: 'linear' }} // Set the transition to linear
      css={[
        tw`px-0 py-6 mt-golden61vh`,
        css`
          transform: translate(0, -10em);
          animation: ${sunkShort} 3s 0s ease-out forwards;
        `,
      ]}
    >
      {children}
    </motion.section>
  )
}
