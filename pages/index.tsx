import type { Tumblr } from 'libs/@type/api/tumblr'
import { getSharedStaticProps } from 'libs/sharedStaticProps'
import type { GetStaticProps, NextPage } from 'next'
import { endpoint, fetcher } from 'pages/api/works/tumblr'
import Works from 'pages/works'

const Home: NextPage<{ fallbackData: Tumblr.Root }> = ({
  fallbackData,
}: {
  fallbackData: Tumblr.Root
}) => {
  if (!fallbackData) return <div>Loading...</div>
  return <Works fallbackData={fallbackData} />
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const shared = await getSharedStaticProps()
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      ...shared,
      fallbackData: data,
    },
  }
}
