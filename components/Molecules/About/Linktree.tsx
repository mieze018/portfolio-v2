import type { LocalApi } from 'libs/@type/api/local'

import { SectionWrapper, P, SnsLink } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import { linktree } from 'pages/api/about/links'

export const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    <h1>
      <a href={linktree.url}>{linktree.text}</a>
    </h1>
    <Separator />
    {links.map((link, linkK) => (
      <P key={linkK}>
        <SnsLink href={link.url}>{link.text}</SnsLink>
      </P>
    ))}
  </SectionWrapper>
)
