import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import type { LocalApi } from 'libs/@type/api/local'

type layoutPropsType = {
  children: React.ReactNode
  socialLinks?: LocalApi.SnsLink[]
}

export default function Layout({ children, socialLinks }: layoutPropsType) {
  return (
    <>
      <TopBar />
      {children}
      <Modal />
      <Footer socialLinks={socialLinks} />
    </>
  )
}
