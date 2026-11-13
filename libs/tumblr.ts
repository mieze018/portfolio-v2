import type { Tumblr } from 'libs/@type/api/tumblr'

// Why: API の1回の取得上限に依存せず、追加投稿をすべて静的ページ化する。
export const getTumblrPosts = async (apiKey: string): Promise<Tumblr.Post[]> => {
  const posts = new Map<string, Tumblr.Post>()
  let offset = 0

  while (true) {
    const endpoint = new URL('https://api.tumblr.com/v2/blog/mieze018.tumblr.com/posts')
    endpoint.searchParams.set('api_key', apiKey)
    endpoint.searchParams.set('limit', '20')
    endpoint.searchParams.set('offset', String(offset))
    const response = await fetch(endpoint)
    // Why: エラーにキーを含む URL を出さず、取得失敗時の空サイト公開を防ぐ。
    if (!response.ok) throw new Error(`Tumblr API request failed (${response.status})`)
    const data = (await response.json()) as Tumblr.Root
    if (data.meta?.status !== 200 || !Array.isArray(data.response?.posts)) {
      throw new Error('Tumblr API returned an invalid posts response')
    }

    const batch = data.response.posts
    const previousCount = posts.size
    for (const post of batch) {
      if (!/^\d+$/.test(post.id_string)) throw new Error('Tumblr returned an invalid post ID')
      posts.set(post.id_string, post)
    }
    offset += batch.length
    if (offset >= data.response.total_posts) break
    if (batch.length === 0 || posts.size === previousCount) {
      throw new Error('Tumblr pagination stopped before all posts were retrieved')
    }
  }

  return [...posts.values()]
}
