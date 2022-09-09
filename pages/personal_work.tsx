import { Footer } from 'components/atoms/footer'
import { PostComponent } from 'components/molecules/Post'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next/types'
import { endpoint, fetcher, tags } from 'pages/api/tumblr'
import { DefaultHeader } from '../components/Header'
import { Root } from './@type/tumblr'

const PersonalWork: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  console.log(fallbackData)
  if (!fallbackData) return <div>Loading...</div>
  return (
    <div>
      <DefaultHeader />
      <Link href="/personal_work">personal_work</Link>
      <Link href="/commissioned_work">commissioned_work</Link>
      <Link href="/info">info</Link>
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
