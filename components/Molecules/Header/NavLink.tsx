'use client'

import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cva } from 'class-variance-authority'

import { contentsWrapperState } from 'libs/states/atoms'

const spanVariants = cva(
  'inline-block cursor-pointer mix-blend-multiply xs:tracking-widest [word-spacing:-0.2em]',
  {
    variants: {
      isCurrent: {
        true: 'underline hover:text-secondary',
        false: '',
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  }
)

export const NavLinks = ({
  routes,
}: {
  routes: {
    name: string
    pathname: string
  }[]
}) => {
  const pathname = usePathname()
  const contentsWrapper = useAtomValue(contentsWrapperState)
  return (
    <>
      {routes.map((route) => {
        const isLinkToCurrentPath = pathname === route.pathname
        /** コンテンツまでスクロールさせるかどうか */
        const isToScrollToContentWrapper = route.pathname === '/' || isLinkToCurrentPath
        return (
          <Link
            href={route.pathname}
            key={route.pathname}
            scroll={!isToScrollToContentWrapper}
            onClick={() =>
              isToScrollToContentWrapper && setTimeout(() => contentsWrapper?.scrollIntoView(), 100)
            }
            data-testid={`nav-link-${route.pathname}`}
          >
            <span className={spanVariants({ isCurrent: isLinkToCurrentPath })}>{route.name}</span>
          </Link>
        )
      })}
    </>
  )
}
