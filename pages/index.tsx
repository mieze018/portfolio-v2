import type { GetStaticProps, NextPage } from 'next'

import Link from 'next/link'
import { endpoint, fetcher } from 'pages/api/tumblr';
import React from 'react';
import { DefaultHeader } from '../components/Header';
import { Root } from './@type/tumblr';

const Home: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  console.log(fallbackData)
  // if (error) return <div>Failed to load</div>
  if (!fallbackData) return <div>Loading...</div>
  return (
    <div>

      <DefaultHeader />
      <Link href="/personal_work">personal_work</Link>
      <Link href="/commissioned_work">commissioned_work</Link>
      <Link href="/info">info</Link>
      {fallbackData?.response.posts.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.id}</h1>
            <p>{post.caption}</p>
          </div>
        )
      }
      )}

    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data
    }
  }
}
