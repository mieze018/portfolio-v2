import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      {children}
      <Modal />
      <Footer />
    </>
  )
}
