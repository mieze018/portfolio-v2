import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import tw from 'twin.macro'

import type { FC } from 'react'

import { NavLinks } from 'components/Molecules/NavLink'
import { addAgentToHtml } from 'libs/tumblrLink'

const Floater = tw.div`fixed top-0 z-10 w-full bg-surface`
const Wrapper = tw.header`fixed top-0 z-10 w-full mb-0 text-sm text-center`
const Title = tw.h1`mb-1 text-2xl header-title text-primary xs:text-3xl tracking-title`
const Description = tw.p`text-xs header-desc sm:text-base`
const Nav = tw.nav`z-10 text-center`
export const TopBarComponent: FC<{
  TitleLink: FC
  description?: string
  navLinks: FC<{ className: string }>
}> = (props) => (
  <>
    <Floater id="floater" className="fixed top-0 z-10 w-full bg-surface" />
    <Wrapper>
      <div id="sinker">
        <div id="fade-outer">
          <Title>
            <props.TitleLink />
          </Title>
          <Description>{props.description ?? process.env.NEXT_PUBLIC_description}</Description>
        </div>
        <Nav>
          <props.navLinks className="inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest" />
        </Nav>
      </div>
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
