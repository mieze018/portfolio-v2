import { motion, AnimatePresence } from 'motion/react'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { cva } from 'class-variance-authority'

import { contentsWrapperState } from 'libs/states/atoms'

/** ページ移管時にトランジションする */
export const ContentsWrapper = ({
  children,
  $key,
}: {
  children: React.ReactNode
  $key: string
}) => {
  const sunkShortAnimation = `
    @keyframes sunkShort {
      0% { transform: translate(0, -0.5em); }
      100% { transform: translate(0, 0); }
    }
  `

  const ref = useRef<HTMLElement>(null)
  const setContentsWrapper = useSetAtom(contentsWrapperState)
  // Why: 初回マウント時のみ `setTimeout(scrollIntoView)` を実行するためのガード。
  // 2回目以降のエフェクト実行時には、自動スクロールを抑止する意図。
  const isInitialMount = useRef(true)

  useEffect(() => {
    setContentsWrapper(ref.current)
    if (isInitialMount.current) {
      isInitialMount.current = false
      if ($key !== '/' && ref.current?.offsetTop)
        setTimeout(() => ref.current?.scrollIntoView(true), 10)
    }
  }, [setContentsWrapper, ref, $key])

  return (
    <>
      <style>{sunkShortAnimation}</style>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Why: onExitComplete時点ではrefが無効な場合があるため、
          // 次のフレームまで待って新しい要素のマウントを確実にする
          requestAnimationFrame(() => {
            ref.current?.scrollIntoView(true)
          })
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
          className={cva('relative px-0 py-6 top-contentWrapperTop pt-contentWrapperTopPadding')()}
          style={{
            animation: 'sunkShort 0.618s 0s ease-out forwards',
          }}
        >
          {children}
        </motion.section>
      </AnimatePresence>
    </>
  )
}
