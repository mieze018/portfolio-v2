import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Provider, createStore } from 'jotai'
import { createElement, type ReactNode } from 'react'

import { useModalControl } from 'libs/hooks/useModalControl'
import { modalPhotoState } from 'libs/states/atoms'
import type { ModalPhoto } from 'libs/states/types'

// Why: useHash は Next.js の useRouter に依存するため、テスト環境ではモックする
const mockSetHash = vi.fn()
vi.mock('libs/useHash', () => ({
  useHash: vi.fn(() => ['', mockSetHash]),
}))

import { useHash } from 'libs/useHash'
const mockUseHash = vi.mocked(useHash)

const createWrapper = (store: ReturnType<typeof createStore>) => {
  return ({ children }: { children: ReactNode }) => createElement(Provider, { store }, children)
}

const testPhoto: ModalPhoto = {
  src: 'https://example.com/photo.jpg',
  width: 800,
  height: 600,
  alt: 'テスト画像',
}

describe('useModalControl', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
    mockSetHash.mockClear()
    mockUseHash.mockReturnValue(['', mockSetHash])
  })

  it('初期状態では isOpen=false, photo=null', () => {
    const { result } = renderHook(() => useModalControl(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.isOpen).toBe(false)
    expect(result.current.photo).toBeNull()
  })

  it('open() で photo がセットされ、hash が closeup に変わる', () => {
    const { result } = renderHook(() => useModalControl(), {
      wrapper: createWrapper(store),
    })

    act(() => {
      result.current.open(testPhoto)
    })

    expect(result.current.photo).toEqual(testPhoto)
    expect(mockSetHash).toHaveBeenCalledWith('closeup')
  })

  it('close() で photo が null になり、hash が空になる', () => {
    store.set(modalPhotoState, testPhoto)
    mockUseHash.mockReturnValue(['closeup', mockSetHash])

    const { result } = renderHook(() => useModalControl(), {
      wrapper: createWrapper(store),
    })

    act(() => {
      result.current.close()
    })

    expect(result.current.photo).toBeNull()
    expect(mockSetHash).toHaveBeenCalledWith('')
  })

  it('hash が closeup かつ photo がある場合のみ isOpen=true', () => {
    store.set(modalPhotoState, testPhoto)
    mockUseHash.mockReturnValue(['closeup', mockSetHash])

    const { result } = renderHook(() => useModalControl(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('hash が closeup でも photo が null なら isOpen=false', () => {
    mockUseHash.mockReturnValue(['closeup', mockSetHash])

    const { result } = renderHook(() => useModalControl(), {
      wrapper: createWrapper(store),
    })

    expect(result.current.isOpen).toBe(false)
  })
})
