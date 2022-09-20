import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import { userAgentState } from 'libs/recoil/atoms'
import { GlobalStyle } from 'styles/grobal'

export default function Layout({
  children,
  userAgent,
}: {
  children: React.ReactNode
  userAgent: string
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
      <Modal />
      <Footer />
    </>
  )
}
