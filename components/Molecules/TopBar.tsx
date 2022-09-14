import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { keyframes } from 'styled-components'
import tw, { styled } from 'twin.macro'

import type { FC } from 'react'

import { NavLinks } from 'components/Molecules/NavLink'
import { routes } from 'libs/routes'
import { addAgentToHtml } from 'libs/tumblrLink'
import { description, title } from 'pages/api/basics'

export const TopBarComponent = () => {
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  const classNameForAnimation = () => {
    if (scrollTop === 0) return 'scroll-backed'
    if (scrollTop > window.innerHeight * 0.382) return 'scroll-top-gt-38vh'
    if (scrollTop > 0) return 'scroll-top-gt-0'
    return ''
  }
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollTop(latest)
    })
  }, [])
  return (
    <>
      <FloatingWave id="floater" />
      <Wrapper>
        <Sinker as={motion.div} className={classNameForAnimation()} id="sinker">
          <FadeOuter id="fade-outer">
            <Title>
              <Link href="/">{title}</Link>
            </Title>
            <Description>{description}</Description>
          </FadeOuter>
          <Nav>
            <NavLinks routes={routes} />
          </Nav>
        </Sinker>
      </Wrapper>
    </>
  )
}
const wave = keyframes`
  /* 読み込み時 */
  0% {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }

  /* 最初の3秒ほどでここまで沈む */
  2% {
    transform: matrix(1, 0, 0, 0.8, 0, 0);
  }

  /* 少し戻る */
  10% {
    transform: matrix(1, 0.02, 0, 0.6, 0, 0);
  }

  /* 少し沈む・水平に  */
  30% {
    transform: matrix(1, 0.03, 0, 0.8, 0, 0);
  }

  /* その後30秒ほどかけて浮き上がる */
  50% {
    transform: matrix(1, 0.03, 0, 0.7, 0, 0);
  }

  /* 残り126秒かけて水平に元に戻る */
  100% {
    transform: matrix(1, 0.03, 0, 1, 0, 0);
  }`
const sunk = keyframes`  0% {
    opacity: 0;
    transform: translate(0, -3em);
  }

  1% {
    opacity: 0.618;
    transform: translate(0, -1em);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }`

const FloatingWave = styled.div`
  ${tw`fixed top-0 z-10 w-full h-golden23vh`}
  background-image:url('img/surface.webp');
  top: 0; /* 上部のボケを隠すため少し上に上げる */
  filter: blur(0) brightness(1);
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center top;
  background-size: 120% 100%;
  transition: 10000ms;
  transform-origin: right top;
  animation: ${wave} 180s 0s ease-out forwards;
`
const Sinker = styled(motion.div)`
  ${tw`fixed w-full m-auto opacity-0 top-golden23vh hover:blur-none`}
  transition: 1000ms, 1000ms, 1200ms, 10000ms;
  transition-property: opacity, filter, top, height;
  animation: ${sunk} 10s 0.3s ease-in-out forwards;
`
const FadeOuter = styled.div`
  ${tw`opacity-100 duration-[5000ms]`}/* margin-top: calc(23vh);
  opacity: 1;
  transition: 2000ms, 2000ms, 2000ms, 10000ms;
  transition-property: opacity, translate, filter, margin-top; */
`
const Wrapper = styled.header`
  ${tw`fixed top-0 z-10 w-full mb-0 text-sm text-center`}
  min-height: 2em; // 最上部の隙間対策
  background: linear-gradient(180deg, rgb(246 246 246 / 100%) 0%, rgb(255 255 255 / 0%) 100%);
`
const Title = tw.h1`mb-1 text-2xl text-primary xs:text-3xl tracking-title`
const Description = tw.p`text-xs  sm:text-base`
const Nav = tw.nav`z-10 text-center m-auto opacity-100 duration-[1200ms]`

export const TopBar: FC = () => {
  addAgentToHtml()
  return <TopBarComponent />
}
