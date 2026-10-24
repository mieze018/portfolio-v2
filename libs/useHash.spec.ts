import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useHash } from './useHash'

beforeEach(() => window.history.replaceState(null, '', '/page?filter=works'))

describe('useHash', () => {
  it('URL のハッシュ部分を取得できる', () => {
    window.history.replaceState(null, '', '/page#section1')
    const { result } = renderHook(() => useHash())
    expect(result.current[0]).toBe('section1')
  })

  it('setHash はパス・クエリ・履歴状態を維持し、他の購読者にも反映する', () => {
    window.history.replaceState({ marker: 'retained' }, '', '/page?filter=works')
    const { result } = renderHook(() => [useHash(), useHash()])
    act(() => result.current[0][1]('closeup'))
    expect(result.current[1][0]).toBe('closeup')
    expect(window.location.pathname + window.location.search).toBe('/page?filter=works')
    expect(window.history.state).toEqual({ marker: 'retained' })
    act(() => result.current[1][1](''))
    expect(result.current[0][0]).toBe('')
    expect(window.location.hash).toBe('')
  })

  it('ブラウザの履歴移動も反映する', () => {
    const { result } = renderHook(() => useHash())
    act(() => {
      window.history.replaceState(null, '', '/page#history')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(result.current[0]).toBe('history')
  })
})
