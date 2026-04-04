import { useEffect, useState } from 'react'

// Why: ページ遷移のたびに ContentsWrapper が再マウントされるため、
// useRef だとインスタンスごとにリセットされてしまう。
// モジュールスコープの変数で「アプリ全体の初回クライアントロード」を一度だけ判定する。
// サーバーサイドでは typeof window === 'undefined' なので常に false → delay 0 になり、
// hydration の不一致を防ぐ。
let _isFirstClientLoad = typeof window !== 'undefined'

export const useInitialLoadDelay = (delaySeconds: number): number => {
  const [delay, setDelay] = useState(_isFirstClientLoad ? delaySeconds : 0)

  useEffect(() => {
    if (_isFirstClientLoad) {
      _isFirstClientLoad = false
      setDelay(0)
    }
  }, [])

  return delay
}
