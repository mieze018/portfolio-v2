import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'

import { contentsWrapperState } from 'libs/states/atoms'

const Span = styled.span<{ isCurrent: boolean }>`
  ${({ isCurrent }) => [
    tw`inline-block cursor-pointer mix-blend-multiply xs:tracking-widest [word-spacing:-0.2em]`,
    isCurrent && tw`underline hover:text-secondary`,
  ]}
`
export const NavLinks = ({
  routes,
}: {
  routes: {
    name: string
    pathname: string
  }[]
}) => {
  const router = useRouter()
  const contentsWrapper = useAtomValue(contentsWrapperState)
  return (
    <>
      {routes.map((route) => {
        const isLinkToCurrentPath = router.pathname === route.pathname
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
            <Span isCurrent={isLinkToCurrentPath}>{route.name}</Span>
          </Link>
        )
      })}
    </>
  )
}
