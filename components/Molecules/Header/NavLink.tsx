import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import tw, { styled } from 'twin.macro'

import { contentsWrapperState } from 'libs/recoil/atoms'

const A = styled.a<{ isCurrent: boolean }>`
  ${tw`inline-block m-1 mt-3 cursor-pointer md:m-2 mix-blend-multiply xs:tracking-widest`}
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
  const [contentsWrapper] = useRecoilState(contentsWrapperState)
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
