import type { GetStaticProps, NextPage } from 'next'
import { endpoint, fetcher } from 'pages/api/tumblr'
import { serverSideTranslations } from 'pages/libs/serverSideTranslations'
import PersonalWork from 'pages/personal_work'
import React from 'react'

import { Root } from './@type/tumblr'

const Home: NextPage<{ fallbackData: Root }> = ({ fallbackData }) => {
  console.log(fallbackData)
  // if (error) return <div>Failed to load</div>
  if (!fallbackData) return <div>Loading...</div>
  return <PersonalWork fallbackData={fallbackData} />
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const API_URL_ROOT = endpoint

  const data = await fetcher(API_URL_ROOT)
  return {
    props: {
      fallbackData: data,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
