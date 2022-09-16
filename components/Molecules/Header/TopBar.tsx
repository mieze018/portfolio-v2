import { useScroll } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { FadeOuter } from 'components/Molecules/Header/FadeOuter'
import { FloatingWave } from 'components/Molecules/Header/FloatingWave'
import { Nav } from 'components/Molecules/Header/Nav'
import { Sinker } from 'components/Molecules/Header/Sinker'
import { NavLinks } from 'components/Molecules/NavLink'
import { routes } from 'libs/routes'
import { addAgentToHtml } from 'libs/tumblrLink'
import { description, title } from 'pages/api/basics'

export type scrollStatesType = {
  init: boolean
  sinking: boolean
  sunk: boolean
}
export const TopBarComponent = () => {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollTop(latest)
    })
  }, [scrollY])

  const scrollStates: scrollStatesType = {
    init: scrollTop === 0,
    sinking: scrollTop > 0,
    sunk: scrollTop > ref?.current?.clientHeight,
  }

  const Wrapper = styled.header`
    ${tw`fixed top-0 z-10 w-full mb-0 text-sm text-center`}
    min-height: 2em; // 最上部の隙間対策
    background: linear-gradient(180deg, rgb(246 246 246 / 100%) 0%, rgb(255 255 255 / 0%) 100%);
  `
  const Title = tw.h1`mb-1 text-2xl text-primary xs:text-3xl tracking-title`
  const Description = tw.p`text-xs  sm:text-base`
  return (
    <>
      <FloatingWave scrollStates={scrollStates} />
      <Wrapper ref={ref}>
        <Sinker $scrollStates={scrollStates}>
          <FadeOuter scrollStates={scrollStates}>
            <Title>
              <Link href="/">{title}</Link>
            </Title>
            <Description>{description}</Description>
          </FadeOuter>
          <Nav scrollStates={scrollStates}>
            <NavLinks routes={routes} />
          </Nav>
        </Sinker>
      </Wrapper>
    </>
  )
}

export const TopBar = () => {
  addAgentToHtml()
  return <TopBarComponent />
}
