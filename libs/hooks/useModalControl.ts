import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { modalPhotoState } from 'libs/states/atoms'
import { useHash } from 'libs/useHash'
import type { ModalPhoto } from 'libs/states/types'

/**
 * モーダルの開閉を一元管理する hook
 *
 * Why: 以前は Photo (開く側) と Modal (表示側) に開閉制御が分散していた。
 * この hook で状態の一貫性を保証する。
 *
 * Trade-off: useHash との結合は残るが、URL ハッシュによる
 * ブラウザバック対応という UX 上の利点を優先した。
 */
export const useModalControl = () => {
  const [photo, setPhoto] = useAtom(modalPhotoState)
  const [hash, setHash] = useHash()

  const open = useCallback(
    (data: ModalPhoto) => {
      setPhoto(data)
      setHash('closeup')
    },
    [setPhoto, setHash]
  )

  const close = useCallback(() => {
    setPhoto(null)
    setHash('')
  }, [setPhoto, setHash])

  const isOpen = hash === 'closeup' && photo !== null

  return { photo, isOpen, open, close }
}
