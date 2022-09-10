import { DefaultHeader } from 'components/Header'
import { Navigation } from 'components/molecules/Navigation'
import { GetStaticProps, NextPage } from 'next/types'
import { Root } from 'pages/@type/tumblr'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'

const CommissionedWork: NextPage<{ fallbackData: Root }> = ({
  fallbackData,
}) => {
  console.log(fallbackData)
  if (!fallbackData) return <div>Loading...</div>
  return (
    <div>
      <DefaultHeader />
      <Navigation />
      {fallbackData?.response.posts.map((post) => {
        if (!post.tags.includes(tags.commissionedWork)) return
        return (
          <div key={post.id}>
            <h1>{post.id}</h1>
            <p>{post.caption}</p>
          </div>
        )
      })}
    </div>
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
