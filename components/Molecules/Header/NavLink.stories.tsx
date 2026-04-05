import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent } from 'storybook/test'
import { NavLinks } from './NavLink'

const meta: Meta<typeof NavLinks> = {
  component: NavLinks,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof NavLinks>

const mockRoutes = [
  { name: 'Home', pathname: '/' },
  { name: 'About', pathname: '/about' },
  { name: 'Works', pathname: '/works' },
  { name: 'Contact', pathname: '/contact' },
]

export const Default: Story = {
  args: {
    routes: mockRoutes,
  },
}

/**
 * 現在ページのリンクがアクティブ（underline）になるケース。
 * router.pathname を /about に設定して isLinkToCurrentPath=true を発火させる。
 */
export const WithCurrentRoute: Story = {
  args: {
    routes: mockRoutes,
  },
  parameters: {
    nextjs: {
      router: {
        pathname: '/about',
      },
    },
  },
}

type StoryPlayContext = Parameters<NonNullable<Story['play']>>[0]

/**
 * NavLink の onClick ハンドラをカバーするためにリンクをクリックする。
 * isToScrollToContentWrapper が true になる "/" リンクをクリック。
 */
export const ClickHomeLink: Story = {
  args: {
    routes: mockRoutes,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const homeLink = canvasElement.querySelector('[data-testid="nav-link-/"]')
    if (homeLink) {
      await userEvent.click(homeLink)
    }
  },
}
