// libs/hooks/useContentsWrapperRef.ts
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'

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
  const ref = useRef<HTMLElement>(null)
  const setContentsWrapper = useSetAtom(contentsWrapperState)
  // Why: 初回マウント時のみ scrollIntoView を実行するためのガード。
  // 2回目以降のエフェクト実行時には、自動スクロールを抑止する意図。
  const isInitialMount = useRef(true)

  useEffect(() => {
    let timeoutId: number | null = null

    setContentsWrapper(ref.current)
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (routeKey !== '/' && ref.current?.offsetTop) {
        timeoutId = window.setTimeout(() => ref.current?.scrollIntoView(true), 10)
      }
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, [setContentsWrapper, ref, routeKey])

  return ref
}
