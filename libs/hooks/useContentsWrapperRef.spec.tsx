import { render } from '@testing-library/react'
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
// callback ref の接続・切断を React から実際に発生させる
const TestComponent = ({ routeKey }: { routeKey: string }) => {
  const { attachRef } = useContentsWrapperRef(routeKey)
  return <div ref={attachRef} />
}

describe('useContentsWrapperRef', () => {
  const originalOffsetTop = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop')
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView

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
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView
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

    vi.advanceTimersByTime(50)

    expect(mockScrollIntoView).toHaveBeenCalledWith(true)
  })

  it('アンマウント後は予約済みフレームでもスクロールしない', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    HTMLElement.prototype.scrollIntoView = vi.fn()

    const { unmount } = render(<TestComponent routeKey="/about" />)

    // Why: フレーム実行前に切断された DOM にはスクロールしない
    unmount()
    vi.advanceTimersByTime(50)

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

    vi.advanceTimersByTime(50)

    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('routeKey 変更時、新しい対象へスクロールする', () => {
    // Why: 遷移先の DOM の接続時にスクロールすることを検証する
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      get() {
        return 500
      },
      configurable: true,
    })
    const mockScrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    const { rerender } = render(<TestComponent routeKey="/about" />)

    vi.advanceTimersByTime(50)
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
    mockScrollIntoView.mockClear()

    // Why: ルート変更で callback ref の再接続を発生させる
    rerender(<TestComponent routeKey="/contact" />)

    vi.advanceTimersByTime(50)
    expect(mockScrollIntoView).toHaveBeenCalledWith(true)
  })
})
