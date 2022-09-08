import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import useSWR from 'swr'
import { Root } from '../@type/tumblr';

const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
const TumblrData: () => Root | undefined = () => {
  const api_uri = process.env.NEXT_PUBLIC_api_URI;
  const api_Key = process.env.NEXT_PUBLIC_api_Key;
  const Blog_name = `${process.env.NEXT_PUBLIC_Tumblr_username}.tumblr.com`;
  const endpoint = `${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`
  const { data, error } = useSWR<Root>(endpoint, fetcher)
  return data ?? error
}

export default TumblrData
