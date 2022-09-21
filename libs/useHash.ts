import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

// URL の # 以降の文字列を取り出すユーティリティ
const extractHash = (url: string): string => url.split('#')[1] ?? ''

/**
 * URL のハッシュフラグメント部分を扱うためのフックです。
 *
 * 次のようにすると、`hash` 変数に URL の `#` 以降の値が格納されます。
 * URL の `#` 以降の値を変更したいときは、`setHash` 関数を使用します。
 *
 * ```
 * const [hash, setHash] = useHash()
 * ```
 */

export function useHash(): [string, (newHash: string) => void] {
  const router = useRouter()
  const hash = extractHash(router.asPath)
  const setHash = useCallback((newHash: string) => {
    // ブラウザの履歴に残すならrouter.push, そうでなければrouter.replace
    router.replace({ hash: newHash }, undefined, { shallow: true, scroll: false })
  }, [])
  return [hash, setHash]
}

