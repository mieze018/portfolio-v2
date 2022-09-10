import Document from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import type { DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}

            <title>{process.env.NEXT_PUBLIC_title}</title>
            <meta name="description" content={process.env.NEXT_PUBLIC_description} />
            <meta name="author" content={process.env.NEXT_PUBLIC_author} />
            <link rel="canonical" href={process.env.NEXT_PUBLIC_url} />
            <link rel="icon" href="/favicon.ico" />
            {/* web font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
              href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap"
              rel="stylesheet"
            />
          </React.Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
}
