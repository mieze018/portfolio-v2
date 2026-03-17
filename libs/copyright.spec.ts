import { copyright } from 'libs/copyright'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('copyrightの文字列を求めた時', () => {
  beforeEach(() => {
    // Why: テストを決定的にするため Date を固定する
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('2023年の場合「© 2009 - 2023 Ayu Nakata」が返る', () => {
    vi.setSystemTime(new Date('2023-06-15'))
    expect(copyright()).toBe('© 2009 - 2023 Ayu Nakata')
  })

  it('2026年の場合「© 2009 - 2026 Ayu Nakata」が返る', () => {
    vi.setSystemTime(new Date('2026-01-01'))
    expect(copyright()).toBe('© 2009 - 2026 Ayu Nakata')
  })

  it('開始年と同じ2009年でも正しくフォーマットされる', () => {
    vi.setSystemTime(new Date('2009-12-31'))
    expect(copyright()).toBe('© 2009 - 2009 Ayu Nakata')
  })
})
