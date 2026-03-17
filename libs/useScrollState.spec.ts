import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Why: vi.mock は hoist されるため、vi.hoisted() でモック関数を先に宣言する
const { mockOn, mockGet, mockUseAtomValue } = vi.hoisted(() => ({
  mockOn: vi.fn(),
  mockGet: vi.fn(() => 0),
  mockUseAtomValue: vi.fn(() => ({ offsetTop: 500 })),
}))

// Why: motion/react の useScroll はブラウザ環境依存なのでモックする
vi.mock('motion/react', () => ({
  useScroll: vi.fn(() => ({
    scrollY: { get: mockGet, on: mockOn },
  })),
}))

// Why: jotai の useAtomValue はストア依存なのでモックする
// atom も必要: atoms.ts が atom() を呼び出すため
vi.mock('jotai', () => ({
  atom: vi.fn(() => ({})),
  useAtomValue: mockUseAtomValue,
}))

import { useScrollState } from './useScrollState'

describe('useScrollState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGet.mockReturnValue(0)
    mockUseAtomValue.mockReturnValue({ offsetTop: 500 })
    // Why: on() は cleanup 関数を返す想定
    mockOn.mockReturnValue(vi.fn())
  })

  it('初期状態で init: true, sinking: false, sunk: false を返す', () => {
    const { result } = renderHook(() => useScrollState())

    expect(result.current.init).toBe(true)
    expect(result.current.sinking).toBe(false)
    expect(result.current.sunk).toBe(false)
  })

  it('scrollY.on("change") にコールバックを登録し、値変更時に状態を更新する', () => {
    const { result } = renderHook(() => useScrollState())

    expect(mockOn).toHaveBeenCalledWith('change', expect.any(Function))

    // Why: on("change") に渡されたコールバックを手動で呼び出し、setScrollTop が動くことを確認
    const changeCallback = mockOn.mock.calls[0][1]
    act(() => {
      changeCallback(250)
    })

    expect(result.current.scrollTop).toBe(250)
    expect(result.current.sinking).toBe(true)
  })

  it('contentsWrapper が null の場合 defaultScrollTop (500) を使用する', () => {
    // Why: contentsWrapper が null のケースでフォールバック値を使うことを確認
    mockUseAtomValue.mockReturnValue(null)

    const { result } = renderHook(() => useScrollState())

    expect(result.current.contentsWrapperScrollTop).toBe(500)
  })
})
