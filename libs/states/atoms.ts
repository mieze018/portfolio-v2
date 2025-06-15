import { atom } from 'jotai'

export const contentsWrapperState = atom<HTMLElement | null>(null)

export const modalContentState = atom<React.JSX.Element | null>(null)
