import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Why: useRouter / useEffect は Next.js 環境依存なのでモックする
const mockOn = vi.fn()
const mockOff = vi.fn()
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    events: { on: mockOn, off: mockOff },
  })),
}))

describe('gtag', () => {
  const originalEnv = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  beforeEach(() => {
    vi.resetModules()
    mockOn.mockClear()
    mockOff.mockClear()
  })

  afterEach(() => {
    // Why: テスト間で環境変数を汚染しないようにリストアする
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = originalEnv
    }
  })

  describe('GoogleAnalytics コンポーネント', () => {
    it('GA_ID が未設定の場合、script タグを出力しない', async () => {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = ''
      const { GoogleAnalytics } = await import('./gtag')
      const { container } = render(<GoogleAnalytics />)
      expect(container.querySelectorAll('script')).toHaveLength(0)
    })

    it('GA_ID が設定されている場合、script タグを出力する', async () => {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = 'G-TEST123'
      const { GoogleAnalytics } = await import('./gtag')
      const { container } = render(<GoogleAnalytics />)
      // Why: jsdom では <script async src="..."> が正常にDOMに挿入されない場合がある
      // 少なくとも1つ以上の script が出力されることを確認
      const scripts = container.querySelectorAll('script')
      expect(scripts.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('usePageView フック', () => {
    it('GA_ID が設定されている場合、routeChangeComplete イベントを購読する', async () => {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = 'G-TEST123'
      const { renderHook } = await import('@testing-library/react')
      const { usePageView } = await import('./gtag')

      renderHook(() => usePageView())

      expect(mockOn).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function))
    })

    it('routeChangeComplete 発火時に window.gtag が呼ばれる', async () => {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = 'G-TEST123'
      // Why: gtag はグローバル関数として存在する前提のコード。テスト用にモックする
      const mockGtag = vi.fn()
      // biome-ignore lint/suspicious/noExplicitAny: window.gtag はテスト用のモック定義
      ;(window as any).gtag = mockGtag

      const { renderHook } = await import('@testing-library/react')
      const { usePageView } = await import('./gtag')

      renderHook(() => usePageView())

      // Why: mockOn に渡されたコールバックを取り出して手動で呼ぶ
      const handler = mockOn.mock.calls[0][1]
      handler('/test-page')

      expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123', {
        page_path: '/test-page',
      })
    })

    it('GA_ID が未設定の場合、イベントを購読しない', async () => {
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = ''
      const { renderHook } = await import('@testing-library/react')
      const { usePageView } = await import('./gtag')

      renderHook(() => usePageView())

      expect(mockOn).not.toHaveBeenCalled()
    })
  })
})
