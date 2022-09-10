import { Footer } from 'components/Atoms/Footer'
import { Navigation } from 'components/Molecules/Navigation'
import { Posts } from 'components/Organisms/Posts'
import { GetStaticProps, NextPage } from 'next/types'
import { tags } from 'pages/api/tags'
import { endpoint, fetcher } from 'pages/api/tumblr'

import { DefaultHeader } from '../components/Molecules/Header'
import { Root } from '../libs/@type/tumblr'

const PersonalWork: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
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
