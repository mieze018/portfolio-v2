import { useCallback, useSyncExternalStore } from 'react'

const subscribe = (listener: () => void) => {
  window.addEventListener('hashchange', listener)
  window.addEventListener('popstate', listener)
  return () => {
    window.removeEventListener('hashchange', listener)
    window.removeEventListener('popstate', listener)
  }
}
const getSnapshot = () => window.location.hash.slice(1)
const getServerSnapshot = () => ''

export function useHash(): [string, (newHash: string) => void] {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const setHash = useCallback((newHash: string) => {
    const url = new URL(window.location.href)
    url.hash = newHash
    // Why: ページ遷移やスクロールを起こさず、既存どおり現在の履歴を置き換える。
    window.history.replaceState(window.history.state, '', url)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }, [])
  return [hash, setHash]
}
