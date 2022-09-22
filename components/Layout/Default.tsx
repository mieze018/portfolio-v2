import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import { GlobalStyle } from 'styles/global'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <TopBar />
      {children}
      <Modal />
      <Footer />
    </>
  )
}
