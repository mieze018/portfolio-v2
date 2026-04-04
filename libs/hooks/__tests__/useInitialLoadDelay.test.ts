import { renderHook, waitFor } from '@testing-library/react'
import { useInitialLoadDelay } from 'libs/hooks/useInitialLoadDelay'
import { describe, expect, it } from 'vitest'

describe('useInitialLoadDelay', () => {
  it('初回マウント後は 0 になり、2回目以降のマウントでは最初から 0 を返す', async () => {
    const firstHook = renderHook(() => useInitialLoadDelay(0.3))

    await waitFor(() => {
      expect(firstHook.result.current).toBe(0)
    })

    const secondHook = renderHook(() => useInitialLoadDelay(0.3))

    expect(secondHook.result.current).toBe(0)
  })
})
