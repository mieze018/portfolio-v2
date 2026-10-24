import { cva } from 'class-variance-authority'
import { useAtomValue } from 'jotai'
import { contentsWrapperState } from 'libs/states/atoms'
import { usePathname } from 'libs/usePathname'

const spanVariants = cva(
  'inline-block cursor-pointer mix-blend-multiply group-hover:underline group-active:underline xs:tracking-widest [word-spacing:-0.2em]',
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
          <a
            href={route.pathname}
            key={route.pathname}
            className="group"
            aria-current={isLinkToCurrentPath ? 'page' : undefined}
            onClick={(event) => {
              if (
                isLinkToCurrentPath &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey &&
                !event.altKey &&
                event.button === 0
              ) {
                event.preventDefault()
                if (isToScrollToContentWrapper) contentsWrapper?.scrollIntoView()
              }
            }}
            data-testid={`nav-link-${route.pathname}`}
          >
            <span className={spanVariants({ isCurrent: isLinkToCurrentPath })}>{route.name}</span>
          </a>
        )
      })}
    </>
  )
}
