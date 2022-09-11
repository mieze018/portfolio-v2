import type { Tumblr } from 'libs/@type/api/tumblr'
import type { NextPage, GetStaticProps } from 'next'

import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/TopBar'
import { Posts } from 'components/Organisms/Posts'
import { tags } from 'pages/api/works/tags'
import { endpoint, fetcher } from 'pages/api/works/tumblr'

const CommissionedWork: NextPage<{ fallbackData: Tumblr.Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  const posts = fallbackData.response.posts
  return (
    <>
      <TopBar />
      <Posts posts={posts} tag={tags.commissionedWork} />
      <Footer />
    </>
  )
}

export default CommissionedWork

export const getStaticProps: GetStaticProps = async () => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data,
    },
  }
}
