import type { Post } from 'libs/@type/tumblr'

import { PostComponent } from 'components/molecules/Post'

export const Posts = ({ posts, tag }: { posts: Post[]; tag: string }) => (
  <>
    {posts.map((post) => {
      if (!post.tags.includes(tag)) return
      return <PostComponent post={post} key={post.id} />
    })}
  </>
)
