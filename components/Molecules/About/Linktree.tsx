import type { LocalApi } from 'libs/@type/api/local'

import { P, SectionWrapper } from 'components/Atoms/About/Atoms'
import { Separator } from '@radix-ui/react-separator'

export const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    <Separator />
    {links.map((link, linkK) => (
      <P key={linkK}>
        <a href={link.url}>{link.text}</a>
      </P>
    ))}
  </SectionWrapper>
)
