import { tw, cva } from 'libs/component-factory'

import { FadeOuter } from 'components/Molecules/Header/FadeOuter'
import { Floater } from 'components/Molecules/Header/Floater'
import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { WaterSurface } from 'components/Molecules/Header/WaterSurface'
import { routes } from 'libs/routes'
import { description, title } from 'pages/api/basics'

const Title = tw('h1', cva('mb-1 text-2xl xs:text-3xl tracking-title'))
const Description = tw('p', cva('text-xs sm:text-base'))

export const TopBar = () => {
  return (
    <>
      <div
        className="fixed top-0 z-10 w-full h-g-14vh opacity-80"
        style={{
          background: 'linear-gradient(180deg, rgb(246 246 246) 0%, rgb(255 255 255 / 0%) 100%)',
        }}
      />
      <WaterSurface />
      <Floater>
        <FadeOuter>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </FadeOuter>
        <Nav>
          <NavLinks routes={routes} />
        </Nav>
      </Floater>
    </>
  )
}
