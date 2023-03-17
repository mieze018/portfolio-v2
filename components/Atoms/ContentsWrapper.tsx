import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { keyframes } from 'styled-components'
import tw, { css } from 'twin.macro'

import { useContentsWrapper } from 'libs/contexts/contentWrapper'

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({
  children,
  $key,
}: {
  children: React.ReactNode
  $key: string
}) => {
  const sunkShort = keyframes`
  0% {transform: translate(0, -0.5em);}
  100% {transform: translate(0, 0);}
`
  const styles = {
    sunk: css`
      animation: ${sunkShort} 0.618s 0s ease-out forwards;
    `,
  }
  const ref = useRef<HTMLElement>(null)
  const { setContentsWrapper } = useContentsWrapper()

  useEffect(() => {
    setContentsWrapper(ref.current)
    if ($key !== '/' && ref.current?.offsetTop)
      setTimeout(() => ref.current?.scrollIntoView(true), 10)
  }, [setContentsWrapper, ref, $key])

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
        transition={{ duration: 0.2 }}
        onLoad={() => setContentsWrapper(ref.current)}
        css={[
          tw`relative px-0 py-6 top-contentWrapperTop pt-contentWrapperTopPadding`,
          styles.sunk,
        ]}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  )
}
