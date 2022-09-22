import tw from 'twin.macro'

import { Footer } from 'components/Molecules/Footer'
import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { TopBar } from 'components/Molecules/Header/TopBar'
import { Modal } from 'components/Organisms/Modal'
import { routes } from 'libs/routes'
import { GlobalStyle } from 'styles/global'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
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
