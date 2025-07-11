'use client'

import { usePathname } from 'next/navigation'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'

export function ContentsWrapperWithPath({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return <ContentsWrapper $key={pathname}>{children}</ContentsWrapper>
}
