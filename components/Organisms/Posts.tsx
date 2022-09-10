import type { Tumblr } from 'libs/@type/tumblr'

import { PostComponent } from 'components/Molecules/Post'

export const Posts = ({ posts, tag }: { posts: Tumblr.Post[]; tag: string }) => (
  <>
    {posts.map((post) => {
      if (!post.tags.includes(tag)) return
      return <PostComponent post={post} key={post.id} />
    })}
  </>
)
