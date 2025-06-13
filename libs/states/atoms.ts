import { atom } from 'jotai'

import type { JSX } from "react";

export const contentsWrapperState = atom<HTMLElement | null>(null)

export const modalContentState = atom<JSX.Element | null>(null)
