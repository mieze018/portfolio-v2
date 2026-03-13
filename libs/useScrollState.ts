import { useScroll } from 'motion/react'
import { useAtomValue } from 'jotai'
import { useState, useEffect } from 'react'

import { contentsWrapperState } from 'libs/states/atoms'

export type scrollStatesType = {
  scrollY?: number
  contentsWrapperScrollTop?: number
  init: boolean
  sinking: boolean
  sunk: boolean
}

export const useScrollState = () => {
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  const contentsWrapper = useAtomValue(contentsWrapperState)
  const defaultScrollTop = 500
  const contentsWrapperScrollTop = contentsWrapper?.offsetTop ?? defaultScrollTop

  useEffect(() => {
    // Why: onChange は motion/react v12 で非推奨。on("change", cb) が新 API。
    return scrollY.on('change', (latest) => {
      setScrollTop(latest)
    })
  }, [scrollY])

  return {
    scrollTop: scrollTop,
    contentsWrapperScrollTop: contentsWrapperScrollTop,
    init: scrollTop === 0,
    sinking: scrollTop > 0 && scrollTop < contentsWrapperScrollTop,
    sunk: scrollTop >= contentsWrapperScrollTop,
  }
}
