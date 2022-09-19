import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { keyframes } from 'styled-components'
import tw, { css } from 'twin.macro'

import { contentsWrapperState } from 'libs/recoil/atoms'

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({
  children,
  $key,
}: {
  children: React.ReactNode
  $key: string
}) => {
  const sunkShort = keyframes`
0% {transform: translate(0, -1em);}
100% {transform: translate(0, 0);}
`
  const ref = useRef<HTMLElement>(null)
  const setContentsWrapperState = useSetRecoilState(contentsWrapperState)
  useEffect(() => {
    setContentsWrapperState(ref.current)
  }, [setContentsWrapperState, ref, $key])
  useEffect(() => {
    //現在のスクロール位置がコンテンツラッパーより下ならコンテンツラッパーの上部までスクロール
    // if (window.scrollY > 0) ref.current?.scrollIntoView(true)
  }, [])
  return (
    <AnimatePresence
      mode="wait"
      // onExitComplete={() => {
      //   ref.current?.scrollIntoView(true)
      // }}
    >
      <motion.section
        ref={ref}
        key={$key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        css={[
          tw`relative px-0 py-6 top-golden38vh pt-golden23vh`,
          css`
            transform: translate(0, -10em);
            animation: ${sunkShort} 3s 0s ease-out forwards;
          `,
        ]}
        onLoad={() => setContentsWrapperState(ref.current)}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}
