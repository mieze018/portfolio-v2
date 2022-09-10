import { PostComponent } from 'components/molecules/Post'
import { Post } from 'pages/@type/tumblr'

export const Posts = ({ posts, tag }: { posts: Post[]; tag: string }) => (
  <>
    {posts.map((post) => {
      if (!post.tags.includes(tag)) return
      return <PostComponent post={post} key={post.id} />
    })}
  </>
)
