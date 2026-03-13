import { atom } from 'jotai'

import type { ModalPhoto } from './types'

export const contentsWrapperState = atom<HTMLElement | null>(null)

// Why: JSX.Element → ModalPhoto (plain object) に変更。
// シリアライズ可能になり、テストでのモックが容易に。
export const modalPhotoState = atom<ModalPhoto | null>(null)

/** @deprecated modalPhotoState に移行済み。Phase 4 で削除予定 */
export const modalContentState = atom<React.JSX.Element | null>(null)
