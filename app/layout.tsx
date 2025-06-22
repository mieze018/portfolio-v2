import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import type { Viewport } from 'next'

import '../styles/global.css'
import Layout from 'components/Layout/Default'
import { GoogleAnalytics } from 'libs/gtag'
import { notoSerifJP, ebGaramond } from 'libs/fonts'
import { author, description, title, url } from 'pages/api/basics'
import { ContentsWrapperWithPath } from './ContentsWrapperWithPath'

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  alternates: {
    canonical: url,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
  },
}
export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${ebGaramond.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=optional"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layout>
          <GoogleAnalytics />
          <ContentsWrapperWithPath>{children}</ContentsWrapperWithPath>
          <Analytics />
        </Layout>
      </body>
    </html>
  )
}
