import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";


import { contentsWrapperState } from "libs/recoil/atoms";

export type scrollStatesType = {
  scrollY?: number;
  contentsWrapperScrollTop?: number;
  init: boolean
  sinking: boolean
  sunk: boolean
}

export const useScrollState = () => {
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  const contentsWrapper = useRecoilState(contentsWrapperState)[0]
  const contentsWrapperScrollTop = contentsWrapper?.offsetTop ?? 500

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollTop(latest)
    })
  }, [contentsWrapper, scrollY])

  return {
    scrollTop: scrollTop,
    contentsWrapperScrollTop: contentsWrapperScrollTop,
    init: scrollTop === 0,
    sinking: scrollTop > 0 && scrollTop < contentsWrapperScrollTop,
    sunk: scrollTop >= contentsWrapperScrollTop,
  }
};
