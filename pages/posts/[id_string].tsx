import { Post } from 'components/Molecules/Post/Post'
import type { Tumblr } from 'libs/@type/api/tumblr'
import { getSharedStaticProps } from 'libs/sharedStaticProps'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { endpoint, endpointById, fetcher } from 'pages/api/works/tumblr'

type postPagePropsType = {
  post: Tumblr.Post
}

const PostPage: NextPage<postPagePropsType> = ({ post }: postPagePropsType) => <Post post={post} />

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher(endpoint)
  const paths = data.response.posts.map((post) => ({
    params: { id_string: post.id_string },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<postPagePropsType> = async ({ params }) => {
  const shared = await getSharedStaticProps()
  // Why: 全件取得せず投稿IDを指定して1件だけ取得し、ビルド時間を短縮する
  const data = await fetcher(endpointById(String(params?.id_string)))
  const post = data.response.posts[0]

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      ...shared,
      post,
    },
  }
}
