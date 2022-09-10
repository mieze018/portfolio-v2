import { DefaultHeader } from '../components/Header'

import type { Root } from '../libs/@type/tumblr'
import type { GetStaticProps, NextPage } from 'next/types'

import { Posts } from 'components/Organisms/Posts'
import { Footer } from 'components/atoms/Footer'
import { Navigation } from 'components/molecules/Navigation'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'



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
