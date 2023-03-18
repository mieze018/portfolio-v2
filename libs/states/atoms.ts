import { atom } from 'jotai'

export const contentsWrapperState = atom<HTMLElement | null>(null)

export const modalContentState = atom<JSX.Element | null>(null)
