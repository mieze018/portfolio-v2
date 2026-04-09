import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Default as PostDefault } from 'components/Molecules/Post/Post.stories'
import type { Tumblr } from 'libs/@type/api/tumblr'
import PostPage from 'pages/posts/[id_string]'

const meta: Meta<typeof PostPage> = {
  component: PostPage,
  parameters: {
    chromatic: { pauseAnimationAtEnd: false },
  },
  tags: ['motion'],
}
export default meta
type Story = StoryObj<typeof PostPage>

export const Default: Story = {
  args: {
    post: PostDefault.args?.post as Tumblr.Post,
  },
}

export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
