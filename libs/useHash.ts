'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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
  const pathname = usePathname()
  const [hash, setHashState] = useState('')

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      setHashState(extractHash(window.location.href))
    }
  }, [pathname])

  const setHash = useCallback(
    (newHash: string) => {
      const newUrl = `${pathname}#${newHash}`
      router.replace(newUrl, { scroll: false })
      setHashState(newHash)
    },
    [router, pathname]
  )

  return [hash, setHash]
}
