import { GiShoppingBag } from 'react-icons/gi'
import {
  SiGithub,
  SiTwitter,
  SiPixiv,
  SiInstagram,
  SiDeviantart,
  SiPinterest,
  SiBehance,
  SiTumblr,
  SiGumroad,
} from 'react-icons/si'
import tw from 'twin.macro'

import { links } from 'pages/api/about/links'

export const SocialLinks = () => {
  const Wrapper = tw.div`flex items-center justify-center m-auto w-full gap-x-2`
  return (
    <Wrapper>
      {links.map((link) => (
        <a key={link.text} href={link.url} target="_blank" rel="noreferrer">
          <SocialIconDecider text={link.text} />
        </a>
      ))}
    </Wrapper>
  )
}
const SocialIconDecider = ({ text }: { text: string }) => {
  switch (text.toLowerCase()) {
    case 'twitter':
      return <SiTwitter />
    case 'instagram':
      return <SiInstagram />
    case 'deviantart':
      return <SiDeviantart />
    case 'pinterest':
      return <SiPinterest />
    case 'behance':
      return <SiBehance />
    case 'tumblr':
      return <SiTumblr />
    case 'pixiv':
      return <SiPixiv />
    case 'github':
      return <SiGithub />
    case 'gumroad':
      return <SiGumroad />
    case 'booth':
      return <GiShoppingBag />
    default:
      return <></>
  }
}
