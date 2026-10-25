import { cva } from 'class-variance-authority'
import { useContentsWrapperRef } from 'libs/hooks/useContentsWrapperRef'
import { useInitialLoadDelay } from 'libs/hooks/useInitialLoadDelay'
import { usePageTransitionScroll } from 'libs/hooks/usePageTransitionScroll'
import { AnimatePresence, motion } from 'motion/react'

const sunkShortAnimation = `
  @keyframes sunkShort {
    0% { transform: translate(0, -0.5em); opacity: 0; }
    100% { transform: translate(0, 0); opacity: 1; }
  }
`

/**
 * ページコンテンツのラッパー。ページ遷移アニメーションと CSS レイアウトのみを担当。
 *
 * Why: ロジック（ref管理・状態セット・スクロール制御・初回ロード判定）は hooks に委譲し、
 * このコンポーネントは AnimatePresence + motion.section + CSS のみを担う。
 * これにより Storybook でのプレビューが容易になる。
 */
export const ContentsWrapper = ({
  children,
  $key,
}: {
  children: React.ReactNode
  $key: string
}) => {
  const { ref, attachRef } = useContentsWrapperRef($key)
  const { onExitComplete } = usePageTransitionScroll(ref)
  const initialDelay = useInitialLoadDelay(1)

  return (
    <>
      <style>{sunkShortAnimation}</style>
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <motion.section
          ref={attachRef}
          key={$key}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: initialDelay }}
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
