import type { Meta, StoryObj } from '@storybook/nextjs'
import { Post } from './Post'
import type { Tumblr } from 'libs/@type/api/tumblr'
import { expect, waitFor } from 'storybook/test'

const meta: Meta<typeof Post> = {
  component: Post,
  parameters: {},
  tags: ['motion'],
}
export default meta
type Story = StoryObj<typeof Post>

const testImage1 = 'https://picsum.photos/id/1/800/600'
const testImage2 = 'https://picsum.photos/id/10/400/300'
const testImage3 = 'https://picsum.photos/id/20/400/300'
const testImage4 = 'https://picsum.photos/id/30/400/300'

const mockPost: Tumblr.Post = {
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
  id: 123456,
  id_string: '123456',
  post_url: 'https://example.tumblr.com/post/123456',
  slug: 'sample-post',
  date: '2024-01-15 12:00:00 GMT',
  timestamp: 1640995200,
  state: 'published',
  format: 'html',
  reblog_key: 'example-key',
  tags: [],
  short_url: 'https://tmblr.co/short',
  summary: 'Sample post summary',
  should_open_in_legacy: false,
  recommended_source: null,
  recommended_color: null,
  note_count: 0,
  caption: '<p>これはサンプル投稿のキャプションです。<strong>HTML</strong>が含まれています。</p>',
  photos: [
    {
      caption: '',
      original_size: {
        url: testImage1,
        width: 800,
        height: 600,
      },
      alt_sizes: [],
    },
  ],
  photoset_layout: undefined,
  trail: [],
  reblog: { comment: '', tree_html: '' },
  can_like: true,
  interactability_reblog: 'everyone',
  can_reblog: true,
  can_send_in_message: true,
  can_reply: true,
  display_avatar: true,
} as Tumblr.Post

const mockPostMultiplePhotos: Tumblr.Post = {
  ...mockPost,
  id: 123457,
  photoset_layout: 'true',
  photos: [
    {
      caption: '',
      original_size: {
        url: testImage1,
        width: 400,
        height: 300,
      },
      alt_sizes: [],
    },
    {
      caption: '',
      original_size: {
        url: testImage2,
        width: 400,
        height: 300,
      },
      alt_sizes: [],
    },
    {
      caption: '',
      original_size: {
        url: testImage3,
        width: 400,
        height: 300,
      },
      alt_sizes: [],
    },
  ],
}

const mockPostColumn: Tumblr.Post = {
  ...mockPostMultiplePhotos,
  id: 123458,
  photoset_layout: 'true',
  photos: [
    ...mockPostMultiplePhotos.photos,
    {
      caption: '',
      original_size: {
        url: testImage4,
        width: 400,
        height: 300,
      },
      alt_sizes: [],
    },
  ],
}

const mockPostWithShowOnlyLast: Tumblr.Post = {
  ...mockPostMultiplePhotos,
  id: 123459,
  tags: ['s-o-l-p'],
  caption: '<p>最後の写真のみ表示するポスト</p>',
}

export const Default: Story = {
  args: {
    post: mockPost,
  },
  play: async ({ canvas }) => {
    // 投稿記事要素を取得
    const article = canvas.getByRole('article')
    await expect(article).toBeInTheDocument()

    // 初期状態でブラーがかかっていることを確認
    // framer-motionの初期状態はinactiveでblur(8px)が適用される
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(article)
      expect(computedStyle.filter).toContain('blur(8px)')
    })

    // 要素をビューポートに入れるためにスクロール
    article.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // whileInViewトリガーを待機
    await waitFor(
      () => {
        const computedStyle = window.getComputedStyle(article)
        expect(computedStyle.filter).toContain('blur(0px)')
      },
      { timeout: 3000 }
    )

    // ブライトネスも正しく設定されていることを確認
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(article)
      expect(computedStyle.filter).toContain('brightness(1)')
    })
    // スクロール位置を元に戻す
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise((resolve) => setTimeout(resolve, 300))
    // スクロール完了を待機
    await waitFor(() => {
      expect(window.scrollY).toBe(0)
    })
  },
}

export const MultiplePhotosRow: Story = {
  args: {
    post: mockPostMultiplePhotos,
  },
}

export const MultiplePhotosColumn: Story = {
  args: {
    post: mockPostColumn,
  },
}

export const ShowOnlyLastPhoto: Story = {
  args: {
    post: mockPostWithShowOnlyLast,
  },
}

export const LongCaption: Story = {
  args: {
    post: {
      ...mockPost,
      caption:
        '<p>これは非常に長いキャプションの例です。</p><p>複数の段落があり、<strong>太字</strong>や<em>斜体</em>、<a href="#">リンク</a>なども含まれています。</p><p>HTMLタグが正しく表示されることを確認するためのテストです。</p><p>更に長い文章を追加して、レイアウトがどのように変化するかを確認します。</p>',
    },
  },
}
export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}

export const MultiplePhotosRowMobile: Story = {
  ...MultiplePhotosRow,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
export const MultiplePhotosColumnMobile: Story = {
  ...MultiplePhotosColumn,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
