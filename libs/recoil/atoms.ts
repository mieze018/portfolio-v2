import { atom } from 'recoil'

export const contentsWrapperState = atom<HTMLElement | null>({
  key: 'contentsWrapper',
  default: null,
})

export const modalContentState = atom<JSX.Element | null>({
  key: 'modalContent',
  default: null,
})
export const userAgentState = atom<string | null>({
  key: 'userAgent',
  default: null,
})
