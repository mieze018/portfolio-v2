import { render } from '@testing-library/react'
import type React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Why: jotai の useSetAtom はストア依存なのでモックする
// atom も必要: atoms.ts が atom() を呼び出すため
const mockSetAtom = vi.fn()
vi.mock('jotai', () => ({
  atom: vi.fn(() => ({})),
  useSetAtom: vi.fn(() => mockSetAtom),
}))

import { useContentsWrapperRef } from './useContentsWrapperRef'

// Why: フックが返す ref を DOM 要素に紐づけるためのラッパーコンポーネント
// React は ref.current を useEffect の前にセットするため、
// useEffect 内の ref.current?.offsetTop が正しく評価される
const TestComponent = ({ routeKey }: { routeKey: string }) => {
  const ref = useContentsWrapperRef(routeKey)
  return <div ref={ref as React.RefObject<HTMLDivElement>} />
}

describe('useContentsWrapperRef', () => {
  const originalOffsetTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop')

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    // Why: テスト間で prototype を汚染しないようにリストアする
    if (originalOffsetTop) {
      Object.defineProperty(HTMLElement.prototype, 'offsetTop', originalOffsetTop)
    }
  })

  it('マウント時に setContentsWrapper を ref.current で呼ぶ', () => {
    render(<TestComponent routeKey="/" />)

    // Why: ref.current は div 要素なので null ではなく HTMLElement で呼ばれる
    expect(mockSetAtom).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('アンマウント時に setContentsWrapper(null) で参照をクリアする', () => {
    const { unmount } = render(<TestComponent routeKey="/" />)

    mockSetAtom.mockClear()
    unmount()

    expect(mockSetAtom).toHaveBeenCalledWith(null)
  })

  it('"/" 以外のルートで offsetTop がある場合 scrollIntoView を呼ぶ', () => {
    // Why: jsdom はレイアウト計算しないため offsetTop を手動で設定する
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    const mockScrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    render(<TestComponent routeKey="/about" />)

    vi.advanceTimersByTime(10)

    expect(mockScrollIntoView).toHaveBeenCalledWith(true)
  })

  it('アンマウント時に setTimeout がキャンセルされる', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    HTMLElement.prototype.scrollIntoView = vi.fn()

    const { unmount } = render(<TestComponent routeKey="/about" />)

    // Why: setTimeout 発火前にアンマウントし、clearTimeout が実行されることを確認
    unmount()
    vi.advanceTimersByTime(10)

    // scrollIntoView はキャンセルされているため呼ばれない
    expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('"/" ルートでは scrollIntoView を呼ばない', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    const mockScrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    render(<TestComponent routeKey="/" />)

    vi.advanceTimersByTime(10)

    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('routeKey 変更時、2回目以降の effect では scrollIntoView を実行しない', () => {
    // Why: isInitialMount.current が false になる分岐をカバーする
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    const mockScrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const { rerender } = render(<TestComponent routeKey="/about" />)

    vi.advanceTimersByTime(10)
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
    mockScrollIntoView.mockClear()

    // Why: routeKey を変更して再レンダリングし、2回目の effect を発火させる
    rerender(<TestComponent routeKey="/contact" />)

    vi.advanceTimersByTime(10)
    // 2回目は isInitialMount が false なので scrollIntoView は呼ばれない
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })
})
