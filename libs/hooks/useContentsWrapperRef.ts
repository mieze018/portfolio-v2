// libs/hooks/useContentsWrapperRef.ts
import { useSetAtom } from 'jotai'
import { useCallback, useRef } from 'libs/reactCompat'
import { contentsWrapperState } from 'libs/states/atoms'

/**
 * ContentsWrapper の DOM ref 管理 + Jotai 状態セット + 初回マウントスクロール
 *
 * Why: ContentsWrapper から ref 管理・状態セット・初回スクロールの3責務を抽出。
 * コンポーネントを薄いラッパーにして Storybook テスタビリティを向上させる。
 *
 * @param routeKey - 現在のルートキー。"/" の場合は初回スクロールをスキップ
 */
export const useContentsWrapperRef = (routeKey: string) => {
  const ref = useRef<HTMLElement | null>(null)
  const setContentsWrapper = useSetAtom(contentsWrapperState)
  const hasMounted = useRef(false)
  // Why: AnimatePresence の exit 中は遷移先の DOM がまだない。
  // routeKey の effect ではなく、実際の DOM の接続時に参照とスクロールを更新する。
  const attachRef = useCallback(
    (element: HTMLElement | null) => {
      ref.current = element
      setContentsWrapper(element)
      if (!element) return
      const shouldScroll = hasMounted.current || routeKey !== '/'
      hasMounted.current = true
      if (shouldScroll) {
        requestAnimationFrame(() => {
          if (ref.current === element && element.isConnected) element.scrollIntoView(true)
        })
      }
    },
    [setContentsWrapper, routeKey]
  )

  return { ref, attachRef }
}
