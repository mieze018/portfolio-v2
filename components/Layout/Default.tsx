import { useSetRecoilState } from 'recoil'

import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import { userAgentState } from 'libs/recoil/atoms'

export default function Layout({
  children,
  userAgent,
}: {
  children: React.ReactNode
  userAgent: string
}) {
  useSetRecoilState(userAgentState)(userAgent)
  return (
    <>
      <TopBar />
      {children}
      <Modal />
      <Footer />
    </>
  )
}
