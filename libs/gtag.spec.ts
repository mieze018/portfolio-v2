import { afterEach, describe, expect, it, vi } from 'vitest'
import { initializeAnalytics } from './gtag'

afterEach(() => vi.unstubAllGlobals())

describe('Google Analytics', () => {
  it('設定がなければページビューを送信しない', () => {
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    const cleanup = initializeAnalytics('')
    document.dispatchEvent(new Event('astro:page-load'))
    expect(gtag).not.toHaveBeenCalled()
    cleanup()
  })

  it('初回表示と Astro のページ遷移で現在のパスを送信し、解除できる', () => {
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    const cleanup = initializeAnalytics('G-TEST123')
    window.history.replaceState(null, '', '/')
    document.dispatchEvent(new Event('astro:page-load'))
    expect(gtag).toHaveBeenLastCalledWith('config', 'G-TEST123', { page_path: '/' })
    window.history.replaceState(null, '', '/about')
    document.dispatchEvent(new Event('astro:page-load'))
    expect(gtag).toHaveBeenLastCalledWith('config', 'G-TEST123', { page_path: '/about' })
    cleanup()
    gtag.mockClear()
    document.dispatchEvent(new Event('astro:page-load'))
    expect(gtag).not.toHaveBeenCalled()
  })
})
