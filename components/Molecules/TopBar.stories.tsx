import { TopBar } from './Header/TopBar'

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'

const title = () => {
  return <>mieze illustration</>
}

const navLinks = ({ className }: { className: string }) => {
  return (
    <>
      <a href="/aaa" className={className}>
        personal work
      </a>
      <a href="/aaa" className={className}>
        commissioned work
      </a>
      <a href="/aaa" className={className}>
        info
      </a>
    </>
  )
}

export default { component: TopBar } as ComponentMeta<typeof TopBar>

export const Default: ComponentStoryObj<typeof TopBar> = {
  args: {
    TitleLink: title,
    description: 'by Ayu Nakata. Osaka, Japan-based illustrator/artist.',
    navLinks: navLinks,
  },
}
