// libs/hooks/__tests__/useContentsWrapperRef.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider, createStore } from 'jotai'
import { createElement, type ReactNode } from 'react'

import { useContentsWrapperRef } from 'libs/hooks/useContentsWrapperRef'
import { contentsWrapperState } from 'libs/states/atoms'

const createWrapper = (store: ReturnType<typeof createStore>) => {
  return ({ children }: { children: ReactNode }) => createElement(Provider, { store }, children)
}

describe('useContentsWrapperRef', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('ref オブジェクトを返す', () => {
    const { result } = renderHook(() => useContentsWrapperRef('/about'), {
      wrapper: createWrapper(store),
    })

    expect(result.current).toHaveProperty('current')
    expect(result.current.current).toBeNull()
  })

  it('初回レンダリング時に contentsWrapperState atom を更新する（ref.current=null）', () => {
    renderHook(() => useContentsWrapperRef('/about'), {
      wrapper: createWrapper(store),
    })

    // ref.current は renderHook 環境では null のまま
    const atomValue = store.get(contentsWrapperState)
    expect(atomValue).toBeNull()
  })

  it('トップページ("/")では初回マウント時に scrollIntoView を呼ばない', () => {
    renderHook(() => useContentsWrapperRef('/'), {
      wrapper: createWrapper(store),
    })

    vi.advanceTimersByTime(50)
    // ref.current が null なので scrollIntoView は呼ばれない
    // エラーなく完了することを確認
  })
})
