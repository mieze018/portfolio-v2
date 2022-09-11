import type { Tumblr } from 'libs/@type/api/tumblr'

import { Post } from 'components/Molecules/Post'

export const Posts = ({ posts, tag }: { posts: Tumblr.Post[]; tag: string }) => (
  <section id="posts-wrapper">
    {posts.map((post) => {
      if (!post.tags.includes(tag)) return
      return <Post post={post} key={post.id} />
    })}
  </section>
)
