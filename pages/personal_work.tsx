import { Footer } from 'components/atoms/Footer'
import { Navigation } from 'components/molecules/Navigation'
import { PostComponent } from 'components/molecules/Post'
import { GetStaticProps, NextPage } from 'next/types'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'

import { DefaultHeader } from '../components/Header'
import { Root } from './@type/tumblr'

const PersonalWork: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  console.log(fallbackData.response.posts.length)
  const posts = fallbackData.response.posts
  return (
    <div>
      <DefaultHeader />
      <Navigation />
      {posts.map((post) => {
        if (!post.tags.includes(tags.personalWork)) return
        return <PostComponent post={post} key={post.id} />
      })}
      <Footer />
    </div>
  )
}

export default PersonalWork

export const getStaticProps: GetStaticProps = async () => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data,
    },
  }
}
