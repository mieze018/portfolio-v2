import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Why: Next.js の useRouter はテスト環境に存在しないためモックする
const mockReplace = vi.fn()
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    asPath: '/page#section1',
    replace: mockReplace,
  })),
}))

import { useHash } from './useHash'

describe('useHash', () => {
  it('URL のハッシュ部分を取得できる', () => {
    const { result } = renderHook(() => useHash())
    const [hash] = result.current
    expect(hash).toBe('section1')
  })

  it('setHash でハッシュを変更できる', () => {
    const { result } = renderHook(() => useHash())
    const [, setHash] = result.current

    setHash('newSection')

    expect(mockReplace).toHaveBeenCalledWith({ hash: 'newSection' }, undefined, {
      shallow: true,
      scroll: false,
    })
  })
})
