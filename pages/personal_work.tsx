import type { Tumblr } from 'libs/@type/tumblr'
import type { NextPage, GetStaticProps } from 'next'

import { Footer } from 'components/Atoms/Footer'
import { DefaultHeader } from 'components/Molecules/Header'
import { Navigation } from 'components/Molecules/Navigation'
import { Posts } from 'components/Organisms/Posts'
import { tags } from 'pages/api/tags'
import { endpoint, fetcher } from 'pages/api/tumblr'

const PersonalWork: NextPage<{ fallbackData: Tumblr.Root }> = ({ fallbackData }) => {
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
