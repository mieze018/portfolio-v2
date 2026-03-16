import { describe, expect, it, vi } from 'vitest'

// Why: useTranslation は public/ 配下の JSON を直接 import しているが、
// Vitest の Vite 環境では public/ からの import がエラーになるためモックする
vi.mock('../public/locales/ja/common.json', () => ({
  default: {
    greeting: 'こんにちは',
    about: '概要',
  },
}))
vi.mock('../public/locales/en/common.json', () => ({
  default: {
    greeting: 'Hello',
    about: 'About',
  },
}))

import { useTranslation } from './useTranslation'

describe('useTranslation', () => {
  it('t() が日本語テキストを返す', () => {
    const { t } = useTranslation()
    expect(t('greeting' as never)).toBe('こんにちは')
  })

  it('t() でキーが見つからない場合はキー自体を返す', () => {
    const { t } = useTranslation()
    expect(t('nonexistent_key' as never)).toBe('nonexistent_key')
  })

  it('tb() が日英両方のテキストを返す', () => {
    const { tb } = useTranslation()
    const result = tb('greeting' as never)
    expect(result).toEqual({ ja: 'こんにちは', en: 'Hello' })
  })

  it('getBothLanguages() が tb() と同じ結果を返す', () => {
    const { tb, getBothLanguages } = useTranslation()
    expect(getBothLanguages('about' as never)).toEqual(tb('about' as never))
  })

  it('存在しないキーの場合、日英ともにキー自体を返す', () => {
    const { tb } = useTranslation()
    const result = tb('missing' as never)
    expect(result).toEqual({ ja: 'missing', en: 'missing' })
  })
})
