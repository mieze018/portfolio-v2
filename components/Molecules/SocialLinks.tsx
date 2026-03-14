import { cva, tw } from 'libs/component-factory'
import { links } from 'pages/api/about/links'
import { GiShoppingBag } from 'react-icons/gi'
import {
  SiBehance,
  SiDeviantart,
  SiGithub,
  SiGumroad,
  SiInstagram,
  SiPinterest,
  SiPixiv,
  SiTumblr,
  SiX,
} from 'react-icons/si'

const Wrapper = tw(
  'div',
  cva(
    'flex items-center justify-center m-auto w-full gap-4 md:gap-4 text-4xl md:text-2xl flex-wrap'
  )
)

export const SocialLinks = () => {
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
      return <SiX />
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
      return null
  }
}
