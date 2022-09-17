import { atom } from "recoil";

export const contentsWrapperState = atom<HTMLElement | null>({
  key: "contentsWrapper",
});
