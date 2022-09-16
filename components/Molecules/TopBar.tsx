import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { keyframes } from 'styled-components'
import tw, { css, styled } from 'twin.macro'

import type { FC } from 'react'

import { NavLinks } from 'components/Molecules/NavLink'
import { routes } from 'libs/routes'
import { addAgentToHtml } from 'libs/tumblrLink'
import { description, title } from 'pages/api/basics'

export const TopBarComponent = () => {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const [scrollTop, setScrollTop] = useState<number>(scrollY.get())
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollTop(latest)
    })
  }, [scrollY])
  const sinkerStyle = css`
    transition-property: opacity, filter, margin-top;
  `
  const scrollStates = {
    init: scrollTop === 0,
    sinking: scrollTop > 0,
    sunk: scrollTop > ref?.current?.clientHeight,
  }
  console.log(ref)
  const sinkerAnimation = () => {
    if (scrollStates.init)
      return css`
        ${tw`opacity-0 duration-[2s,2s,2s,10s]`}
        animation: ${fadeIn} 3ms 0s ease-in-out forwards;
      `
    if (scrollStates.sunk)
      return css`
        ${tw`top-[-2em] blur-1px opacity-100`}
        animation: ${fadeOutIn} 3ms 0.3s ease-in-out forwards;
      `
    if (scrollStates.sinking)
      return css`
        ${tw`top-[-2em] blur-[6px]`}
        animation: ${sunk} 3s 0s ease-in-out reverse both;
      `
    return tw``
  }
  const floatWaveStyle = css``
  const floatWaveAnimation = () => {
    if (scrollStates.init)
      return css`
        top: 0;
        ${tw`h-golden23vh`}
        filter: blur(4px) brightness(1.05);
        transition: 10000ms, 1000ms, 10000ms;
        transition-property: filter, top, height;
      `
    if (scrollStates.sunk)
      return css`
        top: -4vh;
        height: calc(4vh + 7em);
        filter: blur(10px) brightness(1.1);
        transition: 10000ms, 1000ms, 10000ms;
        transition-property: filter, top, height;
      `
    if (scrollStates.sinking)
      return css`
        top: -1vh;
        ${tw`h-golden14vh`}
        filter: blur(1px) brightness(1.01);
        transition: 10000ms, 1000ms, 8000ms;
        transition-property: filter, top, height;
      `
    return tw``
  }
  const fadeOuterAnimation = () => {
    if (scrollStates.sunk || scrollStates.sinking) return tw`opacity-0 mt-[-2em]`
    return tw``
  }
  const navAnimation = () => {
    if (scrollStates.sunk) return tw`opacity-100`
    if (scrollStates.sinking) return tw`opacity-0`
    return tw`opacity-100`
  }

  return (
    <>
      <FloatingWave css={[floatWaveStyle, floatWaveAnimation()]} />
      <Wrapper ref={ref}>
        <Sinker as={motion.div} css={[sinkerStyle, sinkerAnimation()]} id="sinker">
          <FadeOuter css={fadeOuterAnimation()}>
            <Title>
              <Link href="/">{title}</Link>
            </Title>
            <Description>{description}</Description>
          </FadeOuter>
          <Nav css={navAnimation()}>
            <NavLinks routes={routes} />
          </Nav>
        </Sinker>
      </Wrapper>
    </>
  )
}
const wave = keyframes`
  0% {transform: matrix(1, 0, 0, 1, 0, 0);}  /* 読み込み時 */
  2% {transform: matrix(1, 0, 0, 0.8, 0, 0);}/* 最初の3秒ほどでここまで沈む */
  10% { transform: matrix(1, 0.02, 0, 0.6, 0, 0);}/* 少し戻る */
  30% {transform: matrix(1, 0.03, 0, 0.8, 0, 0);}/* 少し沈む・水平に  */
  50% {transform: matrix(1, 0.03, 0, 0.7, 0, 0);}/* その後30秒ほどかけて浮き上がる */
  100% {transform: matrix(1, 0.03, 0, 1, 0, 0);}` /* 残り126秒かけて水平に元に戻る */
const sunk = keyframes`
  0% {opacity: 0;transform: translate(0, -3em);}
  1% {opacity: 0.618;transform: translate(0, -1em);}
  100% {opacity: 1;transform: translate(0, 0);}`
const fadeIn = keyframes`0% {opacity: 0;}100% {opacity: 1;}`
const fadeOut = keyframes`0% {opacity: 1;}100% {opacity: 0;}
`
const fadeOutIn = keyframes`
0% { opacity: 1; }
50% {opacity: 0;}
100% {opacity: 1;}
  `
const FloatingWave = styled.div`
  ${tw`fixed top-0 z-10 w-full bg-scroll bg-no-repeat h-golden23vh`}
  background-image:url('img/surface.webp');
  top: 0; /* 上部のボケを隠すため少し上に上げる */
  filter: blur(0) brightness(1);
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
