import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { keyframes } from 'styled-components'
import tw, { css } from 'twin.macro'

import { contentsWrapperState } from 'libs/recoil/atoms'

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({ children }: { children: React.ReactNode }) => {
  const sunkShort = keyframes`
0% {transform: translate(0, -1em);}
100% {transform: translate(0, 0);}
`
  const ref = useRef<HTMLElement>(null)
  const setContentsWrapperState = useSetRecoilState(contentsWrapperState)
  useEffect(() => {
    if (ref === null) return
    if (!ref === null) setContentsWrapperState(ref.current)
    console.log(`ContentsWrapper:${ref?.current?.scrollTop}`)
  }, [setContentsWrapperState, ref])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
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
