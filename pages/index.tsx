import React from 'react'

import type { Tumblr } from 'libs/@type/tumblr'
import type { GetStaticProps, NextPage } from 'next'

import { endpoint, fetcher } from 'pages/api/tumblr'
import PersonalWork from 'pages/personal_work'

const Home: NextPage<{ fallbackData: Tumblr.Root }> = ({ fallbackData }) => {
  console.log(fallbackData)
  // if (error) return <div>Failed to load</div>
  if (!fallbackData) return <div>Loading...</div>
  return <PersonalWork fallbackData={fallbackData} />
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
