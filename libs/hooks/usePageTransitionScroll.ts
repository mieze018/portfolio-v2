// libs/hooks/usePageTransitionScroll.ts
import { type RefObject, useCallback } from 'react'

/**
 * AnimatePresence の onExitComplete 用コールバックを生成する hook
 *
 * Why: onExitComplete 時点では ref が無効な場合があるため、
 * requestAnimationFrame で次フレームまで待って新しい要素のマウントを確実にする。
 *
 * Trade-off: rAF を使うことでフレーム単位の遅延が入るが、
 * DOM 更新完了後に確実にスクロールできる。
 */
export const usePageTransitionScroll = (ref: RefObject<HTMLElement | null>) => {
  const onExitComplete = useCallback(() => {
    requestAnimationFrame(() => {
      ref.current?.scrollIntoView(true)
    })
  }, [ref])

  return { onExitComplete }
}
