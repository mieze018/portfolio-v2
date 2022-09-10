import { Footer } from 'components/atoms/Footer'
import { Navigation } from 'components/molecules/Navigation'
import { PostComponent } from 'components/molecules/Post'
import { GetStaticProps, NextPage } from 'next/types'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'

import { DefaultHeader } from '../components/Header'
import { Root } from './@type/tumblr'

const PersonalWork: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return (
    <div>
      <DefaultHeader />
      <Navigation />
      {fallbackData?.response.posts.map((post) => {
        if (!post.tags.includes(tags.personalWork)) return
        return (
          <div key={post.id}>
            {fallbackData.response.posts.map((post) => (
              <PostComponent post={post} key={post.id} />
            ))}
            <Footer />
          </div>
        )
      })}
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
