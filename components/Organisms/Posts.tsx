import { Post } from 'components/Molecules/Post/Post'
import type { Tumblr } from 'libs/@type/api/tumblr'

export const Posts = ({ posts, tag }: { posts: Tumblr.Post[]; tag: string }) => (
  <>
    {posts?.map((post) => {
      if (!post.tags.includes(tag)) return null
      return <Post post={post} key={post.id} />
    })}
  </>
)
