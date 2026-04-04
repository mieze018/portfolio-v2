import { cva, tw } from 'libs/component-factory'

const WaterDiv = tw('div', cva('fixed top-0 z-10 w-full bg-scroll bg-no-repeat h-g-23vh'))

export const WaterSurface = () => {
  return (
    <WaterDiv
      className="water-surface-anim"
      style={{
        backgroundImage: 'url("/img/surface.webp")',
        filter: 'blur(0) brightness(1)',
        backgroundSize: '120% 100%',
        transformOrigin: 'right top',
      }}
    />
  )
}
