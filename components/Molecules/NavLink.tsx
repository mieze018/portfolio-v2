import Link from 'next/link'

export const NavLinks = ({
  routes,
}: {
  routes: {
    name: string
    pathname: string
  }[]
}) => {
  console.log()
  return (
    <>
      {routes.map((route) => (
        <Link
          href={route.pathname}
          key={route.pathname}
          className={`inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest ${
            location.pathname === route.pathname ||
            (location.pathname === '/' && route.pathname === routes[0].pathname)
              ? 'underline'
              : ''
          }`}
        >
          {route.name}
        </Link>
      ))}
    </>
  )
}
