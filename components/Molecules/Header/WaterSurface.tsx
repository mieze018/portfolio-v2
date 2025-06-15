import { tw, cva } from 'libs/component-factory'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const WaterDiv = tw('div', cva('fixed top-0 z-10 w-full bg-scroll bg-no-repeat h-g-23vh'))

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init) {
    return {
      top: '0px' /* 上部のボケを隠すため少し上に上げる */,
      height: 'var(--content-wrapper-top)',
      filter: 'blur(4px) brightness(1.05)',
      transitionDuration: '10s, 1s, 10s',
    }
  }
  if (scrollStates.sinking) {
    return {
      top: '-1vh',
      height: 'var(--g-14vh)',
      filter: 'blur(1px) brightness(1.01)',
      transitionDuration: '10000ms, 1000ms, 8000ms',
    }
  }
  if (scrollStates.sunk) {
    return {
      top: '-4vh',
      height: 'calc(4vh + 7em)',
      filter: 'blur(10px) brightness(1.1)',
      transitionDuration: '10000ms, 1000ms, 10000ms',
    }
  }
  return {}
}

const waveAnimation = `
  @keyframes wave {
    0% { transform: matrix(1, 0, 0, 1, 0, 0); }  /* 読み込み時 */
    2% { transform: matrix(1, 0, 0, 0.8, 0, 0); }/* 最初の3秒ほどでここまで沈む */
    10% { transform: matrix(1, 0.02, 0, 0.6, 0, 0); }/* 少し戻る */
    30% { transform: matrix(1, 0.03, 0, 0.8, 0, 0); }/* 少し沈む・水平に  */
    50% { transform: matrix(1, 0.03, 0, 0.7, 0, 0); }/* その後30秒ほどかけて浮き上がる */
    100% { transform: matrix(1, 0.03, 0, 1, 0, 0); }/* 残り126秒かけて水平に元に戻る */
  }
`

export const WaterSurface = () => {
  const scrollStates = useScrollState()
  const dynamicStyles = scrollAnimation(scrollStates)

  return (
    <>
      <style>{waveAnimation}</style>
      <WaterDiv
        style={{
          backgroundImage: 'url("/img/surface.webp")',
          filter: 'blur(0) brightness(1)',
          backgroundSize: '120% 100%',
          transitionDuration: '10000ms',
          transformOrigin: 'right top',
          transitionProperty: 'filter, top, height',
          animation: 'wave 180s 0s ease-out forwards',
          ...dynamicStyles,
        }}
      />
    </>
  )
}
