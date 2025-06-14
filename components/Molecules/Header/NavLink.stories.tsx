import type { Meta, StoryObj } from '@storybook/nextjs'
import { NavLinks } from './NavLink'

const meta: Meta<typeof NavLinks> = {
  component: NavLinks,
  parameters: {
    chromatic: { disableSnapshot: false },
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
