import type { Tumblr } from 'libs/@type/api/tumblr'

import { Posts } from 'components/Organisms/Posts'
import { tags } from 'pages/api/works/tags'
import { endpoint, fetcher } from 'pages/api/works/tumblr'

async function getData(): Promise<Tumblr.Root> {
  const API_URL_ROOT = endpoint
  const data = await fetcher(API_URL_ROOT)
  return data
}

export default async function PersonalWork() {
  const fallbackData = await getData()

  if (!fallbackData) return <div>Loading...</div>
  const posts = fallbackData.response.posts
  return <Posts posts={posts} tag={tags.personalWork} />
}
