import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import tw from 'twin.macro'

import type { userAgentType } from 'libs/recoil/atoms'

import { Footer } from 'components/Molecules/Footer'
import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import { userAgentState } from 'libs/recoil/atoms'
import { routes } from 'libs/routes'
import { GlobalStyle } from 'styles/global'

export default function Layout({
  children,
  userAgent,
}: {
  children: React.ReactNode
  userAgent: userAgentType
}) {
  const setUserAgent = useSetRecoilState(userAgentState)
  useEffect(() => {
    if (userAgent) {
      setUserAgent(userAgent)
    }
  }, [setUserAgent, userAgent])
  return (
    <>
      <GlobalStyle userAgent={userAgent ?? ''} />
      <TopBar />
      {children}
      {/* スマホの時だけ下にもナビを置く */}
      {userAgent !== 'other' && (
        <Nav css={tw`relative mb-3 top-g-38vh blur-0`}>
          <NavLinks routes={routes} />
        </Nav>
      )}
      <Modal />
      <Footer />
    </>
  )
}
