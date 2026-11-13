// libs/hooks/__tests__/useContentsWrapperRef.test.ts

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { useContentsWrapperRef } from 'libs/hooks/useContentsWrapperRef'
import { contentsWrapperState } from 'libs/states/atoms'
import { createElement, type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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

    expect(result.current.ref).toHaveProperty('current')
    expect(result.current.ref.current).toBeNull()
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

  it('exit 後に DOM が接続されても参照を更新し、遷移先へスクロールする', () => {
    const { result, rerender } = renderHook(({ path }) => useContentsWrapperRef(path), {
      initialProps: { path: '/' },
      wrapper: createWrapper(store),
    })
    const section = document.createElement('section')
    section.scrollIntoView = vi.fn()
    document.body.append(section)
    const frame = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0)
      return 0
    })
    try {
      act(() => result.current.attachRef(section))
      expect(section.scrollIntoView).not.toHaveBeenCalled()
      act(() => result.current.attachRef(null))
      expect(store.get(contentsWrapperState)).toBeNull()
      rerender({ path: '/about' })
      act(() => result.current.attachRef(section))
      expect(store.get(contentsWrapperState)).toBe(section)
      expect(section.scrollIntoView).toHaveBeenCalledWith(true)
    } finally {
      frame.mockRestore()
      section.remove()
    }
  })
})
