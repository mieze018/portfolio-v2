import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import type { ReactNode } from 'react'
import type { UrlObject } from 'url'

const AnchorLink = ({
  children,
  to,
  anchor,
}: {
  children: ReactNode
  to: UrlObject | string
  anchor: string
}) => {
  const ref = useRef<HTMLAnchorElement>()
  const router = useRouter()

  useEffect(() => {
    const hashChanged = (url) => {
      const hash = url.split('#')[1]
      if (hash !== anchor) return
      ref.current.scrollIntoView()
    }
    router.events.on('hashChangeStart', hashChanged)
    return () => router.events.off('hashChangeStart', hashChanged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor])

  return (
    <Link href={to}>
      <a ref={ref}>{children}</a>
    </Link>
  )
}

export default AnchorLink
