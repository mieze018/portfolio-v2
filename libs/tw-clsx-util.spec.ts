import { describe, expect, it } from 'vitest'
import { cn } from './tw-clsx-util'

describe('cn (Tailwind クラスマージ)', () => {
  it('単一クラスをそのまま返す', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('複数クラスを結合する', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('重複する Tailwind クラスを後勝ちでマージする', () => {
    // Why: tailwind-merge が p-2 と p-4 の競合を解決し後者を残す
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('条件付きクラス (falsy) を除外する', () => {
    expect(cn('base', false && 'hidden', null, undefined)).toBe('base')
  })

  it('条件付きクラス (truthy) を含める', () => {
    expect(cn('base', true && 'visible')).toBe('base visible')
  })

  it('配列入力を受け付ける', () => {
    expect(cn(['px-2', 'py-1'])).toBe('px-2 py-1')
  })

  it('オブジェクト形式の条件付きクラスを扱う', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })

  it('引数なしで空文字を返す', () => {
    expect(cn()).toBe('')
  })

  it('複雑な Tailwind の競合を正しく解決する', () => {
    // Why: text-sm と text-lg は同じグループなので後勝ち
    expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg')
  })
})
