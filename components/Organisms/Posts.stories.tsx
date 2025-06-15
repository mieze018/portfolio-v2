import type { Meta, StoryObj } from '@storybook/nextjs'
import { Posts } from './Posts'
import type { Tumblr } from 'libs/@type/api/tumblr'

const meta: Meta<typeof Posts> = {
  component: Posts,
  parameters: {},
}
export default meta
type Story = StoryObj<typeof Posts>

// picsum.photosの固定画像URL（ビジュアルリグレッションテスト用）
const testImage = (id: number) => `https://picsum.photos/id/${id}/400/300`

const createMockPost = (id: number, tags: string[], imageCount: number): Tumblr.Post =>
  ({
    type: 'photo',
    blog_name: 'example-blog',
    blog: {
      name: 'example-blog',
      title: 'Example Blog',
      description: 'A sample blog',
      url: 'https://example.tumblr.com',
      uuid: 'example-uuid',
      updated: 1640995200,
    },
    id,
    id_string: id.toString(),
    post_url: `https://example.tumblr.com/post/${id}`,
    slug: `sample-post-${id}`,
    date: '2024-01-15 12:00:00 GMT',
    timestamp: 1640995200,
    state: 'published',
    format: 'html',
    reblog_key: 'example-key',
    tags,
    short_url: 'https://tmblr.co/short',
    summary: `Sample post ${id} summary`,
    should_open_in_legacy: false,
    recommended_source: null,
    recommended_color: null,
    note_count: 0,
    caption: `<p>これはサンプル投稿${id}のキャプションです。</p>`,
    photos: Array.from({ length: imageCount }, (_, index) => ({
      caption: '',
      original_size: {
        url: testImage(id + index),
        width: 400,
        height: 300,
      },
      alt_sizes: [],
    })),
    photoset_layout: imageCount > 1 ? 'true' : undefined,
    trail: [],
    reblog: { comment: '', tree_html: '' },
    can_like: true,
    interactability_reblog: 'everyone',
    can_reblog: true,
    can_send_in_message: true,
    can_reply: true,
    display_avatar: true,
  }) as Tumblr.Post

const mockPosts: Tumblr.Post[] = [
  createMockPost(1, ['personal work', 'featured'], 1),
  createMockPost(2, ['personal work', 'design'], 3),
  createMockPost(3, ['personal work', 'illustration'], 4),
  createMockPost(4, ['commissioned work', 'art'], 1),
  createMockPost(5, ['commissioned work', 'development'], 3),
  createMockPost(6, ['commissioned work', 'design'], 4),
]

export const Default: Story = {
  args: {
    posts: mockPosts,
    tag: 'personal work',
  },
}
export const ClientWork: Story = {
  args: {
    posts: mockPosts,
    tag: 'commissioned work',
  },
}

export const EmptyResults: Story = {
  args: {
    posts: mockPosts,
    tag: 'nonexistent',
  },
}
