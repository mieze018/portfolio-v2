import { copyright } from 'libs/copyright'
import tw from 'twin.macro'

const Wrapper = tw.footer`bottom-0 py-0 text-xs text-center`

export const Footer = () => <Wrapper>{copyright()}</Wrapper>
