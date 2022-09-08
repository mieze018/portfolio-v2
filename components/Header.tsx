import Head from "next/head"
import React from "react"

export const DefaultHeader = ({ titleSuffix = '' }) => (

  <Head>
    <title>{`${process.env.NEXT_PUBLIC_title} ${titleSuffix}`}</title>
    <meta name="description" content={process.env.NEXT_PUBLIC_description} />
    <meta name="author" content={process.env.NEXT_PUBLIC_author} />
    <link rel="canonical" href={process.env.NEXT_PUBLIC_url} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)
