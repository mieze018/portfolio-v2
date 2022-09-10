import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'

import type { FC } from 'react'

import { NavLinks } from 'components/Molecules/NavLink'
import { addAgentToHtml } from 'libs/tumblrLink'

const Floater = styled.div`
  ${tw`fixed top-0 z-10 w-full bg-surface h-golden23vh`}
  top: 0; /* 上部のボケを隠すため少し上に上げる */
  filter: blur(0) brightness(1);
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center top;
  background-size: 120% 100%;
  transition: 10000ms;
  transform-origin: right top;
  animation: wave 180s 0s ease-out forwards;
`
const Sinker = styled.div`
  ${tw`fixed top-golden23vh w-full m-auto opacity-0 hover:blur-none`}
  transition: 1000ms, 1000ms, 1200ms, 10000ms;
  transition-property: opacity, filter, top, height;
  animation: sunk 10s 0.3s ease-in-out forwards;
`
const FadeOuter = styled.div`
  ${tw`opacity-100 transition[5000ms]`}/* margin-top: calc(23vh);
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
const Nav = tw.nav`z-10 text-center`
export const TopBarComponent: FC<{
  TitleLink?: FC
  description?: string
  navLinks?: FC<{ className: string }>
}> = (props) => (
  <>
    <Floater id="floater" />
    <Wrapper>
      <Sinker id="sinker">
        <FadeOuter id="fade-outer">
          <Title>{/* <props.TitleLink /> */}</Title>
          <Description>{props.description ?? process.env.NEXT_PUBLIC_description}</Description>
        </FadeOuter>
        <Nav>
          {/* <props.navLinks className="inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest" /> */}
        </Nav>
      </Sinker>
    </Wrapper>
  </>
)

const TitleLink: FC = () => {
  return <Link href="/"> {process.env.NEXT_PUBLIC_title}</Link>
}

function classList(elt: HTMLElement | null) {
  const list = elt?.classList
  // console.log(list);
  return elt === null
    ? null
    : {
        toggle: function (c: string) {
          list?.toggle(c)
          return this
        },
        add: function (c: string) {
          list?.add(c)
          return this
        },
        remove: function (c: string) {
          list?.remove(c)
          return this
        },
      }
}

export const TopBar: FC = () => {
  addAgentToHtml()
  // TODO:スクロールオブサーバーにする
  const isRunning = useRef(false) // スクロール多発防止用フラグ

  // リスナに登録する関数
  const isScrollToggle = useCallback(() => {
    if (isRunning.current) return
    isRunning.current = true
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    requestAnimationFrame(() => {
      const body = document.querySelector('body')

      if (scrollTop === 0) {
        classList(body)
          ?.add('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh')
      } else if (scrollTop > window.innerHeight * 0.382) {
        classList(body)
          ?.add('scroll-top-gt-38vh')
          .remove('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh')
        // } else if (scrollTop > window.innerHeight * 0.236) {
        //   classList(body)
        //     ?.add('scroll-top-gt-23vh')
        //     .remove('scroll-backed')
        //     .remove('scroll-top-gt-0')
        //     .remove('scroll-top-gt-38vh');
      } else if (scrollTop > 0) {
        classList(body)
          ?.add('scroll-top-gt-0')
          .remove('scroll-backed')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh')
      }

      isRunning.current = false
    })
  }, [])

  // 登録と後始末
  useEffect(() => {
    document.addEventListener('scroll', isScrollToggle, { passive: true })

    return () => {
      document.removeEventListener('scroll', isScrollToggle, true)
    }
  }, [isScrollToggle])

  return (
    <TopBarComponent
      TitleLink={TitleLink}
      // description={GetDataCTX['description']}
      navLinks={NavLinks}
    />
  )
}
