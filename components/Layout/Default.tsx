import { useUserAgent } from 'next-useragent'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import tw from 'twin.macro'

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
  uaString,
}: {
  children: React.ReactNode
  uaString: string
}) {
  const setUserAgent = useSetRecoilState(userAgentState)

  useEffect(() => {
    if (uaString) setUserAgent(uaString)
  }, [setUserAgent, uaString])

  const ua = useUserAgent(uaString)

  return (
    <>
      <GlobalStyle ua={ua ?? ''} />
      <TopBar />
      {children}
      <Nav css={tw`relative mb-8 top-g-38vh blur-0`}>
        <NavLinks routes={routes} />
      </Nav>
      <Modal />
      <Footer />
    </>
  )
}
