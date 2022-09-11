import Link from 'next/link'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'

const A = styled.a<{ isCurrent: boolean }>`
  ${tw`inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest`}
  ${({ isCurrent }) => isCurrent && tw`underline`}
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
  const currentPath = router.pathname
  return (
    <>
      {routes.map((route) => (
        <Link href={route.pathname} key={route.pathname}>
          <A isCurrent={currentPath === route.pathname}> {route.name}</A>
        </Link>
      ))}
    </>
  )
}
