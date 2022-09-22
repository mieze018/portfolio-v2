import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import tw from 'twin.macro'

import { SocialLinks } from 'components/Molecules/SocialLinks'
import { copyright } from 'libs/copyright'

const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center pb-4 relative top-g-38vh grid gap-4`

export const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <SocialLinks />
      <div>{copyright()}</div>
      <div>
        <Link href="privacy_policy">{t('Privacy Policy')}</Link>
      </div>
    </Wrapper>
  )
}
