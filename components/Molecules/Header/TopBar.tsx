import { cva } from 'class-variance-authority'

import { FadeOuter } from 'components/Molecules/Header/FadeOuter'
import { Floater } from 'components/Molecules/Header/Floater'
import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { WaterSurface } from 'components/Molecules/Header/WaterSurface'
import { routes } from 'libs/routes'
import { description, title } from 'pages/api/basics'

const flareVariants = cva('fixed top-0 z-10 w-full h-g-14vh opacity-80')
const titleVariants = cva('mb-1 text-2xl xs:text-3xl tracking-title')
const descriptionVariants = cva('text-xs sm:text-base')

export const TopBar = () => {
  return (
    <>
      <div
        className={flareVariants()}
        style={{
          background: 'linear-gradient(180deg, rgb(246 246 246) 0%, rgb(255 255 255 / 0%) 100%)',
        }}
      />
      <WaterSurface />
      <Floater>
        <FadeOuter>
          <h1 className={titleVariants()}>{title}</h1>
          <p className={descriptionVariants()}>{description}</p>
        </FadeOuter>
        <Nav>
          <NavLinks routes={routes} />
        </Nav>
      </Floater>
    </>
  )
}
