// libs/hooks/__tests__/useScrollState.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider, createStore } from 'jotai'
import { createElement, type ReactNode } from 'react'

import { useScrollState } from 'libs/useScrollState'
import { contentsWrapperState } from 'libs/states/atoms'

// Why: motion/react の useScroll は DOM に依存するため、テスト環境ではモックする。
// MotionValue は on("change", cb) コールバック登録に必要なため、最低限のモックを提供。
vi.mock('motion/react', () => ({
  useScroll: vi.fn(() => ({
    scrollY: {
      get: () => 0,
      on: vi.fn(() => () => {}),
    },
  })),
}))

const createWrapper = (store: ReturnType<typeof createStore>) => {
  return ({ children }: { children: ReactNode }) => createElement(Provider, { store }, children)
}

describe('useScrollState', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
  })

  it('初期状態では init=true, sinking=false, sunk=false を返す', () => {
    const { result } = renderHook(() => useScrollState(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.init).toBe(true)
    expect(result.current.sinking).toBe(false)
    expect(result.current.sunk).toBe(false)
  })

  it('contentsWrapper が未設定の場合、defaultScrollTop (500) をフォールバックに使う', () => {
    const { result } = renderHook(() => useScrollState(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.contentsWrapperScrollTop).toBe(500)
  })

  it('contentsWrapper が設定された場合、その offsetTop を使う', () => {
    const mockElement = { offsetTop: 344 } as HTMLElement
    store.set(contentsWrapperState, mockElement)

    const { result } = renderHook(() => useScrollState(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.contentsWrapperScrollTop).toBe(344)
  })
})
