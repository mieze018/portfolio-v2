import Link from 'next/link'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'

import { useContentsWrapper } from 'libs/contexts/contentWrapper'

const A = styled.a<{ isCurrent: boolean }>`
  ${tw`inline-block cursor-pointer mix-blend-multiply xs:tracking-widest [word-spacing:-0.2em]`}
  ${({ isCurrent }) => isCurrent && tw`underline hover:text-secondary`}
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
  const { contentsWrapper } = useContentsWrapper()
  return (
    <>
      {routes.map((route) => {
        const currentPath = router.pathname === route.pathname
        const toOnclickScroll = route.pathname === '/' || currentPath
        return (
          <Link href={route.pathname} key={route.pathname} scroll={toOnclickScroll ? false : true}>
            <A
              onClick={() =>
                toOnclickScroll && setTimeout(() => contentsWrapper?.scrollIntoView(), 100)
              }
              isCurrent={currentPath}
            >
              {route.name}
            </A>
          </Link>
        )
      })}
    </>
  )
}
