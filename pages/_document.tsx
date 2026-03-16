import { ebGaramond, notoSerifJP } from 'libs/fonts'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { author, description, title, url } from 'pages/api/basics'
import ReactRuntime from 'react'

const reactFactory = ReactRuntime as unknown as {
  createElement: (
    type: unknown,
    props: Record<string, unknown> | null,
    ...children: unknown[]
  ) => never
}

export default class CustomDocument extends Document {
  render() {
    const headChildren = (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <link rel="canonical" href={url} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=optional"
          rel="stylesheet"
        />
      </>
    )

    return (
      <Html lang="ja" className={`${notoSerifJP.variable} ${ebGaramond.variable} antialiased`}>
        {reactFactory.createElement(Head as never, null, headChildren)}
        <body>
          <Main />
          {reactFactory.createElement(NextScript as never, null)}
        </body>
      </Html>
    )
  }
}
