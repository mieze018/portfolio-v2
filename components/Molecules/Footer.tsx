import tw from 'twin.macro'

import { copyright } from 'libs/copyright'

const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center pb-4 relative top-golden61vh`

export const Footer = () => <Wrapper>{copyright()}</Wrapper>
