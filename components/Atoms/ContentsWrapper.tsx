import { motion, AnimatePresence } from 'framer-motion'
import { useUserAgent } from 'next-useragent'
import { useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { keyframes } from 'styled-components'
import tw, { css } from 'twin.macro'

import { contentsWrapperState, userAgentState } from 'libs/recoil/atoms'

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({
  children,
  $key,
}: {
  children: React.ReactNode
  $key: string
}) => {
  const [userAgent] = useRecoilState(userAgentState)
  const ua = useUserAgent(userAgent ?? '')

  const sunkShort = keyframes`
  0% {transform: translate(0, -1em);}
  100% {transform: translate(0, 0);}
`
  const ref = useRef<HTMLElement>(null)
  const setContentsWrapperState = useSetRecoilState(contentsWrapperState)

  useEffect(() => {
    setContentsWrapperState(ref.current)
  }, [setContentsWrapperState, ref, $key])

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        //現在のスクロール位置がコンテンツラッパーより下ならコンテンツラッパーの上部までスクロール
        // if (window.scrollY > 0) ref.current?.scrollIntoView(true)
        ref.current?.scrollIntoView(true)
      }}
    >
      <motion.section
        ref={ref}
        key={$key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        css={[
          tw`relative px-0 py-6 top-g-38vh pt-g-14vh`,
          ua?.isDesktop &&
            css`
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
