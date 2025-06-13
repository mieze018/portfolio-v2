import { i18n } from './next-i18next.config.mjs'
import withTwin from './withTwin.mjs'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

const imageConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: '**.tumblr.com',
        pathname: '**',
      },
    ],
  },
}

export const config = withTwin({
  ...nextConfig,
  ...imageConfig,
  i18n,
  experimental: {
    forceSwcTransforms: true,
  },
  //withTwin と重複するためコメントアウト
  // webpack: (config) => {
  //   // Unset client-side javascript that only works server-side
  //   config.resolve.fallback = { fs: false, module: false, path: false }
  //   return config
  // },
})

export default config
