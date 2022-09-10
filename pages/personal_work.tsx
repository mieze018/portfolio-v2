import { Footer } from 'components/atoms/Footer'
import { Navigation } from 'components/molecules/Navigation'
import { Posts } from 'components/molecules/Posts'
import { GetStaticProps, NextPage } from 'next/types'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'

import { DefaultHeader } from '../components/Header'
import { Root } from './@type/tumblr'

const PersonalWork: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  console.log(fallbackData.response.posts.length)
  const posts = fallbackData.response.posts
  return (
    <>
      <DefaultHeader />
      <Navigation />
      <Posts posts={posts} tag={tags.personalWork} />
      <Footer />
    </>
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
