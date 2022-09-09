const api_uri = process.env.NEXT_PUBLIC_api_URI
const api_Key = process.env.NEXT_PUBLIC_api_Key
const Blog_name = `${process.env.NEXT_PUBLIC_Tumblr_username}.tumblr.com`
export const endpoint = `${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`
import { GetStaticProps } from 'next'

export const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json())

export const getStaticProps: GetStaticProps = async () => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data,
    },
  }
}
export const tags = {
  personalWork: 'personal work',
  commissionedWork: 'commissioned work',
}
