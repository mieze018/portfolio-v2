import type { Meta, StoryObj } from '@storybook/react-vite'
import { fixtureContent } from 'libs/test/fixtureContent'
import { Portfolio } from './Portfolio'

// Why: 部品単体では見逃すページ構成を、固定データで PC・モバイル両方の VRT に含める。
const meta: Meta<typeof Portfolio> = {
  component: Portfolio,
  args: { content: fixtureContent, formId: '' },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [375, 1280], delay: 1000 },
  },
}
export default meta
type Story = StoryObj<typeof Portfolio>

export const Works: Story = { args: { pathname: '/' } }
export const ClientWorks: Story = { args: { pathname: '/client_works' } }
export const About: Story = { args: { pathname: '/about' } }
export const Contact: Story = { args: { pathname: '/contact' } }
export const Privacy: Story = { args: { pathname: '/privacy_policy' } }
export const Post: Story = { args: { pathname: '/posts/10001', postId: '10001' } }
