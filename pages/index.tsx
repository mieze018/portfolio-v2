import React from 'react'

import type { Tumblr } from 'libs/@type/api/tumblr'
import type { GetStaticProps, NextPage } from 'next'

import { endpoint, fetcher } from 'pages/api/works/tumblr'
import Works from 'pages/works'

const Home: NextPage<{ fallbackData: Tumblr.Root }> = ({ fallbackData }) => {
  if (!fallbackData) return <div>Loading...</div>
  return <Works fallbackData={fallbackData} />
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data,
    },
  }
}
