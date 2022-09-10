import { Footer } from 'components/Atoms/Footer'
import { DefaultHeader } from 'components/Molecules/Header'
import { Navigation } from 'components/Molecules/Navigation'
import { Posts } from 'components/Organisms/Posts'
import { Root } from 'libs/@type/tumblr'
import { GetStaticProps, NextPage } from 'next/types'
import { tags } from 'pages/api/tags'
import { endpoint, fetcher } from 'pages/api/tumblr'

const CommissionedWork: NextPage<{ fallbackData: Root }> = ({
  fallbackData,
}) => {
  if (!fallbackData) return <div>Loading...</div>
  const posts = fallbackData.response.posts
  return (
    <>
      <DefaultHeader />
      <Navigation />
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
