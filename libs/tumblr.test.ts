import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTumblrPosts } from './tumblr'

const post = (id: number) => ({ id_string: String(id), id })
const response = (posts: ReturnType<typeof post>[], total: number) =>
  new Response(JSON.stringify({ meta: { status: 200 }, response: { posts, total_posts: total } }))
afterEach(() => vi.unstubAllGlobals())

describe('Tumblr posts', () => {
  it('2ページ目の追加投稿も取得する', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        response(
          Array.from({ length: 20 }, (_, i) => post(i + 1)),
          21
        )
      )
      .mockResolvedValueOnce(response([post(21)], 21))
    vi.stubGlobal('fetch', fetchMock)
    const posts = await getTumblrPosts('test-key')
    expect(posts).toHaveLength(21)
    expect(posts.at(-1)?.id_string).toBe('21')
    expect(fetchMock.mock.calls[1][0].searchParams.get('offset')).toBe('20')
  })

  it('失敗を空のサイトに置き換えず、エラーにキーを含めない', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 401 })))
    await expect(getTumblrPosts('private-key')).rejects.toThrow('Tumblr API request failed (401)')
  })

  it('未取得の投稿があるのに空レスポンスになったら停止する', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([], 1)))
    await expect(getTumblrPosts('test-key')).rejects.toThrow('pagination stopped')
  })

  it('空のブログもビルドできる', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([], 0)))
    expect(await getTumblrPosts('test-key')).toEqual([])
  })
})
