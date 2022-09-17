import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";


import { contentsWrapperState } from "libs/recoil/atoms";

export type scrollStatesType = {
  init: boolean
  sinking: boolean
  sunk: boolean
}

export const useScrollState = () => {
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  const contentsWrapperScrollTop = useRecoilState(contentsWrapperState)[0]?.offsetTop ?? 500

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollTop(latest)
    })
  }, [contentsWrapperScrollTop, scrollY])

  return {
    init: scrollTop === 0,
    sinking: scrollTop > 0 && scrollTop < contentsWrapperScrollTop,
    sunk: scrollTop > contentsWrapperScrollTop,
  }
};
