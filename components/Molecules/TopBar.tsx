import './TopBar.css'

import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'

import type { FC } from 'react'

import { addAgentToHtml } from 'libs/tumblrLink'

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
  const navLinks: FC<{ className: string }> = ({ className }) => {
    console.log(className)
    return (
      <>
        {/* {props.navs.map((nav) =>
          <Link
            to={nav.pathname}
            key={nav.name}
            className={`${className} ${location.pathname === nav.pathname ||
              (location.pathname === '/' &&
                nav.pathname === GetDataCTX.routes[0].pathname)
              ? 'underline'
              : ''
              }`}
          >
            {nav.name}
          </Link>
        )} */}
      </>
    )
  }
  return (
    <TopBarComponent
      TitleLink={TitleLink}
      // description={GetDataCTX['description']}
      navLinks={navLinks}
    />
  )
}

export const TopBarComponent: FC<{
  TitleLink: FC
  description?: string
  navLinks: FC<{ className: string }>
}> = (props) => {
  return (
    <>
      <div id="floater" className="fixed top-0 z-10 w-full bg-surface"></div>
      <header className="fixed top-0 z-10 w-full mb-0 text-sm text-center">
        <div id="sinker">
          <div id="fade-outer">
            <h1 className="mb-1 text-2xl header-title text-primary xs:text-3xl tracking-title">
              <props.TitleLink />
            </h1>

            <p className="text-xs header-desc sm:text-base">
              {props.description ?? process.env.NEXT_PUBLIC_description}
            </p>
          </div>
          <nav className="z-10 text-center">
            <props.navLinks className="inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest" />
          </nav>
        </div>
      </header>
    </>
  )
}
