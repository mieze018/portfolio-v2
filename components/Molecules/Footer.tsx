import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import tw from 'twin.macro'

import { Nav } from 'components/Molecules/Header/Nav'
import { NavLinks } from 'components/Molecules/Header/NavLink'
import { SocialLinks } from 'components/Molecules/SocialLinks'
import { copyright } from 'libs/copyright'
import { routes } from 'libs/routes'

const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center pb-4 relative top-contentWrapperTop pt-8 grid gap-4`

export const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <Nav css={tw`blur-0`}>
        <NavLinks routes={routes} />
      </Nav>
      <SocialLinks />
      <div>{copyright()}</div>
      <div>
        <Link href="privacy_policy">{t('Privacy Policy')}</Link>
      </div>
    </Wrapper>
  )
}
