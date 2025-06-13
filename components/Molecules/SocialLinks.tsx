import { GiShoppingBag } from 'react-icons/gi'
import {
  SiGithub,
  SiX,
  SiPixiv,
  SiInstagram,
  SiDeviantart,
  SiPinterest,
  SiBehance,
  SiTumblr,
  SiGumroad,
} from 'react-icons/si'
import { cva } from 'class-variance-authority'

import { links } from 'pages/api/about/links'

const wrapperVariants = cva(
  'flex items-center justify-center m-auto w-full gap-4 md:gap-4 text-4xl md:text-2xl flex-wrap'
)

export const SocialLinks = () => {
  return (
    <div className={wrapperVariants()}>
      {links.map((link) => (
        <a key={link.text} href={link.url} target="_blank" rel="noreferrer">
          <SocialIconDecider text={link.text} />
        </a>
      ))}
    </div>
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
      return <></>
  }
}
