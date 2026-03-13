// libs/hooks/__tests__/usePageTransitionScroll.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { type RefObject } from 'react'

import { usePageTransitionScroll } from 'libs/hooks/usePageTransitionScroll'

describe('usePageTransitionScroll', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('onExitComplete コールバックを返す', () => {
    const mockRef = { current: null } as RefObject<HTMLElement | null>
    const { result } = renderHook(() => usePageTransitionScroll(mockRef))

    expect(typeof result.current.onExitComplete).toBe('function')
  })

  it('onExitComplete 実行時に requestAnimationFrame 経由で scrollIntoView を呼ぶ', () => {
    const mockScrollIntoView = vi.fn()
    const mockRef = {
      current: { scrollIntoView: mockScrollIntoView } as unknown as HTMLElement,
    } as RefObject<HTMLElement | null>

    const { result } = renderHook(() => usePageTransitionScroll(mockRef))

    result.current.onExitComplete()

    expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(1)
    expect(mockScrollIntoView).toHaveBeenCalledWith(true)
  })

  it('ref.current が null の場合、onExitComplete は安全にスキップする', () => {
    const mockRef = { current: null } as RefObject<HTMLElement | null>
    const { result } = renderHook(() => usePageTransitionScroll(mockRef))

    expect(() => result.current.onExitComplete()).not.toThrow()
  })
})
