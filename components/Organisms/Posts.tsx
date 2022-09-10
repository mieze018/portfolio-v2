import { PostComponent } from 'components/Molecules/Post'
import { Post } from 'libs/@type/tumblr'

export const Posts = ({ posts, tag }: { posts: Post[]; tag: string }) => (
  <>
    {posts.map((post) => {
      if (!post.tags.includes(tag)) return
      return <PostComponent post={post} key={post.id} />
    })}
  </>
)
