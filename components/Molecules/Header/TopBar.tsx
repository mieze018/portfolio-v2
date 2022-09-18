import tw, { styled } from 'twin.macro'

import { FadeOuter } from 'components/Molecules/Header/FadeOuter'
import { Floater } from 'components/Molecules/Header/Floater'
import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { WaterSurface } from 'components/Molecules/Header/WaterSurface'
import { routes } from 'libs/routes'
import { addAgentToHtml } from 'libs/tumblrLink'
import { useScrollState } from 'libs/useScrollState'
import { description, title } from 'pages/api/basics'

export const TopBar = () => {
  const scrollStates = useScrollState()

  const Flare = styled.div`
    ${tw`fixed top-0 z-10 w-full h-golden14vh `}
    background: linear-gradient(180deg, rgb(246 246 246 / 100%) 0%, rgb(255 255 255 / 0%) 100%);
  `
  const Title = tw.h1`mb-1 text-2xl xs:text-3xl tracking-title`
  const Description = tw.p`text-xs  sm:text-base`
  return (
    <>
      <Flare />
      <WaterSurface scrollStates={scrollStates} />
      <Floater $scrollStates={scrollStates}>
        <FadeOuter scrollStates={scrollStates}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </FadeOuter>
        <Nav scrollStates={scrollStates}>
          <NavLinks routes={routes} />
        </Nav>
      </Floater>
    </>
  )
}
