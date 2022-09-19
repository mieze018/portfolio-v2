import { atom } from "recoil";

export const contentsWrapperState = atom<HTMLElement | null>({
  key: "contentsWrapper",
  default: null,
});

export const isModalOpenState = atom<boolean>({
  key: "isModalOpen",
  default: false,
});
export const modalContentState = atom<JSX.Element | null>({
  key: "modalContent",
  default: null,
});
