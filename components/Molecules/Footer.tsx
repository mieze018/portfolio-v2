import tw from 'twin.macro'

import { SocialLinks } from 'components/Molecules/SocialLinks'
import { copyright } from 'libs/copyright'

const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center pb-4 relative top-g-38vh grid gap-4`

export const Footer = () => (
  <Wrapper>
    <SocialLinks />
    <div>{copyright()}</div>
  </Wrapper>
)
